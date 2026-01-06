"use client";

import Image, { ImageProps } from "next/image";
import clsx from "clsx";

type WatermarkedImageProps = ImageProps & {
  watermarkText?: string;
  watermarkLogo?: string;
  imageClassName?: string; // 🔑 separate image styling
};

export default function WatermarkedImage({
  watermarkText = "Premier Scales",
  watermarkLogo,
  className,
  imageClassName,
  alt,
  ...props
}: WatermarkedImageProps) {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      {/* Product Image */}
      <Image
        {...props}
        alt={alt ?? "Product image"}
        className={clsx("object-contain", imageClassName)}
      />

      {/* Watermark Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08]">
        <div className="rotate-[-30deg] grid grid-cols-2 gap-20 text-gray-900">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-lg font-semibold uppercase tracking-widest whitespace-nowrap"
            >
              {watermarkLogo && (
                <Image
                  src={watermarkLogo}
                  alt="Watermark logo"
                  width={24}
                  height={24}
                  className="opacity-70"
                />
              )}
              <span>{watermarkText}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
