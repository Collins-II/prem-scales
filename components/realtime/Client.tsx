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

export default function Client() {
  return (
    <>
      <RealtimeContent  />
      <RealtimeNotifications />
    </>
  );
}
