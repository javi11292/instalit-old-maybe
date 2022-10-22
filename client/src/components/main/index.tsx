import Link from "next/link";

import AppBar from "ui/app-bar";
import Button from "ui/button";

export default function Main({ children }: { children: React.ReactNode }) {
  const buttons = <Button icon>logout</Button>;

  return (
    <div className="absolute h-screen w-screen">
      <AppBar buttons={buttons}>
        <Link href="/" passHref>
          <Button disableUpperCase>Instalit</Button>
        </Link>
      </AppBar>
      {children}
    </div>
  );
}
