import Link from "next/link";

import AppBar from "ui/app-bar";
import Button from "ui/button";

type Props = { withoutLogin?: boolean };

function Main({
  children,
  withoutLogin,
}: { children: React.ReactNode } & Props) {
  const buttons = !withoutLogin && (
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

export function getMainLayout(props?: Props) {
  return function getMainLayout(page: React.ReactNode) {
    return <Main {...props}>{page}</Main>;
  };
}
