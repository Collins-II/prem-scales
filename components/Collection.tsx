"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { PRODUCTS } from "@/data/dummy";

export interface CollectionProps {
  className?: string;
  featuredImage: string; // make REQUIRED
  name?: string;
  desc?: string;
  color?: string;
}

const featuredProduct = PRODUCTS[1];

const Collection: FC<CollectionProps> = ({
  className = "",
  name = "Featured Product",
  color = "bg-gray-100",
}) => {
  return (
<div
  className={`
    relative w-full aspect-[16/11]
    min-h-[360px] xl:min-h-[420px]
    rounded-2xl overflow-hidden group
    ${color}
  `}
>

        {/* Image */}
        <Image
          src={featuredProduct.image}
          alt={name}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1280px) 100vw, 400px"
        />

        {/* Overlay */}
        <span className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Content */}
        <div className="absolute inset-6 flex flex-col text-white">
          <div className="max-w-xs">
            <span className="block mb-2 text-sm uppercase tracking-wide opacity-90">
              {featuredProduct.name}
            </span>

            {featuredProduct.description && (
              <h2
                className="text-xl md:text-2xl font-semibold leading-snug uppercase"
                dangerouslySetInnerHTML={{ __html: featuredProduct.description }}
              />
            )}
          </div>

          <div className="mt-auto">
           <Link href={`/Products/${featuredProduct.slug}`} className={`block ${className}`}>
            <Button
              size="lg"
              className="
                rounded-full px-8
                bg-white/90 text-black
                hover:bg-red-600 hover:text-white
                transition
              "
            >
              Show more
            </Button>
            </Link>
          </div>
        </div>
      </div>

  );
};

export default Collection;
