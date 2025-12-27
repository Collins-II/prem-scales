"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface GalleryProps {
  images: string[];
  initialImage?: string;
  alt?: string;
  fallbackImage?: string;
}

const DEFAULT_FALLBACK =
  "/images/placeholder-product.png"; // add a local placeholder

export default function Gallery({ images, initialImage, alt, fallbackImage = DEFAULT_FALLBACK }: GalleryProps) {
    const safeImages = images?.length ? images : [fallbackImage];

  const [mainImage, setMainImage] = useState(
    initialImage && images.includes(initialImage)
      ? initialImage
      : safeImages[0]
  );

  const [loading, setLoading] = useState(true);
 
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pinchZoom, setPinchZoom] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Update CSS variables
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    el.style.setProperty("--zoom-scale", zoom ? "1.5" : `${pinchZoom}`);
    el.style.setProperty("--tilt-x", `${tilt.x}deg`);
    el.style.setProperty("--tilt-y", `${tilt.y}deg`);
    el.style.setProperty("--origin-x", `${zoomPos.x}%`);
    el.style.setProperty("--origin-y", `${zoomPos.y}%`);
  }, [zoom, tilt, pinchZoom, zoomPos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });

    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setTilt({ x: tiltX, y: tiltY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const handleThumbnailClick = (img: string, idx: number) => {
    setMainImage(img);
    setActiveIndex(idx);
    setPinchZoom(1);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const t1 = e.touches.item(0)!;
      const t2 = e.touches.item(1)!;
      const initialDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      containerRef.current?.style.setProperty("--pinch-initial", initialDistance.toString());
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const t1 = e.touches.item(0)!;
      const t2 = e.touches.item(1)!;
      const initialDistance = parseFloat(containerRef.current?.style.getPropertyValue("--pinch-initial") || "1");
      const distance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const scale = distance / initialDistance;
      setPinchZoom(Math.min(Math.max(scale, 1), 3));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        ref={containerRef}
        className="gallery-container bg-neutral-50 border border-gray-100 rounded-sm flex items-center justify-center p-6 cursor-zoom-in overflow-hidden relative"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => {
          setZoom(false);
          resetTilt();
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
         {/* Skeleton */}
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gray-100" />
        )}
        <div className="gallery-image relative w-full h-[260px] sm:h-[340px]">
          <Image
            src={mainImage}
            alt={alt || "Gallery Image"}
            fill
            className="object-contain"
            priority={activeIndex === 0}
            onLoadingComplete={() => setLoading(false)}
            onError={() => {
              setMainImage(fallbackImage);
              setLoading(false);
            }}
          />
        </div>
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory p-2">
            {safeImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleThumbnailClick(img, idx)}
                className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 border rounded-sm cursor-pointer overflow-hidden snap-center transition-all duration-300 ${
                  mainImage === img ? "border-black scale-110" : "border-gray-200 hover:scale-105"
                }`}
              >
                <Image
                  src={img}
                  alt={`${alt || "Gallery"} ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                aria-label={`Thumbnail ${idx + 1}`}
                key={idx}
                className={`w-3 h-3 rounded-xs transition-all duration-300 ${
                  idx === activeIndex ? "bg-white border border-black border-1 scale-125" : "bg-gray-300 hover:scale-110"
                }`}
                onClick={() => handleThumbnailClick(images[idx], idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
