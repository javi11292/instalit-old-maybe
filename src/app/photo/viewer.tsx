"use client";

import { useSearchParams } from "next/navigation";

export default function Viewer() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";

  return (
    <div className="grid">
      <img
        src={`/api/file/${id}/thumbnail`}
        alt={id}
        className="w-full animate-appear object-contain [max-height:80vh] [grid-area:1/1]"
      />
      <img
        src={`/api/file/${id}`}
        alt={id}
        className="w-full animate-appear object-contain [max-height:80vh] [grid-area:1/1]"
      />
    </div>
  );
}
