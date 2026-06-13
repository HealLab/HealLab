import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { DesktopNav, MobileNav } from "./navbar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-3 md:h-18">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight md:text-xl"
          >
            <span aria-hidden="true">🫶</span>
            <span className="font-display">HEAL Lab</span>
          </Link>

          {/* Right-aligned nav group */}
          <div className="flex items-center gap-1 md:gap-2">
            <DesktopNav />
            <a
              href="https://github.com/HealLab"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="hidden sm:inline-flex"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
