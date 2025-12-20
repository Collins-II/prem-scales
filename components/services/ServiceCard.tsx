"use client";

import { motion } from "framer-motion";
import { Service } from "@/data/dummy";
import Link from "next/link";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group bg-white p-6 transition"
    >
        <Link href={`/Services/${service.slug}`}>
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {service.title}
        </h3>
      </div>

      <p className="mt-3 text-sm text-gray-600">
        {service.description}
      </p>

      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {service.highlights.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            {item}
          </li>
        ))}
      </ul>
      </Link>
    </motion.div>
  );
}
