import React from "react";
import { SiteHeader } from "@/components/site-header";
import ProductsPage from "@/components/ProductsPage";

export default async function Home() {

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <ProductsPage />
      </div>
    </>
  );
}
