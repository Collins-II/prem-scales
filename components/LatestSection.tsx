"use client";

import { MusicCard } from "./music/MusicCard";

import MusicCardSkeleton from "./skeletons/music-card-skeleton";
import VideoCardSkeleton from "./skeletons/video-card-skeleton";
import { BANNERS, Product, PRODUCTS } from "@/data/dummy";
import InfiniteSlider from "./sliders/InfiniteSlider";
import { ProductCard } from "./cards/ProductCard";
import ThemedHeading from "./themed-heading";

interface SectionProps {
  products: Product[];
  banners: any[];
}

export default function LatestSection({ products, banners }: SectionProps ) {

  const isLoading = (!BANNERS?.length && !products?.length);
  const slug = PRODUCTS[0].scaleType;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl px-6 mx-auto space-y-8">
            {/* Trending Music */}
            <div className="md:px-0">

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4 scrollbar-hide">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => <MusicCardSkeleton key={i} />)
                  : banners?.slice(0,4)?.map((track, idx) => (
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
            <div className="max-w-5xl ">
            {products && products.length > 0 && (
            <div>
              <ThemedHeading title="New Release" link={`/Products/${slug}`} className="mb-3"/>
              <InfiniteSlider gap={4} >
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => <VideoCardSkeleton key={i} />)
                  : products?.map((video, idx) => (
                      <ProductCard
                        key={idx}
                        product={video}
                      />
                    ))}
              </InfiniteSlider>
            </div>
            )}
            
            </div>
          </div>
    </section>
  );
}
