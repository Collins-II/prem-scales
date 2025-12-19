"use client";

import { MusicCard } from "./music/MusicCard";
import { VideoCard } from "./video/VideoCard";
import HorizontalSlider from "./sliders/HorizontalSlider";
//import GoogleAd from "./ads/AdSlot";

import MusicCardSkeleton from "./skeletons/music-card-skeleton";
import VideoCardSkeleton from "./skeletons/video-card-skeleton";
import TopNews from "./TopNews";
import { BANNERS, NEW_RELEASE, PRODUCTS } from "@/data/dummy";


export default function LatestSection() {

  const isLoading = (!BANNERS?.length && !NEW_RELEASE?.length);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl px-6 mx-auto space-y-8">
            {/* Trending Music */}
            <div className="md:px-0">

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-4 scrollbar-hide">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => <MusicCardSkeleton key={i} />)
                  : PRODUCTS?.slice(0,4)?.map((track, idx) => (
                      <MusicCard
                        key={idx}
                        href={`/Products`}
                        cover={track}
                      />
                    ))}
              </div>
            </div>

            {/* Banner Ad 
            <GoogleAd slot="1234567890" />*/}

            {/* Top Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {PRODUCTS && (
            <div>
              <HorizontalSlider gap="md" title="New Release">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => <VideoCardSkeleton key={i} />)
                  : PRODUCTS?.map((video, idx) => (
                      <VideoCard
                        key={idx}
                        cover={video}
                        href="/Products"
                      />
                    ))}
              </HorizontalSlider>
            </div>
            )}
            
            <TopNews />
            </div>
          </div>
    </section>
  );
}
