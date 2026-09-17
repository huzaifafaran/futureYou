"use client"
import * as React from "react"
import { useAppStore } from "@/lib/store"
import { Settings, RefreshCw } from "lucide-react"

export function ResetDemoAction() {
  const reseed = useAppStore(state => state.reseed)
  const [isOpen, setIsOpen] = React.useState(false)

  // Wait until mounted to avoid hydration mismatch if needed, but this is simple enough
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-48 rounded-xl bg-[var(--color-paper-2)] border border-[var(--color-rule)] shadow-lg p-2 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                reseed();
                setIsOpen(false);
                window.location.href = '/';
              }}
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-500 hover:bg-[var(--color-paper)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Demo
            </button>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-paper-2)] border border-[var(--color-rule)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
