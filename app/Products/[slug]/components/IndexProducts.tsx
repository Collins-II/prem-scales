import React from "react";
import { SiteHeader } from "@/components/site-header";
import ProductsPage from "@/components/ProductsPage";

interface IndexProps {
    products: any;
}

export default async function IndexProducts({ products }: IndexProps) {
    console.log("PRODUCTS+BY+TYPE", products)

  return (
    <>

      <div className="min-h-screen bg-white pt-14">
        <SiteHeader />

        <ProductsPage products={products} />
      </div>
    </>
  );
}
