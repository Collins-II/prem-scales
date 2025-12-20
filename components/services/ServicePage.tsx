"use client";

import ServiceCard from "@/components/services/ServiceCard";
import { SERVICES } from "@/data/dummy";
import ThemedHeading from "@/components/themed-heading";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <ThemedHeading
          title="Our Services"
          eyebrow="Reliable support across the full lifecycle of your weighing equipment"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-neutral-50 border-t">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Why Choose Premier Scales?
            </h2>
            <p className="mt-4 text-gray-600">
              We combine technical expertise, certified processes, and
              industry experience to deliver dependable weighing solutions.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>✔ Certified technicians</li>
              <li>✔ Fast response times</li>
              <li>✔ Nationwide support</li>
              <li>✔ Long-term service partnerships</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Need a custom solution?
            </h3>
            <p className="mt-3 text-gray-600">
              Talk to our experts and we’ll tailor a service plan for your
              business.
            </p>

            <Link
              href="/Contact"
              className="inline-block mt-6 rounded-full bg-red-600 px-8 py-3 text-white font-semibold hover:bg-red-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
