import { NextResponse } from "next/server";

export const GET = async () => {
  const response = new NextResponse();
  response.cookies.delete("session");

  return response;
};
