"use client";

import Link from "next/link";
import {
  CheckCircle,
  ShieldCheck,
  Wrench,
  Clock,
  Award,
} from "lucide-react";

const differentiators = [
  {
    title: "Certified Accuracy",
    desc: "All services follow national and international weighing standards with full documentation.",
    icon: ShieldCheck,
  },
  {
    title: "Industry Expertise",
    desc: "Experienced technicians with deep knowledge across retail, industrial, and laboratory environments.",
    icon: Award,
  },
  {
    title: "End-to-End Service",
    desc: "From supply and installation to calibration, maintenance, and compliance certification.",
    icon: Wrench,
  },
  {
    title: "Fast Response Times",
    desc: "On-site support and rapid turnaround to minimize downtime and operational risk.",
    icon: Clock,
  },
];

const industries = [
  "Retail & Supermarkets",
  "Laboratories & Research",
  "Industrial & Manufacturing",
  "Logistics & Transport",
  "Agriculture & Commodities",
  "Healthcare & Pharmaceuticals",
];

const process = [
  {
    step: "01",
    title: "Assessment",
    desc: "We evaluate your operational needs, compliance requirements, and usage environment.",
  },
  {
    step: "02",
    title: "Implementation",
    desc: "Professional installation, configuration, or calibration using certified equipment.",
  },
  {
    step: "03",
    title: "Verification",
    desc: "Testing, certification, and documentation to ensure accuracy and compliance.",
  },
  {
    step: "04",
    title: "Ongoing Support",
    desc: "Preventive maintenance, service contracts, and priority technical support.",
  },
];

export default function WhyUsPage() {
  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="max-w-5xl mx-auto px-6 py-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-wide text-red-600 font-semibold">
            Why Choose Us
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
            Trusted Weighing Solutions Built on Accuracy & Compliance
          </h1>
          <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
            We help businesses operate with confidence by delivering precise,
            certified weighing solutions supported by expert service and
            long-term reliability.
          </p>
        </div>

      </section>

      {/* ================= DIFFERENTIATORS ================= */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-14">
            What Sets Us Apart
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-2 "
              >
                <item.icon className="h-7 w-7 text-red-600" />
                <h3 className="mt-4 font-semibold text-lg text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
          How We Work
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {process.map((step, i) => (
            <div key={i} className="relative">
              <span className="text-5xl font-extrabold text-neutral-300">
                {step.step}
              </span>
              <h3 className="mt-4 font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            Industries We Support
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white border rounded-xl px-5 py-4 text-sm text-gray-700 font-medium"
              >
                <CheckCircle className="h-4 w-4 text-red-600" />
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Work With a Proven Weighing Partner
          </h2>
          <p className="mt-4 text-neutral-300 max-w-xl mx-auto">
            From compliance-critical calibration to long-term service support,
            we help your operations stay accurate, reliable, and compliant.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/Services"
              className="rounded-full bg-red-600 px-8 py-3 text-xs font-semibold hover:bg-red-700 transition"
            >
              Explore Our Services
            </Link>

            <Link
              href="/Contact-Us"
              className="rounded-full border border-white/40 px-8 py-3 text-xs font-semibold hover:bg-white hover:text-black transition"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
