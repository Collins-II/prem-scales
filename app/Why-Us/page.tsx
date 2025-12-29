import React from "react";
import { SiteHeader } from "@/components/site-header";
import WhyUsPage from "@/components/about-us/AboutUsPage";

export default async function WhyUsIndex() {

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <WhyUsPage />
      </div>
    </>
  );
}
