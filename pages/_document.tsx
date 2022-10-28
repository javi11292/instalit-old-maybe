import { enableStaticRendering } from "mobx-react-lite";
import Document, { Head, Html, Main, NextScript } from "next/document";

enableStaticRendering(true);

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Instalit" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
