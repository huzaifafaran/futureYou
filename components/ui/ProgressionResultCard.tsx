import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./card"
import type { ProgressionResult } from "@/lib/progression"

export function ProgressionResultCard({ result }: { result: ProgressionResult }) {
  return (
    <Card className="my-4 border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[var(--color-accent)] flex items-center gap-2">
          {result.action === 'increase' && 'Weight Increased!'}
          {result.action === 'maintain' && 'Maintain Load'}
          {result.action === 'insufficient_evidence' && 'Great Session'}
          {result.action === 'pain_blocked' && 'Safety First'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-display font-bold text-[var(--color-ink)]">{result.recommendedLoadKg} kg</span>
          <span className="text-sm text-[var(--color-ink-2)]">Next session target</span>
        </div>
        <p className="text-sm text-[var(--color-ink)]">{result.reason}</p>
      </CardContent>
    </Card>
  )
}
