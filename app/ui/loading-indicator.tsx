"use client";

import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-1 overflow-hidden bg-transparent"
      role="progressbar"
      aria-label="Page loading"
    >
      <div className="loading-bar h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
    </div>
  );
}
