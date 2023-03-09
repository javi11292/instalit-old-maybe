import { like } from "server/database/file";
import { withProtectedRoute } from "server/utils/session";

export const POST = withProtectedRoute(
  async (req, { params }: { params: { id: string } }) => {
    const { value } = await req.json();
    await like(params.id, req.session.id, value);

    return new Response(null);
  }
);
