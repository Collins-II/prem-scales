"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// -----------------------------
// Types
// -----------------------------
interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  href: string;
}

// -----------------------------
// Premier Scales Zambia – News Data
// --------------------------------
const news: NewsItem[] = [
  {
    id: 1,
    title: "Premier Scales Zambia Expands Industrial Weighing Solutions Nationwide",
    excerpt:
      "The company announces expanded supply and installation of industrial weighing scales to manufacturing plants, mines, and warehouses across Zambia.",
    image: "/products/industrial-scale.png",
    date: "Aug 22, 2025",
    href: "/news/industrial-weighing-expansion-zambia",
  },
  {
    id: 2,
    title: "New Calibration Services Launched for Retail and Industrial Scales",
    excerpt:
      "Premier Scales Zambia introduces certified calibration and maintenance services to improve accuracy, compliance, and equipment lifespan.",
    image: "/products/calibration-service.png",
    date: "Aug 15, 2025",
    href: "/news/calibration-services-launch",
  },
  {
    id: 3,
    title: "Premier Scales Zambia Supplies High-Capacity Weighbridges to Mining Sector",
    excerpt:
      "The company delivers heavy-duty weighbridge systems designed for high-volume mining and logistics operations.",
    image: "/products/weighbridge.png",
    date: "Aug 07, 2025",
    href: "/news/weighbridge-mining-sector",
  },
  {
    id: 4,
    title: "Premier Scales Zambia Achieves Compliance with National Measurement Standards",
    excerpt:
      "The company confirms full compliance with Zambia Bureau of Standards requirements for commercial weighing equipment.",
    image: "/products/certified-scale.png",
    date: "Jul 30, 2025",
    href: "/news/zambia-measurement-standards-compliance",
  },
];


// -----------------------------
// Skeletons
// -----------------------------
function BannerSkeleton() {
  return (
    <div className="h-56 sm:h-64 rounded-2xl bg-gray-200 animate-pulse" />
  );
}

function NewsItemSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-24 h-16 rounded-lg bg-gray-200 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

// -----------------------------
// Component
// -----------------------------
export default function TopNews() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full bg-white ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5">
        {/* Banner */}
        <div className="lg:col-span-1 pb-5">
          {loading ? (
            <BannerSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-26 sm:h-34 lg:h-full overflow-hidden border border-neutral-200"
            >
              <Image
                src="/products/retail-s1.png"
                alt="Company News"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs uppercase tracking-wide opacity-90">Company News</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* News List */}
        <div className="lg:col-span-3 space-y-2 ">
          <div className="border border-neutral-200 rounded-xl divide-y">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <NewsItemSkeleton key={i} />)
              : news.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="group flex gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <h5 className="font-light text-gray-900 leading-snug mt-1 group-hover:text-blue-600 transition">
                        {item.title}
                      </h5>
                    </div>

                    <Link
                      href={item.href}
                      className="self-center text-gray-400 group-hover:text-blue-600 transition"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </motion.article>
                ))}
          </div>
          <div className="w-full flex justify-end items-center">
          <Link
            href="/News"
             className=" flex items-center text-xs font-semibold tracking-widest uppercase text-neutral-500">More <ArrowRight size={16} />
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
