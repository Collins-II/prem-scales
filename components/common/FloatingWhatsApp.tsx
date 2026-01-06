"use client";

import { IoLogoWhatsapp } from "react-icons/io5";
import clsx from "clsx";

type FloatingWhatsAppProps = {
  phone: string;                 // e.g. 260970785901
  label?: string;                // e.g. "Chat with us"
  position?: "right" | "left";
};

export default function FloatingWhatsApp({
  phone,
  label = "Chat with us",
  position = "right",
}: FloatingWhatsAppProps) {
  return (
    <div
      className={clsx(
        "fixed bottom-6 z-50",
        position === "right" ? "right-6" : "left-6"
      )}
    >
      {/* Shimmer / Pulse Ring */}
      <span className="absolute inset-0 rounded-full animate-ping bg-green-400/40" />

      {/* Button */}
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative group flex items-center justify-center rounded-full bg-green-500 p-4 shadow-xl transition-all duration-300 hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        {/* Icon */}
        <IoLogoWhatsapp className="h-7 w-7 text-white drop-shadow-sm" />

        {/* Hover Label */}
        <span
          className={clsx(
            "pointer-events-none absolute bottom-4 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-all duration-300",
            position === "right"
              ? "right-full mr-3 translate-x-2 group-hover:translate-x-0"
              : "left-full ml-3 -translate-x-2 group-hover:translate-x-0",
            "group-hover:opacity-100"
          )}
        >
          {label}
        </span>
      </a>
    </div>
  );
}
