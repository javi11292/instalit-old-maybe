import { sign, verify } from "jsonwebtoken";
import { NextRequest, NextResponse, Session } from "next/server";

type Handler = (
  req: NextRequest
) => Promise<Response | NextResponse> | Response | NextResponse;

const secret = process.env.SESSION_SECRET || "";

export const setSessionToken = (
  response: NextResponse,
  payload: Record<string, unknown>
) => {
  response.cookies.set("session", sign(payload, secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 24 * 7,
  });
};

export const addSessionToken = (req: NextRequest) => {
  const token = req.cookies.get("session");

  if (token) {
    req.session = verify(token.value, secret) as Session;
  }
};

export const withSession = (handler: Handler) => {
  return async (req: NextRequest) => {
    addSessionToken(req);

    return handler(req);
  };
};

export const withProtectedRoute = (handler: Handler) => {
  return async (req: NextRequest) => {
    addSessionToken(req);

    if (!req.session.id) {
      return new Response(null, { status: 401 });
    }

    return handler(req);
  };
};
