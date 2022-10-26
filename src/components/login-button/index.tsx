"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "ui/button";

const LOGIN_PATH = "/login";

export default function LoginButton() {
  const pathname = usePathname();

  if (pathname === LOGIN_PATH) {
    return null;
  }

  return (
    <Link href={LOGIN_PATH}>
      <Button icon>login</Button>
    </Link>
  );
}
