"use client";

import Image from "next/image";
import { Product } from "@/data/dummy";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onRequestQuote?: (product: Product) => void;
}

export function ProductCard({
  product,
  onRequestQuote,
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-sm border border-gray-100 overflow-hidden transition hover:shadow-sm">
      
      {/* Image */}
      <Link href={`/Products/${product.slug}`}>
      <div className="relative h-44 sm:h-52">
        <Image
          src={product.image || "/assets/images/placeholder_cover.jpg"}
          alt={product.name}
          fill
          className="object-contain p-4 sm:p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      </Link>

      {/* Content */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-col gap-1">
        
        {/* Product name */}
        <span
          className="
            text-[10px]
            sm:text-xs
            md:text-sm
            uppercase
            tracking-wide
            text-gray-500
            line-clamp-2
            transition-all
          "
          title={product.name}
        >
          {product.name}
        </span>

        {/* CTA */}
        {onRequestQuote && (
          <button
            onClick={() => onRequestQuote(product)}
            className="
              mt-2
              text-xs sm:text-sm
              font-medium
              text-black/70
              hover:text-black
              hover:underline
              self-start
              transition
            "
          >
            Request Quote →
          </button>
        )}
      </div>
    </div>
  );
}
