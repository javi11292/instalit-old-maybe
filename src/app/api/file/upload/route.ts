import busboy from "busboy";
import type { NextRequest } from "next/server";
import { Readable } from "node:stream";
import { ReadableStream } from "stream/web";

import { upload } from "server/database/file";
import { withProtectedRoute } from "server/utils/session";

const readFile = (req: NextRequest) => {
  return new Promise<Response>((resolve) => {
    const bb = busboy({
      headers: { "content-type": req.headers.get("content-type") || undefined },
    });

    bb.on("file", (_, file, info) => {
      upload({ file, name: info.filename, user_id: req.session.id as string });
    });

    bb.on("close", () => {
      resolve(new Response());
    });

    Readable.fromWeb(req.body as ReadableStream).pipe(bb);
  });
};

export const POST = withProtectedRoute(async (req: NextRequest) => {
  return await readFile(req);
});
