import React from "react";
import { SiteHeader } from "@/components/site-header";
import ServicesPage from "@/components/services/ServicePage";

export default async function Services() {

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <ServicesPage />
      </div>
    </>
  );
}
