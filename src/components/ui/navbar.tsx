import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";

/** Homepage in-page sections reachable from the nav. */
const SECTIONS = [
  { id: "vision", label: "Vision" },
  { id: "news", label: "News" },
] as const;

const PROJECT_LINKS = [
  {
    to: "/projects/beacon",
    label: "BEACON",
    desc: "Wearable edge AI for community health",
  },
  {
    to: "/projects/knot",
    label: "KNOT",
    desc: "AI agents for nursing simulation training",
  },
  { to: "/projects", label: "All research", desc: "Browse every initiative" },
] as const;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Hook: jump to a homepage section from any route. */
function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (id: string) => {
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };
}

export function DesktopNav() {
  const goToSection = useSectionNav();
  return (
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList>
        {/* Research dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent font-medium">
            Proposals
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1 p-2">
              {PROJECT_LINKS.map((p) => (
                <li key={p.to}>
                  <NavigationMenuLink asChild>
                    <Link to={p.to} className="block">
                      <span className="text-sm font-semibold">{p.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.desc}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Section links */}
        {SECTIONS.map((s) => (
          <NavigationMenuItem key={s.id}>
            <NavigationMenuLink asChild>
              <Button
                variant="ghost"
                size="sm"
                className="font-medium"
                onClick={() => goToSection(s.id)}
              >
                {s.label}
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function MobileNav() {
  const goToSection = useSectionNav();
  const closeSheet = () => {
    const overlay = document.querySelector<HTMLElement>(
      "[data-state='open'][data-radix-sheet-override]"
    );
    overlay?.click();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="mt-6 space-y-1 px-2">
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Research
          </p>
          {PROJECT_LINKS.map((p) => (
            <Button
              key={p.to}
              asChild
              variant="ghost"
              className="w-full justify-start text-base"
              onClick={closeSheet}
            >
              <Link to={p.to}>{p.label}</Link>
            </Button>
          ))}
          <div className="my-2 border-t" />
          {SECTIONS.map((s) => (
            <Button
              key={s.id}
              variant="ghost"
              className="w-full justify-start text-base"
              onClick={() => {
                goToSection(s.id);
                closeSheet();
              }}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
