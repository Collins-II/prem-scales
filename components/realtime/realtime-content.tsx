import { getSongs } from "@/actions/getSongs";
import { getVideos } from "@/actions/getVideos";
import LatestSection from "@/components/LatestSection";


export default async function RealtimeContent() {
  const songs = await getSongs();
  const videos = await getVideos();

  return <LatestSection songs={songs} videos={videos} />;
}
