'use client'
import * as React from 'react'
import { Phone, PhoneOff, Mic, MicOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type CallState = 'idle' | 'connecting' | 'active' | 'ending'

interface VoiceCallProps {
  profile: any
  futureSelf: any
  plan: any
  todayTotals: { calories: number; protein: number; water: number }
  onEventLogged: (type: string, data: any) => void
}

export function VoiceCall({ profile, futureSelf, plan, todayTotals, onEventLogged }: VoiceCallProps) {
  const [callState, setCallState] = React.useState<CallState>('idle')
  const [isMuted, setIsMuted] = React.useState(false)
  const [callDuration, setCallDuration] = React.useState(0)
  const [statusText, setStatusText] = React.useState('')
  const [waveAmplitudes, setWaveAmplitudes] = React.useState([0.2, 0.4, 0.6, 0.4, 0.2, 0.3, 0.5, 0.3])

  const pcRef = React.useRef<RTCPeerConnection | null>(null)
  const dcRef = React.useRef<RTCDataChannel | null>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const localStreamRef = React.useRef<MediaStream | null>(null)
  const analyserRef = React.useRef<AnalyserNode | null>(null)
  const animFrameRef = React.useRef<number>(0)
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const greetingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimeRef = React.useRef<number>(0)

  // Animate waveform from remote audio analyser
  const animateWave = React.useCallback(() => {
    if (!analyserRef.current) return
    const data = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(data)
    const step = Math.floor(data.length / 8)
    const amps = Array.from({ length: 8 }, (_, i) => {
      const val = data[i * step] / 255
      return Math.max(0.05, val)
    })
    setWaveAmplitudes(amps)
    animFrameRef.current = requestAnimationFrame(animateWave)
  }, [])

  // Handle incoming function calls from the AI
  const handleFunctionCall = React.useCallback((name: string, args: any, callId: string) => {
    let eventType = ''
    let eventData = {}

    if (name === 'log_nutrition') {
      eventType = 'nutrition'
      eventData = args
    } else if (name === 'log_water') {
      eventType = 'water'
      eventData = args
    } else if (name === 'log_workout') {
      eventType = 'workout'
      eventData = args
    }

    if (eventType) {
      onEventLogged(eventType, eventData)
    }

    // Send function result back to model so it can continue
    if (dcRef.current?.readyState === 'open') {
      dcRef.current.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: callId,
          output: JSON.stringify({ success: true, logged: eventType }),
        }
      }))
      dcRef.current.send(JSON.stringify({ type: 'response.create' }))
    }
  }, [onEventLogged])

  const startCall = React.useCallback(async () => {
    setCallState('connecting')
    setStatusText('Getting your Future Self on the line...')

    try {
      // 1. Get ephemeral token
      const sessionRes = await fetch('/api/ai/realtime-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, futureSelf, plan, todayTotals })
      })

      if (!sessionRes.ok) {
        const errData = await sessionRes.json().catch(() => ({}))
        const errMsg = errData.error || `Session API error ${sessionRes.status}`
        console.error('Session error:', errData)
        throw new Error(errMsg)
      }
      const session = await sessionRes.json()
      const ephemeralKey = session.value
      const sessionConfig = session.sessionConfig
      if (!ephemeralKey) throw new Error('No ephemeral key received')

      // 2. Create peer connection
      const pc = new RTCPeerConnection()
      pcRef.current = pc

      // 3. Remote audio → play through speaker + analyser
      const audioCtx = new AudioContext()
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser

      const audioEl = new Audio()
      audioEl.autoplay = true
      audioRef.current = audioEl

      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0]
        const source = audioCtx.createMediaStreamSource(e.streams[0])
        source.connect(analyser)
        animateWave()
      }

      // 4. Local mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      localStreamRef.current = stream
      stream.getTracks().forEach(track => pc.addTrack(track, stream))

      // 5. Data channel for events
      const dc = pc.createDataChannel('oai-events')
      dcRef.current = dc

      dc.onopen = () => {
        setCallState('active')
        setStatusText('Connected')
        startTimeRef.current = Date.now()
        timerRef.current = setInterval(() => {
          setCallDuration(Math.floor((Date.now() - startTimeRef.current) / 1000))
        }, 1000)

        // Configure session: voice, instructions, tools
        if (sessionConfig) {
          dc.send(JSON.stringify({
            type: 'session.update',
            session: {
              type: 'realtime',
              output_modalities: ['audio'],
              audio: {
                input: {
                  turn_detection: {
                    type: 'server_vad',
                    threshold: 0.5,
                    prefix_padding_ms: 300,
                    silence_duration_ms: 700,
                  },
                },
                output: { voice: sessionConfig.voice || 'alloy' },
              },
              instructions: sessionConfig.instructions,
              tools: sessionConfig.tools,
              tool_choice: 'auto',
            }
          }))
        }

        // Give the audio/data channels a moment to settle, then have Future You
        // open the conversation instead of waiting for the user to speak first.
        greetingTimerRef.current = setTimeout(() => {
          if (dc.readyState === 'open') {
            dc.send(JSON.stringify({ type: 'response.create' }))
          }
        }, 1200)
      }

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data)
          if (event.type === 'response.function_call_arguments.done') {
            const args = JSON.parse(event.arguments || '{}')
            handleFunctionCall(event.name, args, event.call_id)
          }
        } catch {
          // ignore parse errors
        }
      }

      // 6. SDP offer → OpenAI
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      const sdpRes = await fetch('https://api.openai.com/v1/realtime/calls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ephemeralKey}`,
          'Content-Type': 'application/sdp',
        },
        body: offer.sdp,
      })

      if (!sdpRes.ok) throw new Error('SDP exchange failed')
      const answerSdp = await sdpRes.text()
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp })

    } catch (err: any) {
      console.error('Voice call error:', err)
      setCallState('idle')
      setStatusText(err instanceof Error ? err.message : 'Voice call failed to connect.')
      cleanup()
    }
  }, [profile, futureSelf, plan, todayTotals, animateWave, handleFunctionCall])

  const cleanup = React.useCallback(() => {
    cancelAnimationFrame(animFrameRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    if (greetingTimerRef.current) clearTimeout(greetingTimerRef.current)
    localStreamRef.current?.getTracks().forEach(t => t.stop())
    dcRef.current?.close()
    pcRef.current?.close()
    pcRef.current = null
    dcRef.current = null
    localStreamRef.current = null
    analyserRef.current = null
    setWaveAmplitudes([0.2, 0.4, 0.6, 0.4, 0.2, 0.3, 0.5, 0.3])
  }, [])

  const endCall = React.useCallback(() => {
    setCallState('ending')
    setStatusText('Ending call...')
    setTimeout(() => {
      cleanup()
      setCallState('idle')
      setCallDuration(0)
    }, 500)
  }, [cleanup])

  const toggleMute = React.useCallback(() => {
    localStreamRef.current?.getTracks().forEach(t => {
      t.enabled = isMuted
    })
    setIsMuted(m => !m)
  }, [isMuted])

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  // Idle state — just the call button
  if (callState === 'idle') {
    return (
      <button
        onClick={startCall}
        title="Call your Future Self"
        className="fixed bottom-[100px] right-6 z-50 w-14 h-14 rounded-full bg-[var(--color-accent)] text-black flex items-center justify-center shadow-2xl shadow-[var(--color-accent)]/30 hover:scale-110 transition-all duration-200 group"
      >
        <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
      </button>
    )
  }

  // Active call overlay
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center">
      <div className="w-full max-w-sm mx-4 rounded-3xl bg-[oklch(12%_0.02_260)] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/30 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🔮</span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent)] mb-1">Future {profile?.name || 'You'}</p>
          <p className="text-xs text-white/40">
            {callState === 'connecting' ? statusText : formatDuration(callDuration)}
          </p>
        </div>

        {/* Waveform */}
        <div className="px-6 py-4 flex items-center justify-center gap-1 h-20">
          {callState === 'connecting' ? (
            <Loader2 className="w-6 h-6 text-[var(--color-accent)] animate-spin" />
          ) : (
            waveAmplitudes.map((amp, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full transition-all duration-75"
                style={{
                  height: `${Math.max(6, amp * 56)}px`,
                  background: `linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 60%, transparent), var(--color-accent))`,
                  opacity: 0.6 + amp * 0.4,
                }}
              />
            ))
          )}
        </div>

        {/* Controls */}
        <div className="p-6 pt-4 flex items-center justify-center gap-6">
          {/* Mute */}
          <button
            onClick={toggleMute}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
              isMuted
                ? "bg-red-500/20 border border-red-500/40 text-red-400"
                : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End call */}
          <button
            onClick={endCall}
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-500/30 hover:bg-red-600 hover:scale-105 transition-all duration-200"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
        </div>

        {/* Status tip */}
        {callState === 'active' && (
          <p className="text-center text-[11px] text-white/25 pb-5">
            Speak naturally — meals and workouts are logged automatically
          </p>
        )}
      </div>
    </div>
  )
}
