// lib/actions/getAlbums.ts
"use server";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getCategories = async () => {
  try {

    const categories = await fetch(`/${URL}/api/categories`)
    console.log("GET_CATEGORIES", categories)

    return categories;
  } catch (error) {
    console.error("[GET_CATEGORIES_ERR]", error);
    throw new Error("Failed to fetch categories");
  }
};
