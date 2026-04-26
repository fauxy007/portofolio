"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// SHARED ANIMATION CONFIG
// ═══════════════════════════════════════════════════════════════
const EXPO_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ═══════════════════════════════════════════════════════════════
// WORD COMPONENT — Dual-layer scroll-driven opacity reveal
// ═══════════════════════════════════════════════════════════════
const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.08, 1]);
  return (
    <span className="relative mr-3 md:mr-4 mt-2 md:mt-3 inline-block">
      {/* Ghost layer — faint on white background */}
      <span className="absolute left-0 top-0 text-zinc-200" aria-hidden="true">
        {children}
      </span>
      {/* Active layer — opacity driven by scroll progress */}
      <motion.span style={{ opacity }} className="relative z-10 text-zinc-900">
        {children}
      </motion.span>
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════
// SKILL CARD COMPONENT — Glassmorphic tech showcase tile
// ═══════════════════════════════════════════════════════════════
interface Skill {
  id: string;
  name: string;
  description: string;
  proficiency: number;
  icon: React.ReactNode;
  accent: string;
}

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: index * 0.15,
            ease: EXPO_OUT,
          },
        },
      }}
      className="group relative rounded-2xl border border-zinc-200 bg-zinc-50/80 backdrop-blur-sm p-8 flex flex-col gap-6 transition-all duration-500 hover:border-red-600/40 hover:shadow-xl hover:shadow-red-600/5 hover:-translate-y-2 cursor-default"
    >
      {/* Hover glow background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Icon area */}
      <div className="relative w-14 h-14 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-zinc-200 transition-all duration-500">
        <div className="text-zinc-400 group-hover:text-zinc-800 transition-colors duration-500">
          {skill.icon}
        </div>
      </div>

      {/* Label & description */}
      <div className="relative flex flex-col gap-2">
        <h3 className="text-2xl uppercase tracking-tight font-[family-name:var(--font-anton)] text-zinc-900">
          {skill.name}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed font-[family-name:var(--font-geist-sans)]">
          {skill.description}
        </p>
      </div>

      {/* Proficiency bar */}
      <div className="relative mt-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-semibold font-[family-name:var(--font-geist-mono)]">
            Proficiency
          </span>
          <span className="text-[11px] text-zinc-500 font-mono font-bold">
            {skill.proficiency}%
          </span>
        </div>
        <div className="w-full h-1 rounded-full bg-zinc-200 overflow-hidden">
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: {
                  duration: 1,
                  delay: 0.5 + index * 0.15,
                  ease: EXPO_OUT,
                },
              },
            }}
            className="h-full rounded-full origin-left"
            style={{
              width: `${skill.proficiency}%`,
              background: `linear-gradient(90deg, ${skill.accent}, ${skill.accent}cc)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SKILL ICONS — Inline SVGs for JS, PHP, Python
// ═══════════════════════════════════════════════════════════════
const JavaScriptIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
    <path d="M12 10v6.5c0 .83-.67 1.5-1.5 1.5S9 17.33 9 16.5" />
    <path d="M15 13.5c.83 0 1.5.37 1.5 1s-.67 1-1.5 1-1.5.37-1.5 1 .67 1 1.5 1 1.5-.37 1.5-1" />
  </svg>
);

const PHPIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="12" rx="10" ry="7" />
    <path d="M7 12V9h1.5a1.5 1.5 0 0 1 0 3H7Z" />
    <path d="M7 12v3" />
    <path d="M14 9v6" />
    <path d="M14 12h2a1.5 1.5 0 0 0 0-3h-2" />
  </svg>
);

const PythonIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.5 2 6 4.5 6 4.5V7h6v1H5S2 7.5 2 12s2.5 5 2.5 5H7v-2.5C7 12 9 12 9 12h6s2 0 2-2.5V5S17 2 12 2Z" />
    <path d="M12 22c5.5 0 6-2.5 6-2.5V17h-6v-1h7s3 .5 3-4-2.5-5-2.5-5H17v2.5c0 2.5-2 2.5-2 2.5H9s-2 0-2 2.5v4.5S7 22 12 22Z" />
    <circle cx="9.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="18.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// SKILLS DATA
// ═══════════════════════════════════════════════════════════════
const SKILLS: Skill[] = [
  {
    id: "javascript",
    name: "JavaScript",
    description:
      "Frontend & backend development, interactive user experiences, modern ES6+ ecosystem.",
    proficiency: 90,
    icon: <JavaScriptIcon />,
    accent: "#dc2626", // red-600
  },
  {
    id: "php",
    name: "PHP",
    description:
      "Server-side applications, Laravel framework, RESTful API development.",
    proficiency: 80,
    icon: <PHPIcon />,
    accent: "#b91c1c", // red-700
  },
  {
    id: "python",
    name: "Python",
    description:
      "Scripting, automation, data processing, and rapid prototyping.",
    proficiency: 75,
    icon: <PythonIcon />,
    accent: "#991b1b", // red-800
  },
];

// ═══════════════════════════════════════════════════════════════
// STATS DATA
// ═══════════════════════════════════════════════════════════════
const STATS = [
  { label: "Experience", value: "3+ YRS" },
  { label: "Projects", value: "10+" },
  { label: "Languages", value: "3" },
  { label: "Campus", value: "UPB" },
];

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function About() {
  const act1Ref = useRef<HTMLDivElement>(null);

  // Scroll tracking scoped to Act 1 (scrollytelling paragraph)
  const { scrollYProgress } = useScroll({
    target: act1Ref,
    offset: ["start 70%", "end 60%"],
  });

  const text =
    "Saya Fadzar Surya Wijaya, mahasiswa Universitas Pelita Bangsa yang memiliki passion mendalam dalam dunia pengembangan perangkat lunak. Terbiasa membangun solusi digital dengan JavaScript, PHP, dan Python — menggabungkan logika presisi dengan kreativitas visual untuk menciptakan pengalaman web yang tak terlupakan.";
  const words = text.split(" ");

  return (
    <section
      id="about"
      className="relative w-full bg-white text-zinc-900 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ═══ BACKGROUND DECOR: Subtle radial glow ═══ */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.05] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-400 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* ═══════════════════════════════════════════════
          ACT 1 — "THE INTRODUCTION"
          Scrollytelling word-by-word reveal
      ═══════════════════════════════════════════════ */}
      <div ref={act1Ref} className="min-h-[130vh] flex items-center py-32">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Sticky heading column */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-40">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EXPO_OUT }}
              >
                {/* Section label */}
                <span className="inline-block text-[11px] text-red-600 uppercase tracking-[0.3em] font-semibold font-[family-name:var(--font-geist-mono)] mb-6">
                  01 — About
                </span>
                <h2 className="text-7xl md:text-8xl tracking-tight uppercase font-[family-name:var(--font-anton)]">
                  <span className="block text-zinc-300">Who</span>
                  <span className="block text-red-600">I Am</span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: EXPO_OUT }}
                className="h-[2px] w-24 bg-red-600 mt-8 origin-left"
              />
              {/* Subtitle beneath the heading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7, ease: EXPO_OUT }}
                className="mt-6 text-sm text-zinc-400 leading-relaxed max-w-xs font-[family-name:var(--font-geist-sans)]"
              >
                Scroll untuk membaca cerita saya setiap kata akan muncul
                mengikuti perjalanan scroll Anda.
              </motion.p>
            </div>

            {/* Scrollytelling paragraph */}
            <div className="w-full lg:w-2/3 flex flex-wrap text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.2] font-medium font-[family-name:var(--font-geist-sans)]">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          ACT 2 — "THE ARSENAL"
          Tech stack showcase with glassmorphic cards
      ═══════════════════════════════════════════════ */}
      <div className="py-12 md:py-18">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Section heading */}
          <div className="mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="inline-block text-[11px] text-red-600 uppercase tracking-[0.3em] font-semibold font-[family-name:var(--font-geist-mono)] mb-6"
            >
              02 — Tech Stack
            </motion.span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EXPO_OUT }}
                className="text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase font-[family-name:var(--font-anton)]"
              >
                <span className="text-zinc-300">What I</span>
                <br />
                <span className="text-red-600">Work With</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
                className="text-sm text-zinc-400 leading-relaxed max-w-sm font-[family-name:var(--font-geist-sans)] lg:text-right lg:pb-2"
              >
                Tiga bahasa utama yang menjadi senjata saya dalam membangun
                solusi digital dari frontend interaktif hingga backend yang
                scalable.
              </motion.p>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: EXPO_OUT }}
              className="h-[1px] w-full bg-zinc-200 mt-10 origin-left"
            />
          </div>

          {/* Skill cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          ACT 3 — "THE NUMBERS"
          Stats bar with staggered fade-up
      ═══════════════════════════════════════════════ */}
      <div className="py-6 md:py-12">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Top separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EXPO_OUT }}
            className="h-[1px] w-full bg-zinc-200 origin-left mb-16"
          />

          <div className="justify-items-center grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: EXPO_OUT,
                }}
                className="flex flex-col gap-3"
              >
                <span className="text-5xl md:text-6xl text-zinc-900 tracking-tighter font-[family-name:var(--font-anton)]">
                  {stat.value}
                </span>
                <span className="text-[11px] text-zinc-400 uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-geist-mono)]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: EXPO_OUT }}
            className="h-[1px] w-full bg-zinc-200 origin-right mt-16"
          />
        </div>
      </div>
    </section>
  );
}
