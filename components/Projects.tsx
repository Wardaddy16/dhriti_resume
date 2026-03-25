"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { fadeUp } from "@/lib/utils";
import { portfolio, type Project } from "@/data/portfolio";

// ─── 3-D tilt wrapper ────────────────────────────────────────────────────────
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Map pointer position (–0.5 → 0.5) to degrees
  const rotateY = useTransform(rawX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(rawY, [-0.5, 0.5], [5, -5]);

  // Spring smoothing so the card eases back on mouse-leave
  const springCfg = { stiffness: 280, damping: 24 };
  const sRotateX = useSpring(rotateX, springCfg);
  const sRotateY = useSpring(rotateY, springCfg);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    // perspective must live on a parent element
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        style={{ rotateX: sRotateX, rotateY: sRotateY }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Project links ────────────────────────────────────────────────────────────
function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex gap-5">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub (opens in new tab)`}
          className="font-mono text-[12px] text-accent underline-offset-2 hover:underline"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.publication && (
        <a
          href={project.publication}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} research paper (opens in new tab)`}
          className="font-mono text-[12px] text-accent underline-offset-2 hover:underline"
        >
          Paper <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo (opens in new tab)`}
          className="font-mono text-[12px] text-accent underline-offset-2 hover:underline"
        >
          Live <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

// ─── Stack tags ───────────────────────────────────────────────────────────────
function StackTags({ stack }: { stack: string[] }) {
  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      {stack.map((tag) => (
        <span
          key={tag}
          className="rounded-[6px] bg-chip px-2.5 py-1 font-mono text-[11px] text-chip-ink"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const featured = portfolio.projects.find((p) => p.featured);
  const rest = portfolio.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="bg-surface py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-px w-6 bg-muted/40" />
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Projects
            </p>
          </div>
          <h2 className="font-serif text-[28px] text-ink md:text-[34px]">
            Things I&apos;ve built.
          </h2>
          <p className="mt-1 text-[14px] font-light text-muted">
            A selection of work I&apos;m proud of.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Featured card — spans both columns */}
          {featured && (
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="col-span-1 md:col-span-2"
            >
              <TiltCard className="relative overflow-hidden rounded-xl border border-[rgba(0,0,0,0.09)] p-5 transition-colors duration-150 hover:bg-[#f8f8f6]">
                {/* Watermark number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-3 select-none font-serif text-[88px] font-bold leading-none text-[rgba(0,0,0,0.03)]"
                >
                  01
                </span>

                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-muted">01</span>
                  <span className="rounded-[6px] bg-accent-light px-2 py-0.5 font-mono text-[11px] text-accent">
                    Featured
                  </span>
                </div>
                <h3 className="mb-1.5 text-[18px] font-medium text-ink">
                  {featured.title}
                </h3>
                <p className="mb-3 text-[13px] font-light leading-[1.7] text-muted">
                  {featured.description}
                </p>
                <StackTags stack={featured.stack} />
                <ProjectLinks project={featured} />
              </TiltCard>
            </motion.div>
          )}

          {/* Remaining cards */}
          {rest.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <TiltCard className="relative h-full overflow-hidden rounded-xl border border-[rgba(0,0,0,0.09)] p-5 transition-colors duration-150 hover:bg-[#f8f8f6]">
                {/* Watermark number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-3 select-none font-serif text-[72px] font-bold leading-none text-[rgba(0,0,0,0.03)]"
                >
                  {String(i + 2).padStart(2, "0")}
                </span>

                <p className="mb-2 font-mono text-[11px] text-muted">
                  {String(i + 2).padStart(2, "0")}
                </p>
                <h3 className="mb-1.5 text-[16px] font-medium text-ink">
                  {project.title}
                </h3>
                <p className="mb-3 text-[13px] font-light leading-[1.7] text-muted">
                  {project.description}
                </p>
                <StackTags stack={project.stack} />
                <ProjectLinks project={project} />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
