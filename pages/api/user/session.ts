import type { NextApiRequest, NextApiResponse } from "next";

import { withSessionRoute } from "utils/session";

async function session(req: NextApiRequest, res: NextApiResponse) {
  res.send(req.session.id ? req.session : null);
}

export default withSessionRoute(session);
