import { NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/ai/client'

const MAX_AUDIO_BYTES = 10 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audio = formData.get('audio')

    if (!(audio instanceof File) || audio.size === 0) {
      return NextResponse.json({ error: 'A recorded audio file is required.' }, { status: 400 })
    }

    if (audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json({ error: 'Voice messages must be 10 MB or smaller.' }, { status: 413 })
    }

    if (!audio.type.startsWith('audio/') && audio.type !== 'video/webm') {
      return NextResponse.json({ error: 'Unsupported audio format.' }, { status: 415 })
    }

    const openai = getOpenAIClient()
    if (!openai) {
      return NextResponse.json({ error: 'Voice transcription is not configured.' }, { status: 503 })
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audio,
      model: process.env.OPENAI_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe',
      // Do not force one language: people can naturally switch between Hindi and English.
      prompt: 'Fitness coaching conversation. The speaker may naturally mix Hindi, Roman Urdu, and English. Preserve the words they say and measurements such as kg, grams, calories, protein, and millilitres.',
    })

    return NextResponse.json({ text: transcription.text.trim(), mode: 'live' })
  } catch (error) {
    console.error('Transcription API error:', error)
    return NextResponse.json({ error: 'Could not transcribe that voice message. Please try again.' }, { status: 502 })
  }
}
