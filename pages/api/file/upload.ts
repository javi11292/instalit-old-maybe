import busboy from "busboy";
import type { NextApiRequest, NextApiResponse } from "next";

import { withProtectedRoute } from "utils/session";

async function upload(req: NextApiRequest, res: NextApiResponse) {
  const bb = busboy({ headers: req.headers });

  bb.on("file", (name, file, info) => {
    console.log("file");
  });

  bb.on("close", () => {
    res.end();
  });

  req.pipe(bb);
}

export default withProtectedRoute(upload);

export const config = {
  api: {
    bodyParser: false,
  },
};
