"use client";

import { useSearchParams } from "next/navigation";

export default function Viewer() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";

  return (
    <img
      src={`/api/file/${id}`}
      alt={id}
      className="max-h-full w-full object-contain"
    />
  );
}
