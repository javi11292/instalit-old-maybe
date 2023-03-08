import { CACHE_CONTROL_PUBLIC } from "server/constants/headers";
import { getThumbnail } from "server/database/file";

export const GET = async (
  _: unknown,
  { params }: { params: { id: string } }
) => {
  return new Response(await getThumbnail(params.id), {
    headers: { "Content-Type": "image/jpeg", ...CACHE_CONTROL_PUBLIC },
  });
};
