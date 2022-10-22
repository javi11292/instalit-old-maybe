import { NextComponentType } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import "./app.css";

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType & { getLayout?: <T>(page: T) => T };
}) {
  const page = <Component {...pageProps} />;

  return (
    <>
      <Head>
        <title>Instalit</title>
      </Head>

      {Component.getLayout?.(page) || page}
    </>
  );
}
