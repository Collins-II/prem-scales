"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "./cards/ProductCard";
import { usePathname } from "next/navigation";
import { Product } from "@/data/dummy";

/* -------------------- CONSTANTS -------------------- */

const CATEGORIES = [
  { label: "All", slug: "all" },
  { label: "Retail", slug: "retail-scale" },
  { label: "Commercial", slug: "commercial-scale" },
  { label: "Laboratory", slug: "laboratory-scale" },
  { label: "Industrial", slug: "industrial-scale" },
  { label: "Medical", slug: "medical-scale" }
] as const;

type CategorySlug = typeof CATEGORIES[number]["slug"];

const CATEGORY_SLUGS: readonly CategorySlug[] =
  CATEGORIES.map(c => c.slug);

const SORT_OPTIONS = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
  "Name: A–Z"
] as const;

type SortOption = typeof SORT_OPTIONS[number];

/* -------------------- TYPES -------------------- */

interface ProductsProps {
  products: Product[];
}

/* -------------------- HELPERS -------------------- */


/* -------------------- COMPONENT -------------------- */

export default function MarketsPage({ products }: ProductsProps) {
  const pathname = usePathname();

  const [category, setCategory] = useState<CategorySlug>("all");
  const [sort, setSort] = useState<SortOption>("Default");
  const [quoteModal, setQuoteModal] = useState<Product | null>(null);

  /* -------------------- PAGINATION -------------------- */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  /* -------------------- URL → STATE -------------------- */
  useEffect(() => {
    const match = pathname.match(/\/Market-Sectors\/([^/]+)$/);
    const slug = match?.[1] as CategorySlug | undefined;

    if (slug && CATEGORY_SLUGS.includes(slug)) {
      setCategory(slug);
    } else {
      setCategory("all");
    }

    setPage(1);
  }, [pathname]);

  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (category !== "all") {
      items = items.filter(
        product => product.categorySlug === category
      );
    }

    switch (sort) {
      case "Price: Low to High":
        items.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        items.sort((a, b) => b.price - a.price);
        break;
      case "Name: A–Z":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return items;
  }, [products, category, sort]);

  /* -------------------- PAGINATED -------------------- */
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page, pageSize]);

  return (
    <main className="w-full bg-neutral-50 min-h-screen">
      {/* -------------------- FILTER BAR -------------------- */}
    <section className="w-full bg-white border px-6 md:px-10 ">
        <div className="max-w-5xl mx-auto sm:px-4 py-3 flex flex-col gap-3 sm:gap-4 md:items-center md:justify-center">

          {/* Categories */}
          <div className="flex flex-wrap">
            {CATEGORIES.map(cat => {
              const active = category === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setCategory(cat.slug);
                    setPage(1);
                  }}
                  className={`
                    px-4 sm:px-12 py-1.5 sm:py-2
                    text-xs sm:text-sm font-medium
                    rounded-xs transition-all
                    ${active
                      ? "bg-black text-white shadow-sm"
                      : "bg-neutral-100 border border-gray-200 text-gray-700 hover:border-black"}
                  `}
                  aria-pressed={active}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort */}
   {/* Sort */}
  <div className="flex flex-wrap items-center gap-1 bg-white border border-gray-200 rounded-xs p-1 self-start md:self-auto">
    {SORT_OPTIONS.map((opt) => {
      const active = sort === opt;

      return (
        <button
          key={opt}
          onClick={() => {
            setSort(opt as any);
            setPage(1);
          }}
          className={`
            px-2.5 sm:px-3 py-1.5
            text-[11px] sm:text-sm
            font-medium
            rounded-xs
            whitespace-nowrap
            transition-all
            ${active
              ? "bg-black text-white shadow-sm"
              : "text-gray-600 hover:text-black hover:bg-gray-50"}
          `}
          aria-pressed={active}
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
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-12">
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
      <Dialog
        open={!!quoteModal}
        onClose={() => setQuoteModal(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full">
            <Dialog.Title className="text-xl font-bold">
              Request a Quote
            </Dialog.Title>

            <p className="mt-2 text-gray-600">
              We’ll contact you regarding{" "}
              <strong>{quoteModal?.name}</strong>.
            </p>

            <form className="mt-4 flex flex-col gap-4">
              <Input placeholder="Full Name" />
              <Input type="email" placeholder="Email Address" />
              <Input type="tel" placeholder="Phone Number" />
              <Textarea rows={3} placeholder="Additional Notes" />
              <button className="bg-black text-white py-2 rounded-md">
                Submit Request
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
