import { NextResponse } from "next/server";

import { getFile } from "server/database/file";

export const GET = async (
  _: unknown,
  { params }: { params: { id: string } }
) => {
  const result = await getFile(params.id);

  return NextResponse.json(result);
};
