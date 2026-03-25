"use client";

import { useEffect, useRef, useState } from "react";

// Directly mutates the div style on every mousemove (no React state re-renders).
// Keeps 60fps smooth on low-end devices.
export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current!.style.background = `radial-gradient(520px circle at ${e.clientX}px ${e.clientY}px, rgba(24,95,165,0.05), transparent 70%)`;
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
