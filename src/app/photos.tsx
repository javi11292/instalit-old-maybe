"use client";

import type { Document } from "mongodb";
import Link from "next/link";
import useSWR from "swr";

export default function Photos({ files }: { files: Document[] | undefined }) {
  const { data, error } = useSWR<Document[]>("/api/file", {
    fallbackData: files,
  });

  if (!data || error) return null;

  return (
    <div className="grid grid-cols-4 gap-1">
      {data.map((file) => (
        <div key={file._id} className="relative aspect-square">
          <Link href={`/photo?id=${file._id}`}>
            <img
              src={`/api/file/${file._id}/thumbnail`}
              alt={file.filename}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
