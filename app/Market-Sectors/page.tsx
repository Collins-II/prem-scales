import React from "react";
import { SiteHeader } from "@/components/site-header";
import MarketPage from "@/components/MarketPage";

export default async function MarketSectors() {

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <MarketPage />
      </div>
    </>
  );
}
