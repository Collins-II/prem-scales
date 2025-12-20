"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const values = [
  {
    title: "Accuracy & Compliance",
    desc: "We deliver precise, certified weighing solutions aligned with national and international standards.",
  },
  {
    title: "Professional Expertise",
    desc: "Our team consists of trained technicians with deep industry experience.",
  },
  {
    title: "Customer Commitment",
    desc: "We focus on long-term partnerships, not one-off transactions.",
  },
];

const industries = [
  "Retail & Supermarkets",
  "Laboratories & Research",
  "Industrial & Manufacturing",
  "Logistics & Transport",
  "Agriculture & Commodities",
];

export default function AboutUsPage() {
  return (
    <main className="bg-white">

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Who We Are
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We are a Zambian-based provider of professional weighing equipment
            and services, supporting businesses across retail, laboratory,
            industrial, and logistics sectors.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            From supply and installation to calibration, maintenance, and
            compliance certification, we help our clients operate with
            confidence and accuracy.
          </p>
        </div>

        <div className="relative h-[360px] rounded-2xl overflow-hidden">
          <Image
            src="/products/lab-s1.png"
            alt="Our Work"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6"
              >
                <CheckCircle className="h-6 w-6 text-red-600" />
                <h3 className="mt-4 font-semibold text-lg text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Industries We Serve
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((industry, i) => (
            <div
              key={i}
              className="text-[11px] md:text-sm border rounded-xl px-5 py-4 text-gray-700 font-medium"
            >
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Partner With a Trusted Weighing Solutions Provider
          </h2>
          <p className="mt-4 text-neutral-300">
            Whether you need equipment, calibration, or long-term service
            support, we are ready to help.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/Services"
              className="rounded-full text-[11px] text-xs bg-red-600 px-8 py-3 font-semibold hover:bg-red-700 transition"
            >
              View Services
            </Link>

            <Link
              href="/Contact"
              className="rounded-full text-[11px] text-xs border border-white/40 px-8 py-3 font-semibold hover:bg-white hover:text-black transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
