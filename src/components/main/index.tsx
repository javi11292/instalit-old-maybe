import AppBar from "commons/components/app-bar";
import Button from "commons/components/button";

export default function Main({ children }: { children: React.ReactNode }) {
  const buttons = (
    <Button href="/login" icon>
      login
    </Button>
  );

  return (
    <>
      <AppBar buttons={buttons}>
        <Button href="/" disableUpperCase>
          Instalit
        </Button>
      </AppBar>
      {children}
    </>
  );
}
