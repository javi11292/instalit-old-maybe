import { getThumbnail } from "server/database/file";

export const GET = async (
  _: unknown,
  { params }: { params: { id: string } }
) => {
  return new Response(await getThumbnail(params.id), {
    headers: { "Content-Type": "image/jpeg" },
  });
};
