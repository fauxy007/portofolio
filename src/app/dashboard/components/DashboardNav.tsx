"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { logoutAction } from "@/actions/authActions";

export default function DashboardNav({ email, fontClass }: { email?: string | null, fontClass: string }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 w-full">
      <nav
        className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out ${fontClass} ${isScrolled
          ? "top-4 w-[95%] max-w-4xl rounded-full border border-zinc-700 bg-zinc-900/90 backdrop-blur-md shadow-2xl px-6 py-1"
          : "top-0 w-full rounded-none border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-0"
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl md:text-2xl font-bold text-white tracking-wide">
                Portfolio CMS
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-all ${isScrolled
                    ? "rounded-full hover:bg-zinc-800 text-zinc-200"
                    : "border-b-2 border-transparent hover:border-zinc-300 text-zinc-200"
                    }`}
                >
                  Projects
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-all ${isScrolled
                    ? "rounded-full hover:bg-zinc-800 text-zinc-200"
                    : "border-b-2 border-transparent hover:border-zinc-300 text-zinc-200"
                    }`}
                >
                  View Live Site
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400 hidden md:inline">
                {email}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className={`px-5 py-2 text-sm font-medium transition-all ${isScrolled
                    ? "bg-zinc-800 hover:bg-red-700 text-white rounded-full shadow-lg shadow-zinc-900/20 hover:shadow-red-900/20"
                    : "bg-zinc-800 hover:bg-red-700 text-white rounded-md"
                    }`}
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
