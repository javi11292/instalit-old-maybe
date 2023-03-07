import "next/server";

declare module "next/server" {
  declare class NextRequest {
    session?: Session;
  }

  declare class SessionRequest extends NextRequest {
    session: Session;
  }

  declare type Session = { id: string };
}
