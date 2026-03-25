"use client";

import { motion } from "framer-motion";
import { heroFadeUp } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

// More dramatic blur+lift variant for the headline
const headlineLine = {
  hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-canvas">
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="relative mx-auto w-full max-w-3xl px-6 py-16">
        {/* Availability label with pulsing dot */}
        <motion.div
          custom={0}
          variants={heroFadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center gap-2"
        >
          {portfolio.available && (
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          )}
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
            {portfolio.available ? "Available for Full-Time Roles" : "Not currently available"}
          </p>
        </motion.div>

        {/* Headline — each line animates independently with blur */}
        <h1 className="mb-6 font-serif text-[36px] leading-[1.05] text-ink md:text-[56px]">
          <motion.span
            custom={0}
            variants={headlineLine}
            initial="hidden"
            animate="visible"
            className="block"
          >
            {portfolio.headline.prefix}
          </motion.span>
          <motion.em
            custom={1}
            variants={headlineLine}
            initial="hidden"
            animate="visible"
            className="block"
          >
            {portfolio.headline.emphasis}
          </motion.em>
        </h1>

        {/* Subheading */}
        <motion.p
          custom={2}
          variants={heroFadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 max-w-lg font-sans text-[16px] font-light leading-[1.75] text-muted"
        >
          {portfolio.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={heroFadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="min-h-[44px] rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-surface transition-all duration-150 hover:bg-ink/85 hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="min-h-[44px] rounded-lg border border-[rgba(0,0,0,0.15)] px-5 py-2.5 text-sm font-medium text-ink transition-all duration-150 hover:border-[rgba(0,0,0,0.25)] hover:bg-chip"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Location note */}
        <motion.p
          custom={4}
          variants={heroFadeUp}
          initial="hidden"
          animate="visible"
          className="font-mono text-xs text-muted"
        >
          Available to join · Remote or {portfolio.location}
        </motion.p>
      </div>

      {/* Scroll indicator — fades in late, bounces infinitely */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-muted/35"
          >
            <path
              d="M9 3v12M4 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
