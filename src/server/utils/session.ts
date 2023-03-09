import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import {
  NextRequest,
  NextResponse,
  Session,
  SessionRequest,
} from "next/server";

type Handler<T = NextRequest, A = unknown> = (
  req: T,
  args: { params: A }
) => Promise<Response | NextResponse> | Response | NextResponse;

const secret = process.env.SESSION_SECRET || "";

export const setSessionToken = (
  response: NextResponse,
  payload: Record<string, string>
) => {
  response.cookies.set("session", sign(payload, secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 24 * 7,
  });
};

export const getSessionToken = () => {
  const token = cookies().get("session");
  return token && (verify(token.value, secret) as Session);
};

export const withSession = (handler: Handler) => {
  return async (req: NextRequest, args: { params: Record<string, string> }) => {
    req.session = getSessionToken();

    return handler(req, args);
  };
};

export const withProtectedRoute = <T>(handler: Handler<SessionRequest, T>) => {
  return async (req: SessionRequest, args: { params: T }) => {
    const session = getSessionToken();

    if (!session) {
      return new Response(null, { status: 401 });
    }

    req.session = session;

    return handler(req, args);
  };
};
