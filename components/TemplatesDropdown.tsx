"use client";

import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { NAVIGATION_DATA } from "@/data/navigation";
import Collection from "@/components/Collection";
import Image from "next/image";
import Link from "next/link";

export default function TemplatesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      className="hidden lg:block self-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <>
        {/* Trigger */}
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
                    {NAVIGATION_DATA.map((item, index) => (
                      <Link key={index} href={`/Products`} onClick={() => setOpen(false)}>
                        <div key={index} className="mb-4 flex p-5 transition-all duration-200 cursor-pointer items-center justify-center rounded-xs bg-gray-100 group-hover:bg-gray-200 transition">
                        <div className="flex flex-col gap-3 w-full h-full justify-center items-center">
                          <div className="relative w-30 h-30">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                          </div>
                          <p className="text-sm font-light text-gray-900 truncate line-clamp-2">
                          {item.name}
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
