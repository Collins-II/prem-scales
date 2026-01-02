"use client";

import { useState } from "react";
import Link from "next/link";
import slugify from "slugify";
import { CheckCircle, XCircle } from "lucide-react";

import { Product } from "@/data/dummy";
import Gallery from "@/components/Gallery";
import { RequestQuoteModal } from "@/components/modals/RequestQuoteModal";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetailsPage({ product }: ProductDetailsProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* -------------------- Breadcrumb -------------------- */}
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <Link
          href={`/Products/${slugify(product.scaleType).toLowerCase()}-scale`}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to {product.scaleType} Scales
        </Link>
      </div>

      {/* -------------------- Main Section -------------------- */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* -------------------- Gallery -------------------- */}
        <Gallery
          initialImage={product.image}
          images={product.gallery || []}
          alt={product.name}
        />

        {/* -------------------- Details -------------------- */}
        <div className="flex flex-col gap-6">
          {/* Meta */}
           <div className="w-full bg-black py-3">
             <span className="text-[16px] uppercase tracking-widest text-gray-800 bg-white p-1">
               {product.category.name}
             </span>
           </div>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="border px-2 py-1 rounded text-red-600">
              {product.scaleType}
            </span>
            {product.inStock ? (
              <span className="flex items-center gap-1 text-green-700">
                <CheckCircle size={14} /> In Stock
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600">
                <XCircle size={14} /> Out of Stock
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* Price (secondary in B2B) */}
          <p className="text-lg font-medium text-gray-700">
            {product.price.toLocaleString("en-ZM", {
              style: "currency",
              currency: product.currency,
            })}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed max-w-prose">
            {product.description}
          </p>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-black transition"
            >
              Request a Quote
            </button>
          </div>

          <div className="border-t pt-6 space-y-6">
            {/* -------------------- Capacity & Dimensions -------------------- */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {(product.minCapacity || product.maxCapacity) && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Capacity</h4>
                  <p className="text-gray-600">
                    {product.minCapacity ?? "—"} – {product.maxCapacity ?? "—"}
                  </p>
                </div>
              )}

              {product.dimensions && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Dimensions</h4>
                  <p className="text-gray-600">{product.dimensions}</p>
                </div>
              )}
            </div>

            {/* -------------------- Features -------------------- */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Key Features
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* -------------------- Specifications -------------------- */}
            {product.specifications && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Technical Specifications
                </h3>
                <div className="border rounded-lg divide-y text-sm">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} className="flex justify-between px-4 py-2">
                      <span className="text-gray-700">{k}</span>
                      <span className="text-gray-900 font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- Accuracy & Certifications -------------------- */}
            {(product.accuracyClass || product.certifications?.length) && (
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {product.accuracyClass && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Accuracy Class
                    </h4>
                    <p className="text-gray-600">
                      {product.accuracyClass}
                    </p>
                  </div>
                )}

                {product.certifications && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Certifications
                    </h4>
                    <p className="text-gray-600">
                      {product.certifications.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* -------------------- Variants -------------------- */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Available Variants
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {product.variants.map((v, i) => (
                    <li key={i}>
                      {v.sku} — {v.sku}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* -------------------- Tags -------------------- */}
            {product.tags && (
              <div className="flex flex-wrap gap-2 text-xs">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="border rounded px-2 py-1 text-gray-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* -------------------- Meta -------------------- */}
            <div className="text-xs text-gray-400 pt-4">
              Last updated:{" "}
              {new Date(product.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- Request Quote Modal -------------------- */}
      <RequestQuoteModal
        open={quoteOpen}
        product={product}
        onClose={() => setQuoteOpen(false)}
      />
    </main>
  );
}
