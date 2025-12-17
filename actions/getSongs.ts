"use server";

import mongoose from "mongoose";
import { ChartItem, getCharts } from "./getCharts";

/* ------------------------------------------------------------- */
/* Get latest songs as ChartItems                                 */
/* ------------------------------------------------------------- */
// lib/actions/getSongs.ts


export const getSongs = async (limit = 16): Promise<ChartItem[]> => {
   try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URL!);
    }

    return await getCharts({
      category: "songs",
      limit,
      sort: "all-time",
      region: "global",
    });;
  } catch (error) {
    console.error("MongoDB getVideos error:", error);
    return [];
  }
    
};


