"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {

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
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-gray-50 border-t text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div className="space-y-4">
                    {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
         <Image
            src="/assets/logo/zm_logo.jpeg"
            alt="Premier-Scales"
            width={44}
            height={44}
            className="rounded-xs object-contain"
          /> 
        </Link>
          <p className="text-gray-600 text-sm leading-relaxed">
            Providing precision weighing solutions across Zambia. 
            Calibration, maintenance, and compliance support for retail, industrial, and laboratory sectors.
          </p>

          <div className="flex gap-4">
            <a href="https://facebook.com/premierscaleservices" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-red-600 transition" />
            </a>
            <a href="https://linkedin.com/premierscaleservices" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 hover:text-red-600 transition" />
            </a>
            <a href="https://twitter.com/premierscaleservices" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-red-600 transition" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/Products/weighbridge-scale" className="hover:text-red-600 transition">Products</Link>
            </li>
            <li>
              <Link href="/Industry-Sectors" className="hover:text-red-600 transition">Industry Sectors</Link>
            </li>
            
            <li>
              <Link href="/Services" className="hover:text-red-600 transition">Services</Link>
            </li>
            <li>
              <Link href="/Why-Us" className="hover:text-red-600 transition">Why Us</Link>
            </li>
            <li>
              <Link href="/Contact-Us" className="hover:text-red-600 transition">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-600" />
              <a href="tel:+260970785901" className="hover:text-red-600 transition">+260 970 785 901</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-red-600" />
              <a href="mailto:premier_scale@hotmail.com" className="hover:text-red-600 transition">premier_scale@hotmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-red-600 mt-1" />
              <span>
                Plot No. 4298 Corner Lumumba Rd & Buyantanshi Rd, Lusaka, Zambia
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe for updates, offers, and latest news.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {success && (
              <p className="text-sm text-green-600">
                Your message has been sent successfully.
              </p>
            )}
            </div>
            <button
              type="submit"
              className="h-8 flex items-center rounded-xl bg-red-600 px-4 py-2 text-white text-sm font-semibold hover:bg-red-700 transition"
            >
              
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t text-center text-sm text-gray-500 py-6">
        &copy; {new Date().getFullYear()} Premier Scales. All rights reserved.
      </div>
    </footer>
  );
}
