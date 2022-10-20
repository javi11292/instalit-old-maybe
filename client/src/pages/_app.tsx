import { NextComponentType } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import Main from "components/main";

import "./app.css";

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType & { getLayout: <T>(page: T) => T };
}) {
  const page = <Component {...pageProps} />;

  return (
    <>
      <Head>
        <title>Client</title>
      </Head>

      <Main>{Component.getLayout?.(page) || page}</Main>
    </>
  );
}
