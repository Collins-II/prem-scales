"use client";

import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Collection from "@/components/Collection";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

/* ------------------------------------------------------------
   Types
------------------------------------------------------------ */
interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

/* ------------------------------------------------------------
   Component
------------------------------------------------------------ */
export default function TemplatesDropdown() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* ------------------------------------------------------------
     Fetch Categories
  ------------------------------------------------------------ */
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch("/api/categories", {
          signal: controller.signal,
          next: { revalidate: 300 } // ✅ cache-friendly
        });

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data: Category[] = await res.json();

        setCategories(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("[TEMPLATES_DROPDOWN_FETCH]", err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  return (
    <Popover
      className="hidden lg:block self-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <>
        {/* Trigger */}
        <div className="relative px-3 cursor-pointer">
          <span className="text-md py-1 font-light text-gray-800">
            Products
          </span>

          {/* Animated underline */}
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 z-5 ${
              open ? "w-full" : "w-0"
            }`}
          />
        </div>

        {/* Dropdown */}
        <Transition
          as={Fragment}
          show={open}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Popover.Panel className="absolute inset-x-0 top-full z-30">
            <div className="bg-white shadow-xl border-t">
              <div className="container max-w-5xl mx-auto px-6">
                <div className="flex gap-12 py-14">

                  {/* Categories Grid */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading && (
                      <p className="col-span-full text-sm text-muted-foreground">
                        Loading categories…
                      </p>
                    )}

                    {error && (
                      <p className="col-span-full text-sm text-red-500">
                        Failed to load categories
                      </p>
                    )}

                    {!loading &&
                      !error &&
                      categories?.map(category => (
                        <Link
                          key={category._id}
                          href={`/Products/${slugify(category.name).toLowerCase()}-scale`}
                          onClick={() => setOpen(false)}
                        >
                          <div className="mb-4 flex p-5 transition-all duration-200 cursor-pointer items-center justify-center rounded-xs bg-gray-100 hover:bg-gray-200">
                            <div className="flex flex-col gap-3 w-full h-full justify-center items-center">
                              <div className="relative w-20 h-20">
                                <Image
                                  src={category.image || "/products/lab-s1.png"}
                                  alt={category.name || "CATEGORY_IMAGE"}
                                  fill
                                  className="object-contain"
                                />
                              </div>

                              <p className="text-sm font-light text-gray-900 text-center line-clamp-2">
                                {category.name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>

                  {/* Promo / Collection */}
                  <div className="w-[30%] hidden xl:block">
                    <Collection featuredImage="/products/retail-s3.png" />
                  </div>

                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  );
}
