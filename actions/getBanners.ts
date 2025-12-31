// lib/actions/getAlbums.ts
"use server";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getBanners = async () => {
  try {

     const res = await fetch(
      `${URL}/api/section/banners`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const json = await res.json();
    const banners = json.data;


    return banners;
  } catch (error) {
    console.error("[GET_BANNERS_ERR]", error);
    throw new Error("Failed to fetch banners");
  }
};
