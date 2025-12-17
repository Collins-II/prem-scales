import { getSongs } from "@/actions/getSongs";
import { getVideos } from "@/actions/getVideos";
import LatestSection from "@/components/LatestSection";


export default async function RealtimeContent() {
 let songs: any = [];
  let videos: any = [];

  try {
    [songs, videos] = await Promise.all([
      getSongs(),
      getVideos(),
    ]);
  } catch (error) {
    console.error("RealtimeContent fetch error:", error);
  }


  return <LatestSection songs={songs} videos={videos} />;
}
