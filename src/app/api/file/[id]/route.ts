import { download } from "server/database/file";

export const GET = async (
  _: unknown,
  { params }: { params: { id: string } }
) => {
  try {
    return new Response(await download(params.id), {
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
};
