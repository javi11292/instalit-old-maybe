import localFont from "next/font/local";

import AppBar from "commons/components/app-bar";
import Button from "commons/components/button";
import AppBarButtons from "components/app-bar-buttons";
import Main from "components/main";

import "./layout.css";

const font = localFont({
  src: "../commons/fonts/material-icons.woff2",
  display: "block",
  variable: "--material-icons",
});

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={font.variable}>
      <head>
        <title>Instalit</title>
        <meta name="description" content="Instalit" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className="flex flex-col">
        <Main>
          <AppBar buttons={<AppBarButtons />}>
            <Button href="/" disableUpperCase>
              Instalit
            </Button>
          </AppBar>
          <div className="flex-1 overflow-hidden">{children}</div>
        </Main>
      </body>
    </html>
  );
}
