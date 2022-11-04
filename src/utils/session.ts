import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const options = {
  cookieName: "instalit",
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, options);
}

export function withProtectedRoute(handler: NextApiHandler) {
  function protectedRoute(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.id) {
      res.status(401);
      res.end();
      return;
    }

    handler(req, res);
  }

  return withIronSessionApiRoute(protectedRoute, options);
}
