import { NextResponse, SessionRequest } from "next/server";

import { getFiles } from "server/database/file";
import { withProtectedRoute } from "server/utils/session";

export const GET = withProtectedRoute(async (req: SessionRequest) => {
  return NextResponse.json(await getFiles(req.session.id));
});
