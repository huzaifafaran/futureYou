"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { generatePlan } from "@/lib/planning"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { UserProfile, FutureSelfProfile } from "@/lib/schemas"
import { Loader2 } from "lucide-react"

export default function Onboarding() {
  const router = useRouter()
  const updateProfile = useAppStore(state => state.updateProfile)
  const updatePlan = useAppStore(state => state.updatePlan)
  const updateFutureSelf = useAppStore(state => state.updateFutureSelf)
  
  const [step, setStep] = React.useState<1 | 2 | 3>(1)
  const [isGenerating, setIsGenerating] = React.useState(false)
  
  // Step 1 State
  const [formData, setFormData] = React.useState<Partial<UserProfile> & { timeframe: string }>({
    name: "Alex",
    age: 30,
    sex: "male",
    heightCm: 176,
    weightKg: 86,
    targetWeightKg: 80,
    primaryGoal: "muscle_gain",
    experienceLevel: "beginner",
    activityLevel: "moderate",
    trainingDaysPerWeek: 3,
    trainingLocation: "gym",
    timeframe: "12 months"
  })

  // Step 2 State
  const [interviewData, setInterviewData] = React.useState({
    outcomes: ["I am stronger and physically capable", "I have energy and discipline"],
    stopDoing: "Stop skipping workouts when I am tired",
    goodDay: "Wake up early, hit the gym, and eat according to my targets"
  })
  
  const OUTCOME_OPTIONS = [
    "I feel confident in my body",
    "I am stronger and physically capable",
    "I have sustainable eating habits",
    "I have energy and discipline",
    "I can wear the clothes I avoid today"
  ]

  // Step 3 State
  const [futureSelf, setFutureSelf] = React.useState<FutureSelfProfile | null>(null)

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setStep(3)
    
    try {
      const res = await fetch('/api/ai/generate-future-self', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...interviewData
        })
      })
      
      const { data } = await res.json()
      setFutureSelf(data)
    } catch (err) {
      console.error(err)
      // Fallback handled by API
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!futureSelf) return

    const newProfile: UserProfile = {
      id: `user_${Date.now()}`,
      name: formData.name || "Alex",
      age: Number(formData.age) || 30,
      sex: (formData.sex as any) || "male",
      heightCm: Number(formData.heightCm) || 176,
      weightKg: Number(formData.weightKg) || 86,
      targetWeightKg: Number(formData.targetWeightKg) || 80,
      primaryGoal: (formData.primaryGoal as any) || "muscle_gain",
      experienceLevel: (formData.experienceLevel as any) || "beginner",
      activityLevel: (formData.activityLevel as any) || "moderate",
      trainingDaysPerWeek: Number(formData.trainingDaysPerWeek) || 3,
      trainingLocation: (formData.trainingLocation as any) || "gym",
      equipment: [],
      dietaryPreferences: [],
      injuriesLimitations: []
    }

    const newPlan = generatePlan(newProfile)

    updateProfile(newProfile)
    updatePlan(newPlan)
    updateFutureSelf(futureSelf)
    
    router.push("/reveal")
  }

  const toggleOutcome = (outcome: string) => {
    setInterviewData(prev => ({
      ...prev,
      outcomes: prev.outcomes.includes(outcome) 
        ? prev.outcomes.filter(o => o !== outcome)
        : [...prev.outcomes, outcome]
    }))
  }

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="mb-8 text-center font-display text-3xl font-bold tracking-tight text-[var(--color-ink)]">Build Your Baseline</h1>
        
        {step === 1 && (
          <form onSubmit={handleStep1Submit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Vitals & Goals</CardTitle>
                <p className="text-sm text-[var(--color-ink-2)]">We need this data to generate your personalized deterministic targets.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-ink)]">Name</label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Age</label>
                    <Input 
                      type="number" 
                      value={formData.age} 
                      onChange={e => setFormData({ ...formData, age: Number(e.target.value) })} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Sex</label>
                    <select 
                      className="flex h-12 w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)]"
                      value={formData.sex}
                      onChange={e => setFormData({ ...formData, sex: e.target.value as any })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Height (cm)</label>
                    <Input 
                      type="number" 
                      value={formData.heightCm} 
                      onChange={e => setFormData({ ...formData, heightCm: Number(e.target.value) })} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Weight (kg)</label>
                    <Input 
                      type="number" 
                      value={formData.weightKg} 
                      onChange={e => setFormData({ ...formData, weightKg: Number(e.target.value) })} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Primary Goal</label>
                    <select 
                      className="flex h-12 w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)]"
                      value={formData.primaryGoal}
                      onChange={e => setFormData({ ...formData, primaryGoal: e.target.value as any })}
                    >
                      <option value="muscle_gain">Gain Muscle</option>
                      <option value="fat_loss">Lose Fat</option>
                      <option value="maintenance">Maintain</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Target Weight (kg)</label>
                    <Input 
                      type="number" 
                      value={formData.targetWeightKg} 
                      onChange={e => setFormData({ ...formData, targetWeightKg: Number(e.target.value) })} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-ink)]">Timeframe</label>
                  <select 
                    className="flex h-12 w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)]"
                    value={formData.timeframe}
                    onChange={e => setFormData({ ...formData, timeframe: e.target.value })}
                  >
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="18 months">18 months</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-ink)]">Daily Activity Level</label>
                  <select 
                    className="flex h-12 w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)]"
                    value={formData.activityLevel}
                    onChange={e => setFormData({ ...formData, activityLevel: e.target.value as any })}
                  >
                    <option value="sedentary">Sedentary (Desk Job)</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="high">Highly Active (Labor/Sports)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Training Days / Wk</label>
                    <Input 
                      type="number" 
                      value={formData.trainingDaysPerWeek} 
                      onChange={e => setFormData({ ...formData, trainingDaysPerWeek: Number(e.target.value) })} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-ink)]">Location</label>
                    <select 
                      className="flex h-12 w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)]"
                      value={formData.trainingLocation}
                      onChange={e => setFormData({ ...formData, trainingLocation: e.target.value as any })}
                    >
                      <option value="gym">Gym</option>
                      <option value="home">Home</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-ink)]">Experience Level</label>
                  <select 
                    className="flex h-12 w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)]"
                    value={formData.experienceLevel}
                    onChange={e => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Continue</Button>
              </CardFooter>
            </Card>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Future Self Interview</CardTitle>
                <p className="text-sm text-[var(--color-ink-2)]">You are speaking with the version of yourself who already built the life you are trying to build.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-4">
                  <label className="text-sm font-medium text-[var(--color-ink)]">A year from now, what has changed?</label>
                  <div className="space-y-3">
                    {OUTCOME_OPTIONS.map((outcome) => {
                      const isChecked = interviewData.outcomes.includes(outcome);
                      return (
                        <div key={outcome} className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => toggleOutcome(outcome)}
                            className={`w-5 h-5 shrink-0 rounded flex items-center justify-center transition-colors border ${
                              isChecked 
                                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white' 
                                : 'bg-white/5 border-white/20 text-transparent hover:bg-white/10'
                            }`}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </button>
                          <label 
                            onClick={() => toggleOutcome(outcome)}
                            className="text-sm font-medium leading-none cursor-pointer text-white/80 select-none"
                          >
                            {outcome}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-ink)]">What would that version of you tell you to stop doing?</label>
                  <Input 
                    value={interviewData.stopDoing} 
                    onChange={e => setInterviewData({ ...interviewData, stopDoing: e.target.value })} 
                    placeholder="e.g. Stop skipping workouts when tired"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-ink)]">What does a normal good day look like for him/her?</label>
                  <Input 
                    value={interviewData.goodDay} 
                    onChange={e => setInterviewData({ ...interviewData, goodDay: e.target.value })} 
                    placeholder="e.g. Wake up early, train, eat normally"
                    required 
                  />
                </div>

              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" className="flex-1">Create Future Self</Button>
              </CardFooter>
            </Card>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleStep3Submit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Future Self Profile</CardTitle>
                <p className="text-sm text-[var(--color-ink-2)]">This is the context the AI will use to coach you.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-12 text-white/50">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-[var(--color-accent)]" />
                    <p>Generating your future profile...</p>
                  </div>
                ) : futureSelf ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-wider">Identity</label>
                      <Input 
                        value={futureSelf.identity.join(', ')} 
                        onChange={e => setFutureSelf({ ...futureSelf, identity: e.target.value.split(',').map(s => s.trim()) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-wider">Target Outcome</label>
                      <Input 
                        value={futureSelf.targetOutcome} 
                        onChange={e => setFutureSelf({ ...futureSelf, targetOutcome: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-wider">Core Values</label>
                      <textarea 
                        className="flex min-h-[100px] w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)] resize-none"
                        value={futureSelf.values.join('\n')}
                        onChange={e => setFutureSelf({ ...futureSelf, values: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-wider">Notes</label>
                      <textarea 
                        className="flex min-h-[80px] w-full rounded-[var(--radius-input)] border border-white/10 bg-white/5 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-[var(--color-ink)] resize-none"
                        value={futureSelf.userWrittenNotes || ""}
                        onChange={e => setFutureSelf({ ...futureSelf, userWrittenNotes: e.target.value })}
                      />
                    </div>
                  </div>
                ) : null}
              </CardContent>
              <CardFooter className="flex gap-2">
                {!isGenerating && (
                  <>
                    <Button type="button" variant="ghost" onClick={() => setStep(2)}>Back</Button>
                    <Button type="submit" className="flex-1">Approve & Start</Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </form>
        )}

      </div>
    </main>
  )
}
