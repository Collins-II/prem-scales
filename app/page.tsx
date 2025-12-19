import React from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import LatestSection from "@/components/LatestSection";
import GroupedProducts from "@/components/GroupedProducts";

export default async function Home() {

  return (
    <>

      <div className="min-h-screen bg-white">
        <HeroSection />

        <LatestSection />

        <GroupedProducts />

        <Footer />
      </div>
    </>
  );
}
