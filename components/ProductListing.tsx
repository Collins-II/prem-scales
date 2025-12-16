"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* --------------------------------
   Types
-------------------------------- */
export interface ProductItem {
  id: number;
  name: string;
  description: string;
  image?: string;
  category: string;
  href: string;
}

/* --------------------------------
   Props
-------------------------------- */
interface CategoryProductListingProps {
  title: string;
  categoryLabel: string;
  bannerImage: string;
  products: ProductItem[];
  viewAllHref?: string;
}

/* --------------------------------
   Skeletons
-------------------------------- */
function BannerSkeleton() {
  return (
    <div className="h-40 sm:h-48 lg:h-full rounded-xl bg-gray-200 animate-pulse" />
  );
}

function ProductSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

/* --------------------------------
   Component
-------------------------------- */
export default function ProductListing({
  title,
  categoryLabel,
  bannerImage,
  products,
  viewAllHref = "#",
}: CategoryProductListingProps) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full bg-white mb-8">
      <div className="max-w-5xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Category Banner */}
        <div className="lg:col-span-1">
          {loading ? (
            <BannerSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative h-40 sm:h-48 lg:h-full overflow-hidden border"
            >
              <Image
                src={bannerImage}
                alt={title}
                fill
                className="object-cover"
              />
                          {/* Genre Tag */}
            <div className="
              z-5
              absolute bottom-3 left-0 md:bottom-4 
              bg-red-500 dark:bg-white
              text-white dark:text-black 
              text-1xl px-2 md:px-4 py-0.5 md:py-1 
              shadow-lg 
              whitespace-nowrap 
              uppercase font-bold
            ">
              <p className="text-xs uppercase tracking-wide opacity-90">
                  {categoryLabel}
                </p>
            </div>
              
            </motion.div>
          )}
        </div>

        {/* Product List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border rounded-xl divide-y">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : products.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    {product.image && (
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>
                      <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-red-600 transition">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    <Link
                      href={product.href}
                      className="self-center text-gray-400 group-hover:text-red-600 transition"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </motion.article>
                ))}
          </div>

          {/* Mobile View All */}
          <Link
            href={viewAllHref}
            className="sm:hidden inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
