import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface GlassBadgeProps {
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'yellow'
}

export function GlassBadge({ icon: Icon, children, className, variant = 'default' }: GlassBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md shadow-sm transition-all",
        variant === 'default' && "bg-black/40 dark:bg-white/10 border border-white/10 text-white",
        variant === 'yellow' && "bg-yellow-500/20 text-yellow-500 border border-yellow-500/20",
        className
      )}
    >
      {Icon && <Icon className={cn("h-4 w-4", variant === 'yellow' && "fill-current")} />}
      <span className={cn("font-medium", variant === 'default' && "text-white")}>{children}</span>
    </div>
  )
}
