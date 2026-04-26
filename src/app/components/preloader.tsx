"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface PreloaderProps {
  children: React.ReactNode;
}

export default function Preloader({ children }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isLoading ? 0 : "-100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      >
        <div className="relative text-white overflow-hidden">
          <motion.h1
            // initial={{ y: "100%" }}
            // animate={{ y: isLoading ? "0%" : "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-6xl md:text-9xl font-medium tracking-tighter"
          >
            Fadzar Surya Wijaya
          </motion.h1>
        </div>

        <div className="absolute bottom-10 inset-x-0 mx-auto w-64 md:w-96 flex flex-col gap-2 p-4">
          <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-widest font-semibold font-mono">
            <span>Loading Experience</span>
            <span>{isLoading ? "0%" : "100%"}</span>
          </div>
          <div className="w-full h-[1px] bg-zinc-800 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white w-full"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: isLoading ? 0.85 : 1 }}
              transition={{
                duration: isLoading ? 2 : 0.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
      {children}
    </>
  );
}
