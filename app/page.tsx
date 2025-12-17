// app/page.tsx
import React, { Suspense } from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import RealtimeContent from "@/components/realtime/realtime-content";
import Script from "next/script";

import { getSongs } from "@/actions/getSongs";
import { getVideos } from "@/actions/getVideos";
import RealtimeNotifications from "@/components/realtime/realtime-notification";
import ProductListing from "@/components/ProductListing";
import { scaleProduct } from "@/data/dummy";

export const dynamic = "force-dynamic";
export const revalidate = 0;


// ------------------ SEO METADATA ------------------
export const metadata = {
  title: "Premier Scales Zambia",
  description:
    "Accurately Measuring Zambia.",
  keywords: [
    "Scales",
    "Measuring",
    "Machines",
    "Industrial",
  ],
  openGraph: {
    title: "Premier Scales Zambia",
    description:
      "A next-gen industrial grade measuring scales.",
    url: "https://scalesprem.com",
    siteName: "ScalesPrem",
    images: [
      {
        url: "https://scalesprem.com/assets/logo/logo-bl.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premier Scales Zambia",
    description: "Best quality for all measuring scales design types.",
    creator: "@scalesprem",
  },
  alternates: {
    canonical: "https://scalesprem.com",
  },
};

// ------------------ LOAD INITIAL CONTENT ------------------
async function loadContent() {
  try {
    const [songs, videos] = await Promise.allSettled([
      getSongs(),
      getVideos(),
    ]);

    return {
      songs: songs.status === "fulfilled" ? songs.value ?? [] : [],
      videos: videos.status === "fulfilled" ? videos.value ?? [] : [],
    };
  } catch (e) {
    console.error("Failed to load content:", e);
    return { songs: [], videos: [] };
  }
}


// ------------------ PAGE ------------------
export default async function Home() {
  const { songs, videos } = await loadContent();

  return (
    <>
      {/* ---- ANALYTICS SCRIPTS ---- */}
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX');
        `}
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'META_PIXEL_ID');
          fbq('track', 'PageView');
        `}
      </Script>


      {/* ---- PAGE UI ---- */}
      <div className="min-h-screen w-full overflow-x-hidden bg-white">

        <HeroSection />

        {/* REAL-TIME WRAPPER: listens to WebSocket events */}
        <Suspense
          fallback={<div className="p-10 text-center opacity-50">Loading latest content...</div>}
        >
          <RealtimeContent initialSongs={songs} initialVideos={videos} />
        </Suspense>

        <Suspense fallback={<div className="p-10 text-center opacity-50">Loading blog...</div>}>
        {scaleProduct.map((category, i) => (
         <ProductListing
            key={category.categoryLabel ?? i}
            title={category.title}
            categoryLabel={category.categoryLabel}
            bannerImage={category.bannerImage}
            viewAllHref={category.viewAllHref}
            products={category.products}
         />
        ))}

        </Suspense>

        <Suspense fallback={<div className="p-10 text-center opacity-50">Loading footer...</div>}>
          <Footer />
        </Suspense>
        <Suspense>
          <RealtimeNotifications />
        </Suspense>

      </div>
    </>
  );
}
