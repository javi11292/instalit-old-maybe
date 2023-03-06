import { NextRequest, NextResponse } from "next/server";

import { DetailError } from "commons/utils/error";
import { getUser } from "server/database/user";
import { matchPassword } from "server/utils/crypto";
import { errors, handleError } from "server/utils/error";
import { setSessionToken } from "server/utils/session";

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();

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

    const response = new NextResponse();
    setSessionToken(response, { id: user._id.toString() });

    return response;
  } catch (error) {
    return handleError(error);
  }
};
