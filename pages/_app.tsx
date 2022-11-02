import localFont from "@next/font/local";
import { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import Snackbar from "commons/components/snackbar";
import { send } from "commons/utils/fetch";
import "commons/utils/worker";
import Main from "components/main";
import "./_app.css";

const font = localFont({
  src: "../src/commons/fonts/material-icons.woff2",
  display: "block",
  variable: "--material-icons",
});

const config = {
  fetcher: send,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Instalit</title>
      </Head>

      <div className={font.variable}>
        <SWRConfig value={config}>
          <Main>
            <Component {...pageProps} />
            <Snackbar />
          </Main>
        </SWRConfig>
      </div>
    </>
  );
}
