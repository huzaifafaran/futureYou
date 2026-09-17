import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-[100px]" />
      
      <div className="z-10 flex w-full max-w-sm flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="mb-12 flex h-20 w-auto items-center justify-center">
          <img src="/logo.png" alt="Future You Logo" className="h-full w-auto object-contain" />
        </div>

        <h1 className="mb-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
          FUTURE YOU
        </h1>
        
        <p className="mb-12 text-[var(--color-ink-2)] text-lg">
          Meet the version of yourself who has already achieved your goal.
        </p>

        <Link href="/onboarding" className="w-full">
          <Button className="w-full h-14 text-base group" variant="primary">
            Meet Future You
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </main>
  )
}
