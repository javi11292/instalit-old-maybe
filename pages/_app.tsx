import localFont from "@next/font/local";
import { AppProps } from "next/app";
import Head from "next/head";

import Snackbar from "commons/components/snackbar";
import "commons/utils/worker";
import Main from "components/main";
import "./_app.css";

const font = localFont({
  src: "../src/commons/fonts/material-icons.woff2",
  display: "block",
  variable: "--material-icons",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Instalit</title>
      </Head>

      <div className={font.variable}>
        <Main>
          <Component {...pageProps} />
          <Snackbar />
        </Main>
      </div>
    </>
  );
}
