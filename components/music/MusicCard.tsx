"use client";

import { motion } from "framer-motion";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  href: string;
  cover: string;
  downloads: number;
  views: number;
  genre: string;
  publishedAt: string;
  isTrending?: boolean;
  chartRank?: number;
}

const customImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  try {
    const url = new URL(src);
    if (url.hostname.includes("res.cloudinary.com")) {
      return `${src}?w=${width}&q=${quality || 80}&f=auto`;
    }
    return src;
  } catch {
    return src;
  }
};

export function MusicCard({
  id,
  title,
  cover,
}: MusicCardProps) {
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      key={id}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/Products">
        <div className="
          overflow-hidden 
          bg-white dark:bg-neutral-900 
          transition 
          relative 
          group 
          rounded-none 
          hover:shadow-2xl 
          dark:hover:shadow-neutral-800 
          duration-300
        ">
          {/* Cover Image */}
          <div className="relative h-36 w-full sm:h-60">
            {loading && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-gray-300 via-gray-200 to-gray-300 
                dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700" 
              />
            )}

            <Image
              src={!imgError && cover ? cover : "/assets/images/placeholder_cover.jpg"}
              alt={title}
              loader={customImageLoader}
              fill
              className="
                object-cover 
                transition-transform 
                duration-500 
                group-hover:scale-105
              "
              onError={() => {
                setImgError(true);
                setLoading(false);
              }}
              onLoad={() => setLoading(false)}
            />

           </div>
        </div>
      </Link>
    </motion.div>
  );
}
