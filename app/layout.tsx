import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, DM_Mono } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolio.name} — Software Engineer`,
  description: portfolio.tagline,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${portfolio.name} — Software Engineer`,
    description: portfolio.tagline,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: `${portfolio.name} — Software Engineer`,
    description: portfolio.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
