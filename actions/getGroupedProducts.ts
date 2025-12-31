"use server";

import { Product } from "@/data/dummy";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3001";

export type GroupedProducts = Record<string, Product[]>;

export async function getGroupedProducts(): Promise<GroupedProducts> {
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const products: unknown = await res.json();

    if (!Array.isArray(products)) {
      throw new Error("Invalid products response");
    }

    // ✅ Correct validation for Mongo-backed API
    const validProducts = products.filter(
      (p): p is Product =>
        typeof p === "object" &&
        p !== null &&
        "_id" in p &&
        "category" in p &&
        typeof (p as any).category === "object" &&
        (p as any).category !== null &&
        "name" in (p as any).category
    );

    // ✅ Group by category name
    const grouped = validProducts.reduce<GroupedProducts>(
      (acc, product) => {
        const key = product.category.name;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(product);
        return acc;
      },
      {}
    );

    return grouped;
  } catch (error) {
    console.error("[GET_GROUPED_PRODUCTS]", error);
    throw new Error("Failed to fetch grouped products");
  }
}
