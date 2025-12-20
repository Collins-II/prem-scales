"use client";

import Image from "next/image";
import { Product, ServiceDetail } from "@/data/dummy";
import { ProductCard } from "@/components/cards/ProductCard";
import ServicePricing from "@/components/services/ServicePricing";
import ServiceRequestForm from "@/components/services/ServiceRequestForm";

interface ServiceDetailsProps {
  service: ServiceDetail;
  related: Product[];
}

export default function ServiceDetailsPage({
  service,
  related,
}: ServiceDetailsProps) {
  return (
    <main className="bg-white ">
      {/* ================= HERO ================= */}
      <section className="border-b pt-14">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <span className="inline-block mb-3 text-sm font-medium tracking-wide text-red-600 uppercase">
              Professional Service
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {service.title}
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {service.longDescription}
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[320px] rounded-3xl overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Service Plans & Pricing
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Flexible pricing tiers designed for businesses of all sizes — from
            single installations to enterprise-scale operations.
          </p>
        </div>

        <ServicePricing tiers={service.tiers} />
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-b">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="mb-10">
              <span className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-red-600">
                Related Products
              </span>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Products commonly paired with this service for optimal
                performance and compliance.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {related.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= REQUEST FORM ================= */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-white">
          <ServiceRequestForm serviceName={service.title} />
        </div>
      </section>
    </main>
  );
}
