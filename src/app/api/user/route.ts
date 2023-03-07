import { NextResponse } from "next/server";

import { withSession } from "server/utils/session";

export const POST = withSession((req) => {
  return NextResponse.json(req.session || null);
});
