"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/data/portfolio";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Scroll to a section without touching the URL hash.
// Keeps the URL clean so the browser never restores a mid-page position on load.
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function handleHashClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    scrollToId(href.slice(1));
  }
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Strip any hash from the URL on mount so the browser never restores scroll to an anchor
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35, rootMargin: "-80px 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-40 w-full border-b border-[rgba(0,0,0,0.09)] bg-white/80 backdrop-blur-sm"
      >
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          {/* Name — scrolls to top without writing # to the URL */}
          <a
            href="#"
            onClick={(e) => handleHashClick(e, "#")}
            className="font-mono text-sm font-medium text-ink transition-colors duration-150 hover:text-accent"
          >
            {portfolio.name}
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className={`text-[13px] transition-colors duration-150 ${
                  activeSection === link.href.slice(1)
                    ? "text-ink underline underline-offset-4 decoration-[rgba(0,0,0,0.3)]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Download Resume */}
          <div className="hidden md:block">
            <a
              href={portfolio.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[36px] rounded-lg border border-[rgba(0,0,0,0.15)] px-3 py-1.5 text-[13px] text-ink transition-colors duration-150 hover:border-[rgba(0,0,0,0.2)] hover:bg-chip"
            >
              Download Resume
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open navigation menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </nav>

        {/* Scroll progress bar — client-only to avoid hydration mismatch */}
        {mounted && (
          <div
            ref={progressRef}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        )}
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-surface px-6 py-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium text-ink">{portfolio.name}</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-ink"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="mt-14 flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleHashClick(e, link.href);
                    setMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.3, ease: "easeOut" }}
                  className="flex min-h-[52px] items-center text-2xl font-light text-ink transition-colors duration-150 hover:text-accent"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-12">
              <a
                href={portfolio.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block min-h-[44px] rounded-lg border border-[rgba(0,0,0,0.15)] px-4 py-2.5 text-sm text-ink"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
