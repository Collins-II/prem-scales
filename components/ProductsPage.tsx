"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "./cards/ProductCard";
import { useRouter, usePathname } from "next/navigation";
import { Product } from "@/data/dummy";
import { RequestQuoteModal } from "./modals/RequestQuoteModal";

/* -------------------- SORT OPTIONS -------------------- */
const SORT_OPTIONS = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
  "Name: A–Z",
] as const;

/* -------------------- TYPES -------------------- */
interface ProductsProps {
  products: Product[];
}

function scaleTypeToSlug(type: string) {
  return `/Products/${type.toLowerCase().replace(/\s+/g, "-")}-scale`;
}

function slugToScaleType(slug: string) {
  return slug
    .replace(/-scale$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function ProductsPage({ products = [] }: ProductsProps) {
  const router = useRouter();
  const pathname = usePathname();

  /* -------------------- DYNAMIC SCALE TYPES -------------------- */
  const scaleTypes = useMemo(() => {
    return Array.from(
      new Set(products.map(p => p.scaleType).filter(Boolean))
    ).sort();
  }, [products]);

  const [scaleType, setScaleType] = useState<string | null>(
    scaleTypes[0] ?? null
  );

  const [sort, setSort] =
    useState<(typeof SORT_OPTIONS)[number]>("Default");

  const [quoteModal, setQuoteModal] = useState<Product | null>(null);

  /* -------------------- PAGINATION -------------------- */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  /* -------------------- URL → STATE SYNC -------------------- */
  useEffect(() => {
    if (!scaleTypes.length) return;

    const match = pathname.match(/\/Products\/(.+)$/);
    if (!match) return;

    const typeFromUrl = slugToScaleType(match[1]);

    if (scaleTypes.includes(typeFromUrl)) {
      setScaleType(typeFromUrl);
    } else {
      setScaleType(scaleTypes[0]);
    }
  }, [pathname, scaleTypes]);

  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = useMemo(() => {
    if (!scaleType) return [];

    let items = products.filter(
      product => product.scaleType === scaleType
    );

    switch (sort) {
      case "Price: Low to High":
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case "Name: A–Z":
        items = [...items].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
    }

    return items;
  }, [products, scaleType, sort]);

  /* -------------------- PAGINATED -------------------- */
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page, pageSize]);

  return (
    <main className="w-full bg-neutral-50 min-h-screen">
      {/* -------------------- FILTER BAR -------------------- */}
      <section className="w-full bg-white border px-6 md:px-10">
        <div className="max-w-5xl mx-auto py-3 flex flex-col gap-4 md:items-center">

          {/* Dynamic Scale Types */}
          <div className="flex flex-wrap">
            {scaleTypes.map(type => {
              const active = scaleType === type;

              return (
                <button
                  key={type}
                  onClick={() => {
                    setScaleType(type);
                    setPage(1);

                    const url = scaleTypeToSlug(type);
                    if (pathname !== url) {
                      router.push(url, { scroll: false });
                    }
                  }}
                  className={`
                    px-4 sm:px-10 py-1.5 sm:py-2
                    text-[11px] sm:text-sm
                    font-medium rounded-xs whitespace-nowrap
                    transition-all
                    ${active
                      ? "bg-black text-white shadow-sm"
                      : "bg-neutral-100 border border-gray-200 text-gray-700 hover:border-black hover:bg-white"}
                  `}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex flex-wrap items-center gap-1 bg-white border border-gray-200 rounded-xs p-1">
            {SORT_OPTIONS.map(opt => {
              const active = sort === opt;

              return (
                <button
                  aria-label="sort-button"
                  key={opt}
                  onClick={() => {
                    setSort(opt);
                    setPage(1);
                  }}
                  className={`
                    px-2.5 sm:px-3 py-1.5
                    text-[11px] sm:text-sm
                    font-medium rounded-xs whitespace-nowrap
                    transition-all
                    ${active
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"}
                  `}
                  
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------- PRODUCTS GRID -------------------- */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 min-h-[300px]">
        {paginatedProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onRequestQuote={setQuoteModal}
              />
            ))}
          </div>
        )}
      </section>

      {/* -------------------- PAGINATION -------------------- */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={filteredProducts.length}
          onPageChange={setPage}
          onPageSizeChange={size => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </div>

      {/* -------------------- REQUEST QUOTE MODAL -------------------- */}
     <RequestQuoteModal
       open={!!quoteModal}
       product={quoteModal}
       onClose={() => setQuoteModal(null)}
      />
    </main>
  );
}
