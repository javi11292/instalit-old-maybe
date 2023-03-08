import { CACHE_CONTROL_PUBLIC } from "server/constants/headers";
import { download } from "server/database/file";

export const GET = async (
  _: unknown,
  { params }: { params: { id: string } }
) => {
  try {
    return new Response(await download(params.id), {
      headers: CACHE_CONTROL_PUBLIC,
    });
  } catch {
    return new Response(null, { status: 404 });
  }
};
