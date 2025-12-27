"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "./cards/ProductCard";
import { useRouter, usePathname } from "next/navigation";

/* -------------------- SCALE TYPES -------------------- */
const SCALE_TYPES = [
  "All",
  "Retail",
  "Laboratory",
  "Industrial",
  "Medical",
  "Agricultural",
  "Weighbridge",
  "Platform",
  "Crane",
  "Analytical",
  "Counting"
] as const;

const SORT_OPTIONS = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
  "Name: A–Z"
] as const;

/* -------------------- TYPES -------------------- */

interface ProductsProps {
  products: any[];
}

function scaleTypeToSlug(type: string) {
  if (type === "All") return "/Products";

  return `/Products/${type
    .toLowerCase()
    .replace(/\s+/g, "-")}-scale`;
}


export default function ProductsPage({ products = [] }: ProductsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scaleType, setScaleType] =
    useState<(typeof SCALE_TYPES)[number]>("All");

  const [sort, setSort] =
    useState<(typeof SORT_OPTIONS)[number]>("Default");

  const [quoteModal, setQuoteModal] = useState<any | null>(null);

  /* -------------------- PAGINATION -------------------- */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
  const match = pathname.match(/\/Products\/(.+)-scale$/);
  if (match) {
    const type = match[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());

    if (SCALE_TYPES.includes(type as any)) {
      setScaleType(type as any);
    }
  }
}, [pathname]);


  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = useMemo(() => {
    let items = products.filter(product =>
      scaleType === "All" ? true : product.scaleType === scaleType
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
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Premier Scales Zambia Products",
            brand: "Premier Scales",
            category: "Weighing Equipment",
            url: "https://premierscales.co.zm/products"
          })
        }}
      />

      {/* -------------------- FILTER BAR -------------------- */}
      <section className="w-full bg-white border px-6 md:px-10 ">
        <div className="max-w-5xl mx-auto sm:px-4 py-3 flex flex-col gap-3 sm:gap-4 md:items-center md:justify-center">
  
  {/* Categories */}
 



<div className="flex flex-wrap">
  {SCALE_TYPES.map(type => {
    const active = scaleType === type;

    return (
      <button
        key={type}
        onClick={() => {
          setScaleType(type);
          setPage(1);

          const url = scaleTypeToSlug(type);

          // prevent unnecessary pushes
          if (pathname !== url) {
            router.push(url, { scroll: false });
          }
        }}
        className={`
          px-4 sm:px-12 py-1.5 sm:py-2
          text-[11px] sm:text-sm
          font-medium
          rounded-xs
          whitespace-nowrap
          transition-all
          ${active
            ? "bg-black text-white shadow-sm"
            : "bg-neutral-100 border border-gray-200 text-gray-700 hover:border-black hover:bg-white"}
        `}
        aria-pressed={active}
      >
        {type}
      </button>
    );
  })}
</div>


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
