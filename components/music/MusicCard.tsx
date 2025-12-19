"use client";

import { Product } from "@/data/dummy";
import { motion } from "framer-motion";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MusicCardProps {
  href: string;
  cover: Product;
}

const customImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  try {
    const url = new URL(src);
    if (url.hostname.includes("res.cloudinary.com")) {
      return `${src}?w=${width || 60 }&q=${quality || 80}&f=auto`;
    }
    return src;
  } catch {
    return src;
  }
};

export function MusicCard({
  cover,
}: MusicCardProps) {
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const thumbnail = cover.image;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/Products/${cover.slug}`}>
        <div className="
          overflow-hidden 
          bg-neutral-200 
          transition 
          relative 
          group 
          rounded-none 
          hover:shadow-2xl 
          duration-300
        ">
          {/* Cover Image */}
          <div className="relative h-36 w-full sm:h-60">
            {loading && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r 
                from-gray-300 via-gray-200 to-gray-300 
                " 
              />
            )}

            <Image
              src={!imgError && thumbnail ? thumbnail : "/assets/images/placeholder_cover.jpg"}
              alt="PRODUCT_ITEM"
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
