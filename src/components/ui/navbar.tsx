import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";

const NAV_LINKS = [
  { to: "/projects/beacon", label: "BEACON" },
  { to: "/projects/knot", label: "KNOT" },
] as const;

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {NAV_LINKS.map((l) => (
          <NavigationMenuItem key={l.to}>
            <NavigationMenuLink asChild>
              <Button asChild variant="ghost" size="sm" className="font-medium">
                <Link to={l.to}>{l.label}</Link>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function MobileNav() {
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
          {NAV_LINKS.map((l) => (
            <Button
              key={l.to}
              asChild
              variant="ghost"
              className="w-full justify-start text-base"
              onClick={closeSheet}
            >
              <Link to={l.to}>{l.label}</Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
