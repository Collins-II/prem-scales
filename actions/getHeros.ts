// lib/actions/getAlbums.ts
"use server";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getHeros = async () => {
  try {

     const res = await fetch(
      `${URL}/api/section/hero`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const json = await res.json();
    const heros = json.data;


    return heros;
  } catch (error) {
    console.error("[GET_heros_ERR]", error);
    throw new Error("Failed to fetch heros");
  }
};
