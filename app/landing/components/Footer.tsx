"use client";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CineVault. All rights reserved.</p>
        <p className="text-sm mt-2">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
