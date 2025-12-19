"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();

  // Convert pathname to readable label
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) =>
      seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );

  const pageTitle =
    segments.length > 0
      ? segments[segments.length - 1]
      : "Precision Weighing Solutions";

  return (
    <header className="relative w-full bg-neutral-200 h-[30vh] min-h-[240px] flex items-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/products/retail-s5.png"
          alt="Premier Scales Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-10 flex flex-col gap-4">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-neutral-300">
          <Link
            href="/"
            className="hover:text-white transition font-medium"
          >
            Home
          </Link>

          {segments.map((seg, i) => (
            <span key={i} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4 text-neutral-400" />
              <span
                className={`${
                  i === segments.length - 1
                    ? "text-white font-semibold"
                    : "text-neutral-300"
                }`}
              >
                {seg}
              </span>
            </span>
          ))}
        </nav>

        {/* Title */}
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {pageTitle}
          </h1>
          <p className="mt-2 text-base md:text-lg text-neutral-200 max-w-2xl">
            Accurately Measuring Zambia
          </p>
        </div>
      </div>
    </header>
  );
}
