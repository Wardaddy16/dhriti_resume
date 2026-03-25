"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

export default function Skills() {
  return (
    <div className="space-y-5">
      {portfolio.skills.map((group) => (
        <div key={group.label}>
          <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item, i) => (
              <motion.span
                key={item}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  scale: 1.06,
                  backgroundColor: "#e6f1fb",
                  color: "#185fa5",
                  transition: { duration: 0.15 },
                }}
                viewport={{ once: true, margin: "-80px" }}
                className="cursor-default rounded-[6px] bg-chip px-2.5 py-1 font-mono text-[12px] text-chip-ink"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
