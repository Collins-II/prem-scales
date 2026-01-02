"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, SlidersHorizontal, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/cards/ProductCard";
import SkeletonSearch from "@/components/skeletons/search-skeleton";
import { Product } from "@/data/dummy";

/* --------------------------- Types ---------------------------- */
type SortOption = "relevance" | "price_low" | "price_high" | "newest";

interface SearchResponse {
  results: Product[];
  total: number;
  page: number;
  limit: number;
}

/* --------------------------- Constants ---------------------------- */
const DEFAULT_LIMIT = 12;
const STORAGE_KEY = "product-search-filters";

/* --------------------------- Utils ---------------------------- */
function useDebounced<T>(value: T, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

/* --------------------------- Page ---------------------------- */
export default function ProductSearchPage() {
  const router = useRouter();
  const params = useSearchParams();

  /* --------------------------- Filters ---------------------------- */
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [scaleType, setScaleType] = useState(params.get("type") || "all");
  const [sort, setSort] = useState<SortOption>(
    (params.get("sort") as SortOption) || "relevance"
  );

  const [minCapacity, setMinCapacity] = useState(params.get("minCap") || "");
  const [maxCapacity, setMaxCapacity] = useState(params.get("maxCap") || "");
  const [minPrice, setMinPrice] = useState(params.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") || "");

  const debouncedQuery = useDebounced(query);

  /* --------------------------- Mobile Filters ---------------------------- */
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* --------------------------- Compare ---------------------------- */
  const [compare, setCompare] = useState<Product[]>([]);

  const toggleCompare = (p: Product) => {
    setCompare((prev) =>
      prev.find((x) => x._id === p._id)
        ? prev.filter((x) => x._id !== p._id)
        : [...prev.slice(-2), p]
    );
  };

  /* --------------------------- Data ---------------------------- */
  const [results, setResults] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  /* --------------------------- Persist Filters ---------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const f = JSON.parse(stored);
    setCategory(f.category ?? category);
    setScaleType(f.scaleType ?? scaleType);
    setSort(f.sort ?? sort);
    setMinCapacity(f.minCapacity ?? "");
    setMaxCapacity(f.maxCapacity ?? "");
    setMinPrice(f.minPrice ?? "");
    setMaxPrice(f.maxPrice ?? "");
  }, [category,scaleType, sort]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        category,
        scaleType,
        sort,
        minCapacity,
        maxCapacity,
        minPrice,
        maxPrice,
      })
    );
  }, [category, scaleType, sort, minCapacity, maxCapacity, minPrice, maxPrice]);

  /* --------------------------- Sync URL ---------------------------- */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    url.searchParams.set("category", category);
    url.searchParams.set("type", scaleType);
    url.searchParams.set("sort", sort);
    if (minCapacity) url.searchParams.set("minCap", minCapacity);
    if (maxCapacity) url.searchParams.set("maxCap", maxCapacity);
    if (minPrice) url.searchParams.set("minPrice", minPrice);
    if (maxPrice) url.searchParams.set("maxPrice", maxPrice);
    router.replace(url.pathname + "?" + url.searchParams.toString());
  }, [
    query,
    category,
    scaleType,
    sort,
    minCapacity,
    maxCapacity,
    minPrice,
    maxPrice,
    router,
  ]);

  /* --------------------------- Fetch ---------------------------- */
  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(
          debouncedQuery
        )}&category=${category}&type=${scaleType}&sort=${sort}&minCap=${minCapacity}&maxCap=${maxCapacity}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${DEFAULT_LIMIT}`
      );
      if (!res.ok) throw new Error();
      const data = (await res.json()) as SearchResponse;
      setResults((p) => (page === 1 ? data.results : [...p, ...data.results]));
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedQuery,
    category,
    scaleType,
    sort,
    minCapacity,
    maxCapacity,
    minPrice,
    maxPrice,
    page,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    debouncedQuery,
    category,
    scaleType,
    sort,
    minCapacity,
    maxCapacity,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  /* --------------------------- Infinite Scroll ---------------------------- */
  useEffect(() => {
    if (!loaderRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !loading && results.length < total) {
        setPage((p) => p + 1);
      }
    });
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [loading, results.length, total]);

  /* --------------------------- Render ---------------------------- */
  return (
    <>
      <Head>
        <title>Search Products | Premier Scales</title>
      </Head>

      <main className="min-h-screen bg-white pt-24">
         <section className="max-w-5xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-600">
            Search Industrial Weighing Products
          </h1>
          <p className="mt-3 text-gray-600">
            Filter by category, capacity, price, or application.
          </p>
        </section>
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[300px_1fr] gap-6">

          {/* Desktop Filters */}
          <aside className="hidden lg:block sticky top-28 h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-md font-semibold text-red-600 mb-3">
              Refine Results
            </h3>

            <div className="space-y-6 text-sm">
              <div>
                <label className="block text-gray-700 mb-1">Capacity</label>
                <div className="flex gap-2">
                  <input
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600"
                  />
                  <input
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Price</label>
                <div className="flex gap-2">
                  <input
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600"
                  />
                  <input
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <section>
            {/* Search Bar */}
            <div className="flex items-center gap-3 mb-8">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scales equipments…"
                className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-sm text-gray-600 focus:border-gray-900 focus:outline-none"
              />

              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2 text-red-600" />
                <span className="text-gray-600">Filters</span>
              </Button>

              {query && (
                <Button variant="ghost" onClick={() => setQuery("")}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {loading && page === 1
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonSearch key={i} />
                  ))
                : results?.map((p) => (
                    <div key={p._id} className="relative">
                      <ProductCard product={p} />
                      <button
                        aria-label="Toggle compare"
                        onClick={() => toggleCompare(p)}
                        className="absolute top-3 right-3 rounded-full border border-gray-200 bg-white p-1.5"
                      >
                        <Check
                          className={`h-4 w-4 ${
                            compare.find((x) => x._id === p._id)
                              ? "text-green-600"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
            </div>

            <div
              ref={loaderRef}
              className="h-16 flex items-center justify-center text-sm text-gray-500 mt-12"
            >
              {loading
                ? "Loading more products…"
                : results.length < total
                ? "Scroll to load more"
                : "End of results"}
            </div>
          </section>
        </div>

        {/* Mobile Filters Drawer */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFiltersOpen(false)}
              />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 28 }}
                className="fixed bottom-0 inset-x-0 z-50 rounded-t-2xl bg-white p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-red-600">Filters</h3>
                  <button aria-label="button-close" onClick={() => setMobileFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6 text-gray-600">
                  <div>
                    <label className="block text-sm mb-1">Capacity</label>
                    <div className="flex gap-2">
                      <input className="w-full rounded-lg border px-3 py-2" placeholder="Min" value={minCapacity} onChange={(e) => setMinCapacity(e.target.value)} />
                      <input className="w-full rounded-lg border px-3 py-2" placeholder="Max" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Price</label>
                    <div className="flex gap-2">
                      <input className="w-full rounded-lg border px-3 py-2" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                      <input className="w-full rounded-lg border px-3 py-2" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-8" onClick={() => setMobileFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
