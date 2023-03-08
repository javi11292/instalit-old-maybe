"use client";

import { useSearchParams } from "next/navigation";

export default function Viewer() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";

  return (
    <div className="relative flex-1">
      <img
        src={`/api/file/${id}/thumbnail`}
        alt={id}
        className="absolute max-h-full w-full animate-appear object-contain"
      />
      <img
        src={`/api/file/${id}`}
        alt={id}
        className="absolute max-h-full w-full animate-appear object-contain"
      />
    </div>
  );
}
