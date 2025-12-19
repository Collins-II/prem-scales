"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { Product } from "@/data/dummy";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Gallery from "@/components/Gallery";

interface ProductDetailsProps {
  product: Product;
}

export default function IndexDetailsPage({ product }: ProductDetailsProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found.
      </div>
    );
  }

  // Swipe support for mobile lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swipe left → next image
      setLightboxIndex((prev) =>
        prev === product.gallery!.length - 1 ? 0 : prev + 1
      );
    } else if (diff < -50) {
      // Swipe right → previous image
      setLightboxIndex((prev) =>
        prev === 0 ? product.gallery!.length - 1 : prev - 1
      );
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <Link
          href="/Products"
          className="text-xs sm:text-sm text-gray-500 hover:text-black transition"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Product Section */}
      <section className="max-w-6xl mx-auto px-4 pt-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <Gallery initialImage={product.image} images={product.gallery as string[]} alt="PRODUCT_DETAILS_GALLERY"/>

        {/* Details */}
        <div className="flex flex-col gap-5">
           <div className="w-full bg-black pl-4 py-3">
             <span className="text-[16px] uppercase tracking-widest text-gray-300">
             {product.category}
          </span>
           </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            {product.price.toLocaleString("en-ZM", {
              style: "currency",
              currency: "ZMW",
            })}
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-prose">
            {product.description}
          </p>
          <div className="h-px bg-gray-200 my-2" />
          {product.features && (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-gray-900">Key Features</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {product.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}
          {product.specifications && (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b py-1">
                    <span className="font-medium">{key}</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4">
            <button
              onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-sm font-medium rounded-xs hover:bg-gray-900 transition"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <Dialog.Panel
            className="relative bg-white rounded-lg max-w-3xl w-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 text-gray-900 text-2xl font-bold"
            >
              ×
            </button>

            {product.gallery && product.gallery.length > 0 && (
              <div className="relative w-full h-[60vh] sm:h-[70vh]">
                <Image
                  src={product.gallery[lightboxIndex]}
                  alt={`${product.name} ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === 0 ? product.gallery!.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-900 text-2xl font-bold bg-white/70 rounded-full p-2"
            >
              ◀
            </button>
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === product.gallery!.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-900 text-2xl font-bold bg-white/70 rounded-full p-2"
            >
              ▶
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {product.gallery?.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === lightboxIndex ? "bg-gray-900" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Quote Modal */}
      <Dialog
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-sm p-6 max-w-md w-full">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Request a Quote
            </Dialog.Title>

            <p className="mt-1 text-sm text-gray-600">
              For <strong>{product.name}</strong>
            </p>

            <form className="mt-4 flex flex-col gap-3">
              <Input placeholder="Full Name" />
              <Input type="email" placeholder="Email Address" />
              <Input type="tel" placeholder="Phone Number" />
              <Textarea rows={3} placeholder="Additional requirements" />

              <button
                type="submit"
                className="mt-2 bg-black text-white py-2 rounded-xs text-sm font-medium hover:bg-gray-900 transition"
              >
                Submit Request
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
