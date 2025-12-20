"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ServiceRequestForm({
  serviceName,
}: {
  serviceName: string;
}) {
  const [loading] = useState(false);

  return (
    <section className="w-full bg-white">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <span className="inline-block mb-2 text-sm font-medium uppercase tracking-wide text-red-600">
          Service Enquiry
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Request {serviceName}
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Share your requirements with us and one of our specialists will
          contact you to discuss scope, pricing, and timelines.
        </p>
      </div>

      {/* Form */}
      <form className="grid gap-6 max-w-3xl">
        {/* Name / Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              required
              placeholder="John Banda"
              className="h-12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              required
              type="email"
              placeholder="john@company.com"
              className="h-12"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <Input
            required
            placeholder="+260 XXX XXX XXX"
            className="h-12"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Requirements
          </label>
          <Textarea
            required
            rows={5}
            placeholder={`Tell us about your ${serviceName} needs, equipment type, location, and timeframe.`}
            className="resize-none"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Submit */}
        <div className="flex items-center flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            We usually respond within 24 business hours.
          </p>

          <button
            disabled={loading}
            className="
              inline-flex items-center justify-center
              rounded-full px-8 py-3
              bg-gray-900 text-white
              font-semibold
              hover:bg-red-600
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </section>
  );
}
