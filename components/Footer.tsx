import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur-sm py-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground/80 hover:text-primary transition-colors">
          Made with{" "}
          <Heart className="h-4 w-4 fill-red-500 text-red-500 animate-pulse" />{" "}
          Archana
        </p>
        <p className="text-xs text-muted-foreground/60">
          Built with Next.js 14, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
