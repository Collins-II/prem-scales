"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface VideoCardProps {
  id: string;
  title: string;
  artist: string;
  cover: string;
  downloads: number;
  category?: string;
  views?: number;
  videoUrl: string;
  snippetLength?: number;
}

export function VideoCard({
  title,
  artist,
  cover,
}: VideoCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <motion.div
      whileHover={!isTouchDevice ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="
        relative w-full  
        overflow-hidden cursor-pointer
        bg-white dark:bg-neutral-900
        text-neutral-900 dark:text-neutral-100
      "
    >
      <Link
        href={`/Products`}
        prefetch={false}
        aria-label={`Watch ${title} by ${artist}`}
        className="block w-full"
      >
        <div className="relative w-full h-52 overflow-hidden">

          {!imgLoaded && (
            <div className="
              absolute inset-0 animate-pulse 
              bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 
              dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700
            " />
          )}

          <Image
            src={cover || "/assets/images/placeholder_cover.jpg"}
            alt={title}
            fill
            loading="lazy"
            className={`
              object-cover transition-opacity duration-700
              ${imgLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
          />
        </div>
      </Link>
    </motion.div>
  );
}
