"use client";

import { useSearchParams } from "next/navigation";

export default function Viewer() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";

  return (
    <>
      <img
        src={`/api/file/${id}/thumbnail`}
        alt={id}
        className="absolute w-full animate-appear object-contain [max-height:80vh]"
      />
      <img
        src={`/api/file/${id}`}
        alt={id}
        className="relative w-full animate-appear object-contain [max-height:80vh]"
      />
    </>
  );
}
