"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const EXPO_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ═══════════════════════════════════════════════════════════════
// INLINE SVG ICONS
// ═══════════════════════════════════════════════════════════════
const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const SOCIALS = [
  { Icon: InstagramIcon, href: "https://instagram.com/fadzarsw", label: "Instagram" },
  { Icon: GithubIcon, href: "https://github.com/fadzarSW", label: "GitHub" },
  { Icon: LinkedinIcon, href: "https://linkedin.com/in/fadzarsw", label: "LinkedIn" },
  { Icon: TwitterIcon, href: "https://x.com/fadzarsw", label: "Twitter / X" },
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/project" },
  { name: "Contact", href: "/contact" },
];

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="contact"
      className="relative w-full bg-zinc-950 text-white overflow-hidden"
    >
      {/* ──────────────────────────────────────────────
          CONTENT
      ────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">

        {/* ── TOP: CTA + LINKS ── */}
        <div className="pt-20 pb-16 md:pt-28 md:pb-20 flex flex-col lg:flex-row justify-between items-start gap-16 border-b border-zinc-800">

          {/* Left: Heading + Email */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EXPO_OUT }}
            className="max-w-xl"
          >
            <span className="block text-[11px] text-zinc-500 font-semibold uppercase tracking-[0.3em] mb-6 font-[family-name:var(--font-geist-mono)]">
              Got a project?
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-anton)] uppercase tracking-tight leading-none mb-10">
              Let&apos;s work
              <br />
              <span className="text-zinc-700">together</span>.
            </h2>

            <a
              href="mailto:fadzar19@gmail.com"
              className="group inline-flex items-center gap-4 text-lg md:text-xl font-medium tracking-tight text-zinc-400 hover:text-zinc-50 transition-colors duration-300"
            >
              hello@fadzar.my.id
              <span className="w-11 h-11 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-400">
                <ArrowUpRightIcon className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
              </span>
            </a>
          </motion.div>

          {/* Right: Navigate + Connect + Back-to-top */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EXPO_OUT }}
            className="grid grid-cols-2  lg:grid-cols-3 gap-12 lg:gap-20 w-full lg:w-auto"
          >
            {/* Navigate */}
            <div className="flex flex-col gap-5">
              <span className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.25em] font-[family-name:var(--font-geist-mono)]">
                Navigate
              </span>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium tracking-wide text-zinc-500 hover:text-zinc-50 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-5">
              <span className="text-[11px] font-semibold text-zinc-600 uppercase tracking-[0.25em] font-[family-name:var(--font-geist-mono)]">
                Connect
              </span>
              <ul className="flex flex-col gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm font-medium tracking-wide text-zinc-500 hover:text-zinc-50 transition-all duration-300 group"
                    >
                      <Icon className="w-4 h-4 group-hover:text-red-500 transition-colors duration-300" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back to top */}
            <div className="hidden md:flex items-start justify-end">
              <button
                onClick={scrollToTop}
                className="group w-14 h-14 rounded-full border border-zinc-800 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-all duration-500 hover:scale-105"
              >
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowUpIcon className="w-5 h-5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </motion.span>
                <span className="text-[8px] font-semibold text-zinc-700 group-hover:text-zinc-400 transition-colors uppercase tracking-widest">
                  Top
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── SEPARATOR ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: EXPO_OUT }}
          className="h-[1px] w-full bg-zinc-800/50 origin-left"
        />

        {/* ── BOTTOM BAR ── */}
        <div className="py-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-600 font-[family-name:var(--font-geist-mono)]">
          <div className="flex items-center gap-3">
            <span>Jakarta, Indonesia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block opacity-80" />
          </div>
          <span>
            © {new Date().getFullYear()} Fadzar Surya Wijaya
          </span>
        </div>

      </div>
    </footer>
  );
}
