import busboy from "busboy";
import type { Document } from "mongodb";
import { NextResponse } from "next/server";
import { Readable } from "node:stream";
import { ReadableStream } from "stream/web";

import { upload } from "server/database/file";
import { withProtectedRoute } from "server/utils/session";

export const POST = withProtectedRoute(async (req) => {
  return new Promise<Response>((resolve) => {
    const files: Document[] = [];

    const bb = busboy({
      headers: { "content-type": req.headers.get("content-type") || undefined },
    });

    bb.on("file", (_, file, info) => {
      files.push(upload({ file, name: info.filename, userId: req.session.id }));
    });

    bb.on("close", async () => {
      resolve(NextResponse.json(await Promise.all(files)));
    });

    Readable.fromWeb(req.body as ReadableStream).pipe(bb);
  });
});
