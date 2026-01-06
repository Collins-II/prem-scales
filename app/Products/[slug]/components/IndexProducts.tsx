import React from "react";
import { SiteHeader } from "@/components/site-header";
import ProductsPage from "@/components/ProductsPage";
import { Product } from "@/data/dummy";

interface IndexProps {
    products: Product[];
}

export default async function IndexProducts({ products }: IndexProps) {

  return (
    <>

      <div className="bg-white pt-14">
        <SiteHeader />

        <ProductsPage products={products} />
      </div>
    </>
  );
}
