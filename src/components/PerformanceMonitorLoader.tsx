"use client";

import dynamic from "next/dynamic";

const ClientPerformanceMonitor = dynamic(
  () => import("./PerformanceMonitor"),
  { ssr: false }
);

export default function PerformanceMonitorLoader() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return <ClientPerformanceMonitor />;
}
