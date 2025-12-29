"use client";

import { IoLogoWhatsapp } from "react-icons/io5";

type FloatingWhatsAppProps = {
  phone: string;          // international format, e.g. 260970785901
  label?: string;         // button text
  position?: "right" | "left";
};

export default function FloatingWhatsApp({
  phone,
  label,
  position = "right",
}: FloatingWhatsAppProps) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-6 ${
        position === "right" ? "right-6" : "left-6"
      } z-50 flex flex-col items-center gap-2 rounded-full bg-green-500 p-3 text-sm font-semibold text-white shadow-lg hover:bg-green-600 transition`}
    >
      <IoLogoWhatsapp className="h-6 w-6" />
      {label}
    </a>
  );
}
