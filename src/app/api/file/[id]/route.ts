import { download } from "server/database/file";

export const GET = (_: unknown, { params }: { params: { id: string } }) => {
  return new Response(download(params.id));
};
