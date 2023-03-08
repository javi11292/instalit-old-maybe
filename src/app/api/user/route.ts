import { NextResponse } from "next/server";

import { withSession } from "server/utils/session";

export const GET = withSession((req) => {
  return NextResponse.json(req.session || null);
});
