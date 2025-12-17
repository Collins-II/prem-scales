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

async function loadContent() {
  const [songs, videos] = await Promise.allSettled([
    getSongs(),
    getVideos(),
  ]);

  return {
    songs: songs.status === "fulfilled" ? songs.value ?? [] : [],
    videos: videos.status === "fulfilled" ? videos.value ?? [] : [],
  };
}

export default async function Home() {
  const { songs, videos } = await loadContent();

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
