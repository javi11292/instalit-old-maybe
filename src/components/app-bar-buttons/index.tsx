"use client";

import type { Document } from "mongodb";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import Button from "commons/components/button";
import { post, upload } from "commons/utils/fetch";
import Logout from "./logout";

export default function AppBarButtons() {
  const { data: session } = useSWR("/api/user", post);
  const { trigger, isMutating } = useSWRMutation("/api/file/upload", upload);

  const handleChange = async ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTarget.files) {
      const newFiles = await trigger({ files: currentTarget.files });

      mutate<Document[]>(
        "/api/file/all",
        (files = []) => [...files, ...newFiles],
        { revalidate: false }
      );
    }
  };

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
        <Button icon loading={isMutating}>
          upload
        </Button>
      </label>
      <Logout />
    </>
  );
}
