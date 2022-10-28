import localFont from "@next/font/local";
import { NextComponentType } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import "commons/utils/worker";
import Main from "components/main";

import "./_app.css";

const font = localFont({
  src: "../src/commons/fonts/material-icons.woff2",
  display: "block",
  variable: "--material-icons",
});

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType & {
    Layout: ({ children }: { children: React.ReactNode }) => JSX.Element;
  };
}) {
  return (
    <>
      <Head>
        <title>Instalit</title>
      </Head>

      <div className={font.variable}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </div>
    </>
  );
}
