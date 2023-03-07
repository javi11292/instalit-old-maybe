"use client";

import type { Document } from "mongodb";
import Image from "next/image";
import useSWR from "swr";

export default function Images({ images }: { images: Document[] | undefined }) {
  const { data: files, error } = useSWR<Document[]>("/api/file/all", {
    fallbackData: images,
  });

  if (!files || error) return null;

  return (
    <div className="grid grid-cols-5 gap-1">
      {files.map((file) => (
        <div key={file._id} className="relative aspect-square">
          <Image
            priority
            fill
            src={`/api/file/${file._id}`}
            alt={file.filename}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
