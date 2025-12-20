"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, Product } from "@/data/dummy";
import { Dialog } from "@headlessui/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "./cards/ProductCard";

// Enhance dummy data
const PRODUCTS_WITH_PRICE = PRODUCTS.map((p, i) => ({
  ...p,
  price: (i + 1) * 100,
}));

const CATEGORIES = ["Retail", "Commercial", "Laboratory", "Industrial", "Medical"] as const;
const SORT_OPTIONS = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
  "Name: A–Z",
] as const;

export default function MarketPage() {
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>("Retail");
  const [sort, setSort] =
    useState<(typeof SORT_OPTIONS)[number]>("Default");
  const [quoteModal, setQuoteModal] = useState<Product | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = useMemo(() => {
    let items = PRODUCTS_WITH_PRICE.filter((product) => {
      return product.category === category;
    });

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
  }, [category, sort]);

  /* -------------------- PAGINATION -------------------- */
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
            url: "https://premierscales.co.zm/products",
          }),
        }}
      />

      {/* -------------------- FILTER BAR -------------------- */}
      <section className="w-full bg-white border px-6 md:px-10 ">
        <div className="max-w-5xl mx-auto sm:px-4 py-3 flex flex-col gap-3 sm:gap-4 md:items-center md:justify-center">
  
  {/* Categories */}
  <div className="flex flex-wrap">
    {CATEGORIES.map((cat) => {
      const active = category === cat;

      return (
        <button
          key={cat}
          onClick={() => {
            setCategory(cat);
            setPage(1);
          }}
          className={`
            px-4 sm:px-12 py-1.5 sm:py-2
            text-[11px] sm:text-sm
            font-medium
            rounded-xs
            whitespace-nowrap
            transition
            ${active
              ? "bg-black text-white"
              : "bg-neutral-100 border border-gray-200 text-gray-700 hover:border-black"}
          `}
        >
          {cat}
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
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {paginatedProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map(
              (product: Product & { price: number }) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRequestQuote={setQuoteModal}
                />
              )
            )}
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
          onPageSizeChange={(size: any) => {
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
