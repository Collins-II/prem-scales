import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ThemedHeadingProps {
  title: React.ReactNode;
  eyebrow?: string;
  link?: string;
  align?: "left" | "center";
  className?: string;
}

export default function ThemedHeading({
  title,
  eyebrow,
  link,
  align = "left",
  className = "",
}: ThemedHeadingProps) {
  return (
    <div
      className={`w-full ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-neutral-500">
          {eyebrow}
        </p>
      )}
      
      <div className="flex justify-between items-center ">
      <h2 className="text-lg md:text-1xl font-light tracking-tight text-neutral-800">
        {title}
      </h2>
      {link && (
        <Link
            href={link}
             className=" flex items-center text-xs font-semibold tracking-widest uppercase text-neutral-500">More <ArrowRight size={16} />
          </Link>
      )}
      </div>

      {/* Accent line */}
      <div
        className={`mt-1 h-[1px] w-full bg-neutral-400 dark:bg-neutral-100 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
