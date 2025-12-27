"use server";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3001";

export async function getProductsByType(slug: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/products/type/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const products = await res.json();

    if (!Array.isArray(products)) {
      throw new Error("Invalid products response");
    }

    return products;
  } catch (error) {
    console.error("[GET_PRODUCTS_BY_TYPE]", error);
    throw new Error("Failed to fetch products");
  }
}
