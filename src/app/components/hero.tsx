"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, PanInfo } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

// Simple hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Custom draggable slider component
const DraggableSlider = ({ value, onChange, min, max, vertical = false }: {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  vertical?: boolean;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = useCallback((clientY: number) => {
    if (!sliderRef.current) return value;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (rect.bottom - clientY) / rect.height));
    return Math.round(min + (max - min) * percent);
  }, [min, max, value]);

  const handleDrag = useCallback((event: MouseEvent | TouchEvent, info: PanInfo) => {
    if (!sliderRef.current) return;
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY;
    const newValue = calculateValue(clientY);
    onChange(newValue);
  }, [calculateValue, onChange]);

  const handleDragStart = useCallback((event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
    if ('touches' in event) {
      const newValue = calculateValue(event.touches[0].clientY);
      onChange(newValue);
    } else {
      const newValue = calculateValue((event as MouseEvent).clientY);
      onChange(newValue);
    }
  }, [calculateValue, onChange]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const newValue = calculateValue(e.clientY);
      onChange(newValue);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const newValue = calculateValue(e.touches[0].clientY);
      onChange(newValue);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, calculateValue, onChange, handleDragEnd]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className="relative flex items-center justify-center"
      style={{ height: vertical ? 140 : 'auto', width: vertical ? 40 : '100%' }}
      onMouseDown={!vertical ? undefined : handleDragStart as any}
      onTouchStart={!vertical ? undefined : handleDragStart as any}
    >
      {/* Track */}
      <div 
        className={`absolute ${vertical ? 'w-1.5 h-[120px] top-[10px]' : 'h-1.5 w-full'} bg-white/20 rounded-full`}
      >
        <div 
          className={`absolute ${vertical ? 'w-1.5 bottom-0' : 'h-1.5 left-0'} bg-gradient-to-t from-cyan-400 to-cyan-500 rounded-full`}
          style={vertical ? { height: `${percent}%` } : { width: `${percent}%` }}
        />
      </div>
      
      {/* Thumb */}
      <motion.div
        className={`absolute ${vertical ? 'w-6 h-6' : 'w-4 h-4'} rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30 border-2 border-white cursor-grab active:cursor-grabbing`}
        style={vertical ? {
          bottom: `${percent}%`,
          transform: "translateY(50%)",
        } : {
          left: `${percent}%`,
          transform: "translateX(-50%)",
        }}
        animate={isDragging ? { scale: 1.2 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseDown={vertical ? undefined : handleDragStart as any}
        onTouchStart={vertical ? undefined : handleDragStart as any}
      />
    </div>
  );
};

// Horizontal slider for desktop
const HorizontalSlider = ({ value, onChange, min, max }: {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = useCallback((clientX: number) => {
    if (!sliderRef.current) return value;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(min + (max - min) * percent);
  }, [min, max, value]);

  const handleDragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const newValue = calculateValue(clientX);
    onChange(newValue);
  }, [calculateValue, onChange]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const newValue = calculateValue(e.clientX);
      onChange(newValue);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const newValue = calculateValue(e.touches[0].clientX);
      onChange(newValue);
    };

    const handleDragEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, calculateValue, onChange]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-8 flex items-center"
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div className="absolute w-full h-1.5 bg-white/20 rounded-full">
        <div 
          className="absolute h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30 border-2 border-white cursor-grab active:cursor-grabbing"
        style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
        animate={isDragging ? { scale: 1.3 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const helmRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [brushSize, setBrushSize] = useState(60);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const isMobile = useIsMobile();

  // Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  // Trail
  const trail = useRef<TrailPoint[]>([]);
  const mousePos = useRef({ x: -9999, y: -9999, targetX: -9999, targetY: -9999 });
  const rafId = useRef<number | null>(null);
  const brushSizeRef = useRef(brushSize);
  const lastMouseRef = useRef({ x: -9999, y: -9999 });
  const isLockedRef = useRef(false);

  useEffect(() => { brushSizeRef.current = brushSize; }, [brushSize]);
  useEffect(() => { isLockedRef.current = isLocked; }, [isLocked]);

  // Lock/unlock body scroll - improved
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "pan-x pan-y";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isLocked]);

  const TRAIL_LENGTH = 18;

  const drawMask = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const helmEl = helmRef.current;
    if (!canvas || !container || !helmEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const points = trail.current;
    if (points.length < 1) return;

    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      const ageFactor = 1 - pt.age;
      const baseR = brushSizeRef.current * ageFactor;

      let angle = 0;
      let stretch = 1;

      if (i > 0) {
        const prev = points[i - 1];
        const dx = pt.x - prev.x;
        const dy = pt.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) {
          angle = Math.atan2(dy, dx);
          stretch = Math.min(1 + dist * 0.18, 3.5);
        }
      } else if (points.length > 1) {
        const next = points[1];
        const dx = next.x - pt.x;
        const dy = next.y - pt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) {
          angle = Math.atan2(dy, dx);
          stretch = Math.min(1 + dist * 0.18, 3.5);
        }
      }

      if (baseR < 1) continue;

      ctx.save();
      ctx.translate(pt.x, pt.y);
      ctx.rotate(angle);
      ctx.scale(stretch, 1);

      const alpha = ageFactor * 0.95;
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, baseR);
      grd.addColorStop(0, `rgba(0,0,0,${alpha})`);
      grd.addColorStop(0.65, `rgba(0,0,0,${alpha * 0.8})`);
      grd.addColorStop(1, `rgba(0,0,0,0)`);

      ctx.beginPath();
      ctx.arc(0, 0, baseR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();
    }

    const dataUrl = canvas.toDataURL();
    helmEl.style.webkitMaskImage = `url(${dataUrl})`;
    helmEl.style.maskImage = `url(${dataUrl})`;
    helmEl.style.webkitMaskSize = `${W}px ${H}px`;
    helmEl.style.maskSize = `${W}px ${H}px`;
    helmEl.style.webkitMaskPosition = `0px 0px`;
    helmEl.style.maskPosition = `0px 0px`;
    helmEl.style.webkitMaskRepeat = "no-repeat";
    helmEl.style.maskRepeat = "no-repeat";
  }, []);

  const animate = useCallback(() => {
    const speed = 0.14;
    mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * speed;
    mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * speed;

    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    const dx = mx - lastMouseRef.current.x;
    const dy = my - lastMouseRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0.3 && mx > 0) {
      trail.current.unshift({ x: mx, y: my, age: 0 });
      lastMouseRef.current = { x: mx, y: my };
    }

    if (trail.current.length > TRAIL_LENGTH) {
      trail.current = trail.current.slice(0, TRAIL_LENGTH);
    }

    trail.current = trail.current.map((pt, i) => ({
      ...pt,
      age: i / TRAIL_LENGTH,
    }));

    drawMask();
    rafId.current = requestAnimationFrame(animate);
  }, [drawMask]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [animate]);

  const getContainerCoords = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: Math.max(0, Math.min(clientX - rect.left, rect.width)),
      y: Math.max(0, Math.min(clientY - rect.top, rect.height)),
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isLocked) return;
    const coords = getContainerCoords(e.clientX, e.clientY);
    if (!coords) return;
    mousePos.current.targetX = coords.x;
    mousePos.current.targetY = coords.y;
  };

  // Improved touch handler with better isolation for UI buttons
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchMove = (e: TouchEvent) => {
      // Check if touch target is inside a button or interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, [role="button"], .interactive-area');
      
      if (isInteractive) {
        return; // Don't block interactions with buttons
      }
      
      if (!isLockedRef.current) return;
      
      e.preventDefault();
      const touch = e.touches[0];
      const coords = getContainerCoords(touch.clientX, touch.clientY);
      if (!coords) return;
      mousePos.current.targetX = coords.x;
      mousePos.current.targetY = coords.y;
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const handleMouseLeave = () => {
    mousePos.current.targetX = -9999;
    mousePos.current.targetY = -9999;
    trail.current = [];
  };

  const handleReset = () => {
    trail.current = [];
    mousePos.current = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
  };

  const handleToggleLock = () => {
    setIsLocked((prev) => {
      if (prev) {
        trail.current = [];
        mousePos.current = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
      }
      return !prev;
    });
  };

  // Mobile settings panel with draggable slider
  const MobileSettingsPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: 16, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 16, scale: 0.9 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="absolute bottom-14 right-0 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 interactive-area"
      style={{ width: 80 }}
    >
      <div className="text-center mb-3">
        <span className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Size</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="text-cyan-400 text-sm font-mono font-bold">{brushSize}</span>
        <DraggableSlider
          value={brushSize}
          onChange={setBrushSize}
          min={20}
          max={150}
          vertical={true}
        />
        <button
          onClick={handleReset}
          className="text-[10px] text-cyan-400/80 font-medium mt-2 hover:text-cyan-300 transition-colors whitespace-nowrap"
        >
          Clear
        </button>
      </div>
    </motion.div>
  );

  // Desktop settings panel with horizontal slider
  const DesktopSettingsPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute bottom-12 right-0 w-64 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 space-y-3 interactive-area"
    >
      <div className="flex items-center justify-between">
        <span className="text-white text-sm font-medium">Brush Size</span>
        <button onClick={handleReset} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
          Clear Trail
        </button>
      </div>
      <HorizontalSlider
        value={brushSize}
        onChange={setBrushSize}
        min={20}
        max={150}
      />
      <div className="text-right text-cyan-400 text-xs font-mono">{brushSize}px</div>
    </motion.div>
  );

  // Staggered animation variants for smoother mobile menu
  const submenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        duration: 0.25
      }
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-neutral-950 select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ========== HIDDEN CANVAS ========== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: -1, opacity: 0 }}
      />

      {/* ========== LAYER 1: BATIK ========== */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Image src="/img/batik_background.webp" alt="Batik Background" fill priority className="object-cover" sizes="100vw" />
      </div>

      {/* ========== LAYER 2: TEKS PORTFOLIO ========== */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10, y: textY }}>
        <Image src="/img/teks_Portfolio.webp" alt="teks portfolio" fill priority className="object-contain px-4 md:px-0" sizes="100vw" />
      </motion.div>

      {/* ========== LAYER 3: FACE ========== */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 20 }}>
        <div className="relative w-100 h-100 sm:w-125 sm:h-125 md:w-150 md:h-150">
          <Image src="/img/face.webp" alt="Face" fill className="object-contain object-bottom" priority sizes="(max-width: 640px) 400px, (max-width: 768px) 500px, 600px" />
        </div>
      </div>

      {/* ========== LAYER 4: HELM (MASKED) ========== */}
      <div
        ref={helmRef}
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none"
        style={{ zIndex: 30, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
      >
        <div className="relative w-100 h-100 sm:w-125 sm:h-125 md:w-150 md:h-150">
          <Image src="/img/helm_transparent.webp" alt="Helm" fill className="object-contain object-bottom" priority sizes="(max-width: 640px) 400px, (max-width: 768px) 500px, 600px" />
        </div>
      </div>

      {/* ========== SVG FILTER ========== */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="turbulence" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="4" result="noise" seed="5">
              <animate attributeName="baseFrequency" dur="9s" values="0.018;0.024;0.018" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ========== BOTTOM-RIGHT UI ========== */}
      <div className="absolute bottom-4 right-4 z-50 flex flex-col items-end gap-2">

        {/* ── DESKTOP: Settings button langsung tampil tanpa menu toggle ── */}
        {!isMobile && (
          <div className="relative interactive-area">
            <motion.button
              onClick={() => setShowSettings((s) => !s)}
              className="h-10 px-3 rounded-lg bg-white border border-black/20 shadow-md flex items-center gap-2 hover:bg-neutral-100 transition-all"
              title="Settings"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 text-black/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </motion.button>
            <AnimatePresence>
              {showSettings && <DesktopSettingsPanel key="desktop-settings" />}
            </AnimatePresence>
          </div>
        )}

        {/* ── MOBILE: Menu toggle + sub-menu ── */}
        {isMobile && (
          <>
            <AnimatePresence mode="wait">
              {showMenu && (
                <motion.div
                  key="submenu"
                  variants={submenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-end gap-2"
                >
                  {/* SETTINGS BUTTON */}
                  <motion.div variants={itemVariants} className="relative interactive-area">
                    <motion.button
                      onClick={() => setShowSettings((s) => !s)}
                      className="h-10 px-3 rounded-lg bg-white border border-black/20 shadow-md flex items-center gap-2 hover:bg-neutral-100 transition-all"
                      title="Settings"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 text-black/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="text-xs font-semibold text-black/70">Settings</span>
                    </motion.button>
                    <AnimatePresence>
                      {showSettings && <MobileSettingsPanel key="mobile-settings" />}
                    </AnimatePresence>
                  </motion.div>

                  {/* LOCK / TOUCH BUTTON */}
                  <motion.div variants={itemVariants} className="interactive-area">
                    <motion.button
                      onClick={handleToggleLock}
                      animate={{
                        backgroundColor: isLocked ? "#000000" : "#ffffff",
                        borderColor: isLocked ? "#000000" : "rgba(0,0,0,0.2)",
                      }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="h-10 px-3 rounded-lg border shadow-md flex items-center gap-2 overflow-hidden"
                      title={isLocked ? "Unlock scroll" : "Lock scroll"}
                      style={{ minWidth: 40 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <AnimatePresence mode="wait">
                        {isLocked ? (
                          <motion.svg
                            key="unlock-icon"
                            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "#ffffff" }}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </motion.svg>
                        ) : (
                          <motion.svg
                            key="lock-icon"
                            initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: -30 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "rgba(0,0,0,0.75)" }}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </motion.svg>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="wait">
                        {isLocked ? (
                          <motion.span 
                            key="unlocked-text" 
                            className="text-xs font-semibold whitespace-nowrap"
                            style={{ color: "#ffffff" }}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                          >
                            Unlock
                          </motion.span>
                        ) : (
                          <motion.span 
                            key="locked-text" 
                            className="text-xs font-semibold whitespace-nowrap"
                            style={{ color: "rgba(0,0,0,0.75)" }}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                          >
                            Lock
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MAIN MENU TOGGLE BUTTON */}
            <motion.button
              ref={menuButtonRef}
              onClick={() => {
                setShowMenu((s) => {
                  if (s) setShowSettings(false);
                  return !s;
                });
              }}
              className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all interactive-area"
              title="Menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {showMenu ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    className="w-5 h-5 text-white/80"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="grid"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    className="w-5 h-5 text-white/80"
                    viewBox="0 0 22 22" fill="none" stroke="currentColor"
                  >
                    <rect x="2" y="2" width="8" height="8" rx="1.5" strokeWidth={1.8} />
                    <rect x="12" y="2" width="8" height="8" rx="1.5" strokeWidth={1.8} />
                    <rect x="2" y="12" width="8" height="8" rx="1.5" strokeWidth={1.8} />
                    <rect x="12" y="12" width="8" height="8" rx="1.5" strokeWidth={1.8} />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
} 