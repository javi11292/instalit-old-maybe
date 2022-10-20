import Link from "next/link";

import AppBar from "ui/app-bar";
import Button from "ui/button";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute h-screen w-screen">
      <AppBar>
        <Link href="/">
          <Button disableUpperCase>Instalit</Button>
        </Link>
      </AppBar>
      {children}
    </div>
  );
}
