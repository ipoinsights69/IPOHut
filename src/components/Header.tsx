"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TrendingUp, Menu, Search, Bell, User } from "lucide-react";

import Link from "next/link";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none">IPOHut</span>
              <span className="text-[10px] text-muted-foreground leading-none">India's IPO Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/open">Open IPOs</NavLink>
            <NavLink href="/upcoming">Upcoming</NavLink>
            <NavLink href="/listed">Listed</NavLink>
            <NavLink href="/sectors">Sectors</NavLink>
            <NavLink href="/gmp">GMP</NavLink>
            <NavLink href="/news">News</NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <ThemeToggle />
            <Button size="sm" className="gap-2">
              <User className="w-4 h-4" />
              Login
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-heading font-bold text-lg">IPOHut</span>
                </Link>

                <nav className="flex flex-col gap-2">
                  <NavLink href="/" mobile>Home</NavLink>
                  <NavLink href="/open" mobile>Open IPOs</NavLink>
                  <NavLink href="/upcoming" mobile>Upcoming & Closed</NavLink>
                  <NavLink href="/listed" mobile>Listed IPOs</NavLink>
                  <NavLink href="/sectors" mobile>Sector Analysis</NavLink>
                  <NavLink href="/gmp" mobile>GMP Today</NavLink>
                  <NavLink href="/gmp-tracker" mobile>GMP Tracker</NavLink>
                  <NavLink href="/news" mobile>IPO News</NavLink>
                  <NavLink href="/calendar" mobile>IPO Calendar</NavLink>
                  <NavLink href="/compare" mobile>Compare IPOs</NavLink>
                  <NavLink href="/about" mobile>About</NavLink>
                  <NavLink href="/resources" mobile>Resources</NavLink>
                </nav>

                <div className="flex flex-col gap-2 pt-4 border-t">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Button className="w-full gap-2">
                    <User className="w-4 h-4" />
                    Login / Sign Up
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Bell className="w-4 h-4" />
                    Set Alerts
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
