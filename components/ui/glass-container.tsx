import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({ children, className }: GlassContainerProps) {
  return (
    <div
      className={cn(
        "bg-white/80 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-white/10 p-8 shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
