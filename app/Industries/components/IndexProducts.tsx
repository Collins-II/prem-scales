import React from "react";
import { SiteHeader } from "@/components/site-header";
import MarketPage from "@/components/MarketPage";
import { Product } from "@/data/dummy";

interface IndexProps {
    products: Product[];
}

export default async function IndexProducts({ products }: IndexProps) {
    console.log("MARKET+BY+PRODUCTS", products)

  return (
    <>

     <div className=" bg-white pt-14">
        <SiteHeader />

        <MarketPage products={products as Product[]} />
      </div>
    </>
  );
}
