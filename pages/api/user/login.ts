import type { NextApiRequest, NextApiResponse } from "next";

import { DetailError } from "commons/utils/error";
import { getUser } from "database/user";
import { matchPassword } from "utils/crypto";
import { errors, handleError } from "utils/error";
import { withSessionRoute } from "utils/session";

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  try {
    if (!username) {
      throw new DetailError({ code: errors.EMPTY_USERNAME });
    }

    if (!password) {
      throw new DetailError({ code: errors.EMPTY_PASSWORD });
    }

    const user = await getUser(username);

    if (!user || !(await matchPassword(password, user.password))) {
      throw new DetailError({ code: errors.INCORRECT_CREDENTIALS });
    }

    req.session.id = user._id.toString();
    await req.session.save();

    res.send(req.session);
  } catch (error) {
    handleError(error, res);
  }
}

export default withSessionRoute(login);
