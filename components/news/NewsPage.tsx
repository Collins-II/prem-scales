"use client";

import Image from "next/image";
import Link from "next/link";
import { NEWS } from "@/data/dummy";
import { ArrowRight } from "lucide-react";

export default function NewsPage() {
  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  return (
    <main className="bg-white">

      {/* Featured */}
      {featured && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-wide text-red-600">
                {featured.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900">
                {featured.title}
              </h2>
              <p className="mt-4 text-gray-600">
                {featured.excerpt}
              </p>

              <Link
                href={`/News/${featured.slug}`}
                className="inline-flex items-center gap-2 mt-6 text-red-600 font-semibold hover:underline"
              >
                Read full story <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative h-[320px] rounded-2xl overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* News List */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((item) => (
            <article
              key={item.id}
              className="border rounded-2xl overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {item.category}
                </span>

                <h3 className="mt-2 font-semibold text-lg text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {item.excerpt}
                </p>

                <Link
                  href={`/News/${item.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-red-600 hover:underline"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-50 border-t">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Media Enquiries
          </h2>
          <p className="mt-2 text-gray-600">
            For press, partnerships, or official statements, contact our team.
          </p>

          <Link
            href="/Contact"
            className="inline-block mt-6 rounded-full bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </main>
  );
}
