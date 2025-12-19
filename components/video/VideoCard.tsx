"use client";

import { Product } from "@/data/dummy";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface VideoCardProps {
  cover: Product;
  href: string;
}

export function VideoCard({
  cover,
}: VideoCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const thumbnail = cover.image;

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
        bg-neutral-200
      "
    >
      <Link
        href={`/Products/${cover.slug}`}
        prefetch={false}
        aria-label={`PRODUCT_ITEM`}
        className="block w-full"
      >
        <div className="relative w-full h-100 overflow-hidden">

          {!imgLoaded && (
            <div className="
              absolute inset-0 animate-pulse 
              bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 
              
            " />
          )}

          <Image
            src={thumbnail || "/assets/images/placeholder_cover.jpg"}
            alt="PRODUCT_ITEM"
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
