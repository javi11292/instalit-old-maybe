import localFont from "@next/font/local";
import Link from "next/link";

import AppBar from "commons/components/app-bar";
import Button from "commons/components/button";

import "./layout.css";

const font = localFont({
  src: "../ui/fonts/material-icons.woff2",
  display: "block",
  variable: "--material-icons",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={font.variable}>
      <head>
        <title>Instalit</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Instalit" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <AppBar>
          <Link href="/">
            <Button disableUpperCase>Instalit</Button>
          </Link>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
