"use client";

import type { Document } from "mongodb";
import useSWR from "swr";

export default function Images({ images }: { images: Document[] | undefined }) {
  const { data: files, error } = useSWR<Document[]>("/api/file/all", {
    fallbackData: images,
  });

  if (!files || error) return null;

  return (
    <div className="grid grid-cols-4 gap-1">
      {files.map((file) => (
        <div key={file._id} className="relative aspect-square">
          <img
            src={`/api/file/${file._id}/thumbnail`}
            alt={file.filename}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
