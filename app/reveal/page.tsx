"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ArrowRight, Flame, Dumbbell, Activity } from "lucide-react"

export default function Reveal() {
  const router = useRouter()
  const profile = useAppStore(state => state.profile)
  const plan = useAppStore(state => state.plan)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !profile || !plan) return null

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center p-4 py-12 overflow-hidden bg-[var(--color-paper)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-ink)] to-transparent opacity-10" />
      
      <div className="z-10 w-full max-w-md animate-in zoom-in-95 duration-1000 flex flex-col items-center text-left">
        <div className="w-full text-center mb-8">
           <h2 className="text-sm uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2">Generated</h2>
           <h1 className="font-display text-4xl font-bold text-[var(--color-ink)]">Your Starting Plan</h1>
        </div>
        
        <div className="w-full space-y-4 mb-12">
           <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                   <Flame className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-2xl font-display font-bold text-white">{plan.calorieTarget} <span className="text-sm text-white/50 font-normal">kcal/day</span></h3>
                </div>
             </div>
             <p className="text-sm text-[var(--color-ink-2)] mt-3 leading-relaxed">
               {plan.calorieRationale}
             </p>
           </div>

           <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                   <Activity className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-2xl font-display font-bold text-white">{plan.proteinTargetG}g <span className="text-sm text-white/50 font-normal">protein/day</span></h3>
                </div>
             </div>
             <p className="text-sm text-[var(--color-ink-2)] mt-3 leading-relaxed">
               This supports recovery and body composition changes while you train.
             </p>
           </div>

           <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                   <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-2xl font-display font-bold text-white">{profile.trainingDaysPerWeek} <span className="text-sm text-white/50 font-normal">sessions/week</span></h3>
                </div>
             </div>
             <p className="text-sm text-[var(--color-ink-2)] mt-3 leading-relaxed">
               Built around {profile.experienceLevel} progression and your selected {profile.trainingLocation} location.
             </p>
           </div>
        </div>

        <div className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
          <Button onClick={() => router.push("/dashboard")} className="w-full h-14 text-base" variant="primary">
            Start with Future You
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  )
}
