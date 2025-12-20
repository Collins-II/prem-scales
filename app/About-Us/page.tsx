import React from "react";
import { SiteHeader } from "@/components/site-header";
import AboutUsPage from "@/components/about-us/AboutUsPage";

export default async function AboutUs() {

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <AboutUsPage />
      </div>
    </>
  );
}
