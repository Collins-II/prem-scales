"use client";

import dynamic from "next/dynamic";

const RealtimeContent = dynamic(
  () => import("@/components/realtime/realtime-content"),
  { ssr: false }
);

const RealtimeNotifications = dynamic(
  () => import("@/components/realtime/realtime-notification"),
  { ssr: false }
);

type Props = {
  songs: any[];
  videos: any[];
};

export default function Client({ songs, videos }: Props) {
  return (
    <>
      <RealtimeContent initialSongs={songs} initialVideos={videos} />
      <RealtimeNotifications />
    </>
  );
}
