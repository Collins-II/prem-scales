import React from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import ProductListing from "@/components/ProductListing";
import { scaleProduct } from "@/data/dummy";
import LatestSection from "@/components/LatestSection";

export default async function Home() {

  return (
    <>

      <div className="min-h-screen bg-white">
        <HeroSection />

        <LatestSection />

        {scaleProduct.map((category, i) => (
          <ProductListing key={i} {...category} />
        ))}

        <Footer />
      </div>
    </>
  );
}
