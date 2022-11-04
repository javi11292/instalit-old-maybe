import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

import AppBar from "commons/components/app-bar";
import Button from "commons/components/button";
import { useLoading } from "commons/hooks";
import { get, upload } from "commons/utils/fetch";
import { store } from "store";

function Logout() {
  const { loading, trigger } = useLoading(() => get("/api/user/logout"));

  async function handleClick() {
    await trigger();
    store.setSession(null);
  }

  return (
    <Button onClick={handleClick} icon loading={loading}>
      logout
    </Button>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  const { data } = useSWR("/api/user/session");

  const { session } = store;

  async function handleChange({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) {
    if (currentTarget.files) {
      const files = await upload("/api/file/upload", {
        files: currentTarget.files,
      });

      console.log(files);
    }
  }

  useEffect(() => {
    store.setSession(data);
  }, [data]);

  useEffect(
    () =>
      autorun(
        () =>
          store.session !== undefined &&
          router.push(store.session ? "/" : "/login")
      ),
    []
  );

  const buttons =
    session === undefined ? null : !session ? (
      <Button href="/login" icon>
        login
      </Button>
    ) : (
      <>
        <Button
          label={
            <input
              type="file"
              value=""
              hidden
              multiple
              accept="image/*"
              onChange={handleChange}
            />
          }
          icon
        >
          upload
        </Button>
        <Logout />
      </>
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

export default observer(Main);
