import React from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import LatestSection from "@/components/LatestSection";
import GroupedProducts from "@/components/GroupedProducts";
import { getBanners } from "@/actions/getBanners";
import { getGroupedProducts } from "@/actions/getGroupedProducts";
import { getHeros } from "@/actions/getHeros";
import { getProductsByType } from "@/actions/getProductsByType";
import NetworkError from "@/components/NetworkError";

export default async function Home() {
  const products = await getProductsByType();
  const banners = await getBanners();
  const heros = await getHeros();
  const groupedProducts = await getGroupedProducts();

    if (!products || !banners || !heros || !groupedProducts) {
      return (
        <NetworkError message="Network Error.Try Again" />
      )
    }

  return (
    <>

      <div className="min-h-screen bg-white">
        <HeroSection heros={heros} />

        <LatestSection products={products} banners={banners as any}/>

        <GroupedProducts groupedProducts={groupedProducts}/>

        <Footer />
      </div>
    </>
  );
}
