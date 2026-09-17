import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[var(--radius-input)] border border-[var(--color-rule)] bg-[var(--color-paper-2)]/50 backdrop-blur-xl px-4 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-ink-3)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-focus)] focus-visible:border-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-sm",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
