// lib/actions/getVideos.ts
"use server";

import mongoose from "mongoose";
import { ChartItem, getCharts } from "./getCharts";

export const getVideos = async (limit = 6): Promise<ChartItem[]> => {
try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URL!);
    }

    return await getCharts({
      category: "videos",
      limit,
      sort: "all-time",
      region: "global",
    });;
  } catch (error) {
    console.error("MongoDB getVideos error:", error);
    return [];
  }
    
};
