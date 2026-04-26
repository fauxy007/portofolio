"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { Menu, X, Target } from "lucide-react";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 6c0 0-2.5-1.5-5-2-1 1.5-2 3-2 3s-1-1.5-2-3c-2.5.5-5 2-5 2s-3 8-3 12c3 3 8 3 8 3l1-1.5c-2-.5-3-1.5-3-1.5s2 1 6 1 6-1 6-1-1 1-3 1.5l1 1.5s5 0 8-3c0-4-3-12-3-12z" />
    <circle cx="8" cy="14" r="1.5" />
    <circle cx="16" cy="14" r="1.5" />
  </svg>
);
import Link from "next/link";

type NavLink = {
  name: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "PROJECT", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: TwitterIcon, href: "#contact", label: "Twitter" },
  { icon: InstagramIcon, href: "#contact", label: "Instagram" },
  { icon: DiscordIcon, href: "#contact", label: "Discord" },
  { icon: YoutubeIcon, href: "#contact", label: "Youtube" },
];

// Animation Variants
const menuVariants: Variants = {
  initial: { y: "-100%" },
  animate: {
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const linkContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const linkVariants: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Always show navbar if menu is open
    if (isOpen) {
      setIsHidden(false);
      return;
    }

    // Scroll state for styling (glassmorphism on scroll)
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Selalu tampilkan navbar (stay on top)
    setIsHidden(false);
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 w-full transition-all duration-300 ${isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="flex h-full w-full items-center justify-between px-4 py-3 md:px-6 md:py-4">

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Target className="h-7 w-7 text-white" />
            <Link
              href="#home"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group/logo relative inline-flex overflow-hidden text-3xl text-white/90"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              {/* Original text */}
              <span className="flex">
                {"Fadzar Surya Wijaya".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-300 group-hover/logo:-translate-y-full"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              {/* Hover reveal text */}
              <span className={`absolute left-0 top-0 flex transition-colors duration-300 ${isScrolled ? "text-red-500" : "text-[#EDFA00]"}`}>
                {"Fadzar Surya Wijaya".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block translate-y-full transition-transform duration-300 group-hover/logo:translate-y-0"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </Link>
          </div>

          {/* Menu Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all hover:scale-105 hover:shadow-lg focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Scroll Progress Border */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-white/20"
          initial={{ width: "0%" }}
          animate={{ width: isScrolled ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[60] flex h-screen w-full flex-col bg-zinc-950 px-6 py-8 md:flex-row md:px-16 md:py-20"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:rotate-90 hover:bg-white hover:text-black md:right-12 md:top-12"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Column: Navigation Links */}
            <div className="flex h-full flex-1 flex-col justify-center mt-12 md:mt-0">
              <motion.div
                variants={linkContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-4 md:gap-6"
              >
                {NAV_LINKS.map((link, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.div variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          setIsOpen(false);
                          if (link.href.startsWith("#")) {
                            e.preventDefault();
                            const targetId = link.href.substring(1);
                            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="group relative inline-flex overflow-hidden text-6xl tracking-tight text-white md:text-7xl lg:text-8xl"
                        style={{ fontFamily: "var(--font-anton)" }}
                      >
                        {/* Split text reveal effect (Original text) */}
                        <div className="flex">
                          {link.name.split("").map((char, index) => (
                            <span
                              key={index}
                              className="inline-block transition-transform duration-300 group-hover:-translate-y-full"
                              style={{ transitionDelay: `${index * 30}ms` }}
                            >
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </div>
                        {/* Split text reveal effect (Hover text) */}
                        <div className="absolute left-0 top-0 flex text-red-500">
                          {link.name.split("").map((char, index) => (
                            <span
                              key={index}
                              className="inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                              style={{ transitionDelay: `${index * 30}ms` }}
                            >
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Socials & Contact */}
            <div className="flex h-full flex-col justify-end pb-8 md:w-1/3 md:justify-center md:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col gap-10"
              >
                <div>
                  <h3 className="mb-4 text-sm uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-anton)" }}>
                    Get in touch
                  </h3>
                  <div className="flex flex-col gap-2 text-lg text-white" style={{ fontFamily: "var(--font-anton)" }}>
                    <a href="mailto:hello@alterego.gg" className="hover:text-red-500 transition-colors w-fit">hello@alterego.gg</a>
                    <a href="tel:+15551234567" className="hover:text-red-500 transition-colors w-fit">+1 (555) 123-4567</a>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-geist-mono)" }}>
                    Follow us
                  </h3>
                  <div className="flex gap-4">
                    {SOCIAL_LINKS.map((social, i) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={i}
                          href={social.href}
                          aria-label={social.label}
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 text-white transition-all hover:scale-110 hover:border-red-500 hover:text-red-500"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
