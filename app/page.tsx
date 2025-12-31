import React from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import LatestSection from "@/components/LatestSection";
import GroupedProducts from "@/components/GroupedProducts";
import { getProductsByType } from "@/actions/getProductsByType";
import { getBanners } from "@/actions/getBanners";
import NetworkError from "@/components/NetworkError";
import { getGroupedProducts } from "@/actions/getGroupedProducts";
import { getHeros } from "@/actions/getHeros";

export default async function Home() {
  const products = await getProductsByType();
  const banners = await getBanners();
  const heros = await getHeros();
  const groupedProducts = await getGroupedProducts();

  if(!products || !banners) {
    return <NetworkError message="Network errors.Try again later." />
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
