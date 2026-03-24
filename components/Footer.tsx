import { portfolio } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(0,0,0,0.09)] bg-canvas py-6">
      <p className="text-center font-mono text-[11px] text-muted">
        Designed &amp; built by {portfolio.name} · {year} · Next.js + Tailwind
      </p>
    </footer>
  );
}
