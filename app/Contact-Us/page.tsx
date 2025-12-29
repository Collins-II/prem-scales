import React from "react";
import { SiteHeader } from "@/components/site-header";
import ContactUsPage from "@/components/ContactUsPage";

export default async function AboutUs() {

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <ContactUsPage />
      </div>
    </>
  );
}
