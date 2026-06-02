import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "destructive"
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | "xs"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-slate-300 bg-white hover:bg-slate-50",
    ghost: "hover:bg-slate-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  }
  const sizes = {
    default: "h-7 sm:h-8 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm",
    xs: "h-5 sm:h-6 px-2 sm:px-3 text-xs",
    sm: "h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm",
    lg: "h-9 sm:h-10 px-4 sm:px-6 text-sm sm:text-base",
    icon: "h-7 sm:h-8 w-7 sm:w-8",
    "icon-sm": "h-5 sm:h-6 w-5 sm:w-6",
    "icon-lg": "h-9 sm:h-10 w-9 sm:w-10",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
