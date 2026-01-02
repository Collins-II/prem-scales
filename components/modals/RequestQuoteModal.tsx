"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type QuoteProduct = {
  _id: string;
  name: string;
};

interface RequestQuoteModalProps {
  open: boolean;
  onClose: () => void;
  product: QuoteProduct | null;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3001";

export function RequestQuoteModal({
  open,
  onClose,
  product,
}: RequestQuoteModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`${BASE_URL}/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product?._id,
          productName: product?.name,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setSuccess(true);
    } catch (err) {
      console.log("QUOTE_ERR",err)
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          {/* Close */}
          <button
            aria-label="close-button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>

          {!success ? (
            <>
              <Dialog.Title className="text-2xl font-bold text-red-600">
                Request a Quote
              </Dialog.Title>

              <p className="mt-2 text-sm text-gray-600">
                We’ll contact you regarding{" "}
                <span className="font-semibold">{product?.name}</span>.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-4"
              >
                <Input
                  name="name"
                  placeholder="Full Name"
                  required
                  className="text-neutral-700"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="text-neutral-700"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="text-neutral-700"
                />
                <Textarea
                  name="message"
                  rows={3}
                  placeholder="Additional notes (optional)"
                  className="text-neutral-700"
                />

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold text-red-600">Request Sent 🎉</h3>
              <p className="mt-2 text-gray-600">
                Our team will contact you shortly.
              </p>

              <Button className="mt-6" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
