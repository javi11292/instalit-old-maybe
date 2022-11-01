import type { NextApiRequest, NextApiResponse } from "next";

import { DetailError } from "commons/utils/error";
import { addUser } from "database/user";
import { errors, handleError } from "utils/error";
import { withSessionRoute } from "utils/session";

async function register(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  try {
    if (!username) {
      throw new DetailError({ code: errors.EMPTY_USERNAME });
    }

    if (!password) {
      throw new DetailError({ code: errors.EMPTY_PASSWORD });
    }

    await addUser(username, password);
    await req.session.save();

    res.status(200);
    res.end();
  } catch (error) {
    handleError(error, res);
  }
}

export default withSessionRoute(register);
