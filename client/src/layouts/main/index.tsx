import Link from "next/link";

import AppBar from "ui/app-bar";
import Button from "ui/button";

function Main({ children }: { children: React.ReactNode }) {
  const buttons = (
    <Link href="/login" passHref>
      <Button icon>login</Button>
    </Link>
  );

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

export function getMainLayout(page: React.ReactNode) {
  return <Main>{page}</Main>;
}
