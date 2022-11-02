import router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import AppBar from "commons/components/app-bar";
import Button from "commons/components/button";

export default function Main({ children }: { children: React.ReactNode }) {
  const { data } = useSWR("/api/user/session");

  useEffect(() => {
    if (data !== undefined) {
      router.push(data ? "/" : "/login");
    }
  }, [data]);

  const buttons = (
    <Button href="/login" icon>
      login
    </Button>
  );

  return (
    <>
      <AppBar buttons={buttons}>
        <Button href="/" disableUpperCase>
          Instalit
        </Button>
      </AppBar>
      {children}
    </>
  );
}
