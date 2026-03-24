"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/data/portfolio";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-80px 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
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
          {/* Name / logo */}
          <a
            href="#"
            className="font-mono text-sm font-medium text-ink hover:text-accent transition-colors duration-150"
          >
            {portfolio.name}
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
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

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={portfolio.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[36px] rounded-lg border border-[rgba(0,0,0,0.15)] px-3 py-1.5 text-[13px] text-ink transition-colors duration-150 hover:bg-chip hover:border-[rgba(0,0,0,0.2)]"
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
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="1"
                x2="20"
                y2="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="7"
                x2="20"
                y2="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="13"
                x2="16"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-surface px-6 py-5 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium text-ink">
                {portfolio.name}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-ink"
                aria-label="Close menu"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    x1="1"
                    y1="1"
                    x2="15"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="15"
                    y1="1"
                    x2="1"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-14 flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[52px] items-center text-2xl font-light text-ink hover:text-accent transition-colors duration-150"
                >
                  {link.label}
                </a>
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
