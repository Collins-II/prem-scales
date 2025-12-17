import React from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import ProductListing from "@/components/ProductListing";
import { scaleProduct } from "@/data/dummy";
import { getSongs } from "@/actions/getSongs";
import { getVideos } from "@/actions/getVideos";
import Client from "@/components/realtime/Client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const videos = await getVideos();

  return (
    <>
      <div className="min-h-screen bg-white">
        <HeroSection />

        <Client songs={songs} videos={videos} />

        {scaleProduct.map((category, i) => (
          <ProductListing key={i} {...category} />
        ))}

        <Footer />
      </div>
    </>
  );
}
