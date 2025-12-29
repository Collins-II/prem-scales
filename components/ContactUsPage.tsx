"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LocationMap from "./maps/LocationMap";

export default function ContactUsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to send");

      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-white ">



      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <span className="text-xs uppercase tracking-wide text-red-600 font-semibold">
          Contact Us
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
          Let’s Talk About Your Weighing Requirements
        </h1>
        <p className="mt-5 text-gray-600 max-w-2xl">
          Our team is ready to assist with equipment supply, calibration,
          compliance, and long-term service support.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid lg:grid-cols-[1fr_420px] gap-16">

        {/* LEFT */}
        <div className="space-y-10">

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
          <InfoCard
            icon={<Phone />}
            title="Phone"
            value="+260 970 785 901"
            href="tel:+260970785901"
         />

          <InfoCard
            icon={<Mail />}
            title="Email"
            value="premier_scale@hotmail.com"
            href="mailto:premier_scale@hotmail.com"
        />

            <InfoCard
              icon={<MapPin />}
              title="Office Location"
              value="Plot No. 4298 Corner Lumumba Rd & Buyantanshi Rd, Lusaka"
              full
            />
          </div>

         <LocationMap />

        </div>

        {/* FORM */}
        <div className="bg-neutral-50 border rounded-2xl p-6 md:p-8 h-fit">
          <h2 className="text-xl font-semibold text-gray-900">
            Send an Enquiry
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We typically respond within one business day.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <Input name="name" required placeholder="Full Name" />
            <Input name="email" required type="email" placeholder="Email Address" />
            <Input name="phone" required placeholder="Phone Number" />
            <Textarea
              name="message"
              required
              rows={4}
              placeholder="How can we help you?"
            />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {success && (
              <p className="text-sm text-green-600">
                Your message has been sent successfully.
              </p>
            )}

            <button
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? "Sending..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  value,
  href,
  full,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  full?: boolean;
}) {
  const Content = href ? "a" : "div";

  return (
    <div
      className={`flex items-start gap-4 border rounded-xl p-5 ${
        full ? "sm:col-span-2" : ""
      }`}
    >
      <div className="text-red-600 mt-1">{icon}</div>

      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>

        <Content
          {...(href
            ? {
                href,
                className:
                  "text-sm text-gray-600 hover:text-red-600 transition",
              }
            : {className:
                  "text-sm text-gray-600 transition"})}
        >
          {value}
        </Content>
      </div>
    </div>
  );
}
