import React from "react";
import { SiteHeader } from "@/components/site-header";
import NewsPage from "@/components/news/NewsPage";

export default async function Page() {

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <NewsPage />
      </div>
    </>
  );
}
