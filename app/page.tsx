import React, { Suspense } from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import ProductListing from "@/components/ProductListing";
import { scaleProduct } from "@/data/dummy";
import RealtimeContent from "@/components/realtime/realtime-content";

export default async function Home() {

  return (
    <>

      <div className="min-h-screen bg-white">
        <HeroSection />

        <Suspense fallback={<div className="p-10 text-center">Loading content…</div>}>
          <RealtimeContent />
        </Suspense>

        {scaleProduct.map((category, i) => (
          <ProductListing key={i} {...category} />
        ))}

        <Footer />
      </div>
    </>
  );
}
