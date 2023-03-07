import { NextRequest, NextResponse } from "next/server";

import { DetailError } from "commons/utils/error";
import { addUser } from "server/database/user";
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

    const { _id } = await addUser(username, password);

    const response = new NextResponse();
    setSessionToken(response, { id: _id });

    return response;
  } catch (error) {
    return handleError(error);
  }
};
