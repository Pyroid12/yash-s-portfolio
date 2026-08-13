"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme, Theme } from "../shared/theme-provider";
import { Sun, Moon, Laptop, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Coding", href: "/#coding" },
  { label: "Certificates", href: "/certificates" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

function getSectionId(href: string): string {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  if (href.startsWith("/")) return href.slice(1).split("/")[0] ?? href;
  return href;
}

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on Esc key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setThemeMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll spy to update active section.
  // Picks the LAST section whose top edge is above the scroll threshold
  // (= section currently in view), so ordering matters — navLinks MUST be
  // in DOM order (top → bottom).
  useEffect(() => {
    const SPY_OFFSET = 150; // px below viewport top to sample "currently viewing"

    const handleScroll = () => {
      const sections = navLinks.map((link) => getSectionId(link.href));
      let currentSection = sections[0] ?? "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section's top has scrolled up past the spy line → this section
        // (or something inside it) is what the user is looking at.
        if (rect.top <= SPY_OFFSET) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    // Run once on mount (so the indicator is correct before any scroll)
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        
        {/* Monogram Logo */}
        <Link
          href="/"
          scroll={false}
          onClick={(e) => {
            // If we're already on "/", treat the click as "scroll to very top"
            // (and set active section = home), rather than a full soft-nav.
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("home");
              window.history.replaceState(null, "", "/#home");
            }
          }}
          className="text-xl font-bold tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-primary rounded-md p-1"
          aria-label="YR Monogram Home"
        >
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-extrabold text-sm tracking-tighter">
            YR
          </span>
          <span className="hidden sm:inline text-sm font-semibold tracking-tight text-foreground/80">
            Yash Rendalkar
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const sectionId = getSectionId(link.href);
              const isActive = activeSection === sectionId;
              
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`relative py-1.5 px-1 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary rounded-md ${
                      isActive ? "text-primary" : "text-foreground/75"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-px bg-border" />

          {/* Action Items */}
          <div className="flex items-center gap-4">
            {/* Resume button */}
            <Link
              href="/resume"
              className="group flex items-center gap-1.5 text-sm font-medium text-foreground/75 hover:text-primary px-3 py-1.5 rounded-md transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary"
            >
              Resume
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Theme selector */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`Toggle theme (current: ${theme})`}
                aria-expanded={themeMenuOpen}
                aria-haspopup="true"
              >
                {resolvedTheme === "dark" ? (
                  <Moon className="w-4 h-4 text-foreground" />
                ) : (
                  <Sun className="w-4 h-4 text-foreground" />
                )}
              </button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-card p-1 shadow-lg focus-visible:outline-none"
                    role="menu"
                  >
                    {[
                      { value: "light" as Theme, label: "Light", icon: Sun },
                      { value: "dark" as Theme, label: "Dark", icon: Moon },
                      { value: "system" as Theme, label: "System", icon: Laptop },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = theme === item.value;
                      return (
                        <button
                          key={item.value}
                          onClick={() => {
                            setTheme(item.value);
                            setThemeMenuOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-muted ${
                            isSelected ? "text-primary font-semibold" : "text-foreground/80"
                          }`}
                          role="menuitem"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button + Toggles */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Theme Toggler (simplified cycle) */}
          <button
            onClick={() => {
              const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
              setTheme(nextTheme);
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card"
            aria-label={`Cycle theme. Current: ${theme}`}
          >
            {theme === "light" && <Sun className="w-4 h-4" />}
            {theme === "dark" && <Moon className="w-4 h-4" />}
            {theme === "system" && <Laptop className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-border bg-card text-foreground"
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-16 z-40 border-b border-border bg-background p-6 shadow-xl md:hidden"
            >
              <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
                <ul className="flex flex-col gap-4 text-base font-semibold">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block transition-colors hover:text-primary py-1 ${
                          activeSection === getSectionId(link.href) ? "text-primary" : "text-foreground/80"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-border pt-4">
                    <Link
                      href="/resume"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-foreground hover:text-primary py-1"
                    >
                      <span>Resume</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60" />
                    </Link>
                  </li>
                </ul>

                {/* Theme Selector inside mobile menu (Radio list) */}
                <div className="border-t border-border pt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Theme Mode</p>
                  <div className="flex gap-2">
                    {[
                      { value: "light" as Theme, label: "Light", icon: Sun },
                      { value: "dark" as Theme, label: "Dark", icon: Moon },
                      { value: "system" as Theme, label: "System", icon: Laptop },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = theme === item.value;
                      return (
                        <button
                          key={item.value}
                          onClick={() => setTheme(item.value)}
                          className={`flex flex-1 items-center justify-center gap-1.5 py-2 px-3 border rounded-xl text-xs font-medium transition-colors ${
                            isSelected
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-card border-border text-foreground/85 hover:bg-muted"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
