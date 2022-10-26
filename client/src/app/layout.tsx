import localFont from "@next/font/local";
import Link from "next/link";

import AppBar from "ui/app-bar";
import Button from "ui/button";
import LoginButton from "components/login-button";

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
  const buttons = <LoginButton />;

  return (
    <html lang="es" className={font.variable}>
      <head>
        <title>Instalit</title>
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Client" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <AppBar buttons={buttons}>
          <Link href="/">
            <Button disableUpperCase>Instalit</Button>
          </Link>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
