"use client";

import { MusicCard } from "./music/MusicCard";
import { VideoCard } from "./video/VideoCard";
import HorizontalSlider from "./sliders/HorizontalSlider";
//import GoogleAd from "./ads/AdSlot";
import { ChartItem } from "@/actions/getCharts";
import MusicCardSkeleton from "./skeletons/music-card-skeleton";
import VideoCardSkeleton from "./skeletons/video-card-skeleton";
import TopNews from "./TopNews";

interface SectionProps {
  songs?: ChartItem[];
  videos?: ChartItem[];
  loading?: boolean;
}

export default function LatestSection({ songs, videos, loading }: SectionProps) {

  const isLoading = loading || (!songs?.length && !videos?.length);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl px-6 mx-auto space-y-8">
            {/* Trending Music */}
            <div className="md:px-0">

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-4 scrollbar-hide">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => <MusicCardSkeleton key={i} />)
                  : songs?.slice(0,4)?.map((track, idx) => (
                      <MusicCard
                        key={idx}
                        id={track.id}
                        title={track.title}
                        artist={track.artist as string}
                        href={`/music/song/${track.id}`}
                        cover="/products/retail-s4.png"
                        downloads={track.stats.downloads}
                        views={track.stats.totalViews}
                        genre={track.genre as string}
                        publishedAt={track.releaseDate as string}
                      />
                    ))}
              </div>
            </div>

            {/* Banner Ad 
            <GoogleAd slot="1234567890" />*/}

            {/* Top Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {videos && (
            <div>
              <HorizontalSlider title="New Release">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => <VideoCardSkeleton key={i} />)
                  : videos?.map((video) => (
                      <VideoCard
                        key={video.id}
                        id={video.id}
                        title={video.title}
                        artist={video.artist as string}
                        cover="/products/lab-s1.png"
                        downloads={video.stats.downloads}
                        category={video.genre}
                        views={video.stats.totalViews}
                        videoUrl={video.videoUrl as string}
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
