// app/page.tsx
import React, { Suspense } from "react";
import HeroSection from "@/components/hero";
import Footer from "@/components/footer";
import NetworkError from "@/components/NetworkError";
import RealtimeContent from "@/components/realtime/realtime-content";
import Script from "next/script";

import { getSongs } from "@/actions/getSongs";
import { getVideos } from "@/actions/getVideos";
import Image from "next/image";
import RealtimeNotifications from "@/components/realtime/realtime-notification";
import ProductListing from "@/components/ProductListing";
import { scaleProduct } from "@/data/dummy";

export const revalidate = 60;
export const dynamic = "force-static";

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
    const [songs, videos] = await Promise.all([getSongs(), getVideos()]);
    if (!songs?.length || !videos?.length) {
      return { error: true, songs: [], videos: [] };
    }
    return { error: false, songs, videos };
  } catch (e) {
    console.error("Failed to load content:", e);
    return { error: true, songs: [], videos: [] };
  }
}

// ------------------ PAGE ------------------
export default async function Home() {
  const { error, songs, videos } = await loadContent();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <NetworkError message="Failed to load content. Please try again later." />
      </div>
    );
  }

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

      <noscript>
        <Image
          height="1"
          width="1"
          alt="script-img"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=META_PIXEL_ID&ev=PageView&noscript=1"
        />
      </noscript>

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
