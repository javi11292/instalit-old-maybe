import type { NextApiRequest, NextApiResponse } from "next";

import { withSessionRoute } from "utils/session";

async function logout(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.end();
}

export default withSessionRoute(logout);
