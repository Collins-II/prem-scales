"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const img1 = "/products/retail-s4.png";
const img2 = "/products/retail-s1.png";
const img3 = "/products/lab-s1.png";

interface Slide {
  id: number;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: img1,
    link: "/Products",
  },
  {
    id: 2,
    image: img2,
    link: "/Products",
  },
  {
    id: 3,
    image: img3,
    link: "/Products",
  },
];

const AUTOPLAY_MS = 15000;

export default function Hero() {
  const [index, setIndex] = React.useState(0);
  const [progressKey, setProgressKey] = React.useState(0);

  const goTo = (i: number) => {
    setIndex(i);
    setProgressKey((k) => k + 1); // restart progress animation
  };

  // Auto slide
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-background pt-14">
      <div className="relative h-[30vh] sm:h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].image}
              alt="IMAGE_SLIDE"
              fill
              priority
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-10 md:bottom-20 right-6 md:right-12 max-w-2xl space-y-5 text-white z-10">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
              >
                <Link href={slides[index].link}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="rounded-full px-8 bg-transparent border border-white text-white hover:bg-orange-700 shadow-md"
                    >
                      More
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Measuring-scale Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, i) => {
            const active = i === index;

            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative flex items-center"
              >
                {/* Track */}
                <div
                  className={`h-1.5 w-5 md:w-10 rounded-full overflow-hidden transition-colors ${
                    active ? "bg-white/30" : "bg-white/20"
                  }`}
                >
                  {active && (
                    <motion.div
                      key={progressKey}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      className="origin-left h-full w-full bg-white"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
