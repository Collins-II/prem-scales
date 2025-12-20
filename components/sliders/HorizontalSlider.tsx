"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import ThemedHeading from "../themed-heading";

interface HorizontalSliderProps {
  title?: string;
  children: ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg";
  autoSlide?: boolean;
  interval?: number;
}

export default function HorizontalSlider({
  title,
  children,
  className = "",
  gap = "md",
  autoSlide = true,
  interval = 4500,
}: HorizontalSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollByAmount = (amount: number) => {
    containerRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  const gapClass =
    gap === "sm" ? "gap-2" : gap === "lg" ? "gap-8" : "gap-4";

  /* -----------------------------
     Auto Slide Logic (Desktop only)
  ----------------------------- */
  useEffect(() => {
    if (!autoSlide || isPaused) return;

    const slider = containerRef.current;
    if (!slider) return;

    const slideWidth = slider.firstElementChild?.clientWidth || 320;

    const id = setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({
          left: slideWidth + 16,
          behavior: "smooth",
        });
      }
    }, interval);

    return () => clearInterval(id);
  }, [autoSlide, interval, isPaused]);

  return (
    <section className={`relative w-full ${className}`}>
      {/* Header */}
      {title && (
        <div className="mb-4 px-4 md:px-0">
          <ThemedHeading title={title} link="/Products" />
        </div>
      )}

      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Nav (Desktop only) */}
        <button
          aria-label="Scroll left"
          onClick={() => scrollByAmount(-360)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
          h-7 w-7 items-center justify-center rounded-full
          bg-white/90 backdrop-blur border shadow-md
          hover:scale-105 transition"
        >
          <ChevronLeft className="h-4 w-4 text-gray-900" />
        </button>

        {/* Right Nav (Desktop only) */}
        <button
          aria-label="Scroll right"
          onClick={() => scrollByAmount(360)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
          h-7 w-7 items-center justify-center rounded-full
          bg-white/90 backdrop-blur border shadow-md
          hover:scale-105 transition"
        >
          <ChevronRight className="h-4 w-4 text-gray-900" />
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent hidden md:block" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent hidden md:block" />

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className={`
            flex overflow-x-auto overflow-y-visible ${gapClass}
            px-4 py-4 scroll-smooth snap-x snap-mandatory
            scrollbar-hide
            touch-pan-y md:touch-auto
          `}
        >
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              className="
                flex-shrink-0 snap-center
                min-w-[80%] sm:min-w-[55%] md:min-w-[40%]
              "
              whileHover={{ y: -4 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
