"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

import Button from "commons/components/button";
import { post } from "commons/utils/fetch";
import Logout from "./logout";

export default function AppBarButtons() {
  const router = useRouter();
  const { data: session } = useSWR("/api/user", post);

  const handleChange = async ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    /* if (currentTarget.files) {
      const files = await upload("/api/file/upload", {
        files: currentTarget.files,
      });

      console.log(files);
    } */
  };

  useEffect(() => {
    session !== undefined && router.push(session ? "/" : "/login");
  }, [session, router]);

  if (session === undefined) return null;

  if (!session)
    return (
      <Button href="/login" icon>
        login
      </Button>
    );

  return (
    <>
      <label className="contents">
        <input
          type="file"
          value=""
          hidden
          multiple
          accept="image/*"
          onChange={handleChange}
        />
        <Button icon>upload</Button>
      </label>
      <Logout />
    </>
  );
}
