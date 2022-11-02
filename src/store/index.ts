import { makeAutoObservable } from "mobx";

import type { IronSessionData } from "iron-session";

export const store = makeAutoObservable<{
  session: IronSessionData | null | undefined;
  setSession: (session: IronSessionData | null) => void;
}>({
  session: undefined,
  setSession(session) {
    this.session = session;
  },
});
