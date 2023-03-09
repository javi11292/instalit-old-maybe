"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import Button from "commons/components/button";
import { classNames } from "commons/utils";
import { get, post } from "commons/utils/fetch";

const fetcher = async (url: string) => {
  const data = await get(url);

  return new Set(data?.metadata.likes);
};

export default function LikeButton() {
  const params = useSearchParams();
  const { data: session } = useSWR("/api/user");
  const { data, mutate, isLoading } = useSWR(
    `/api/file/${params.get("id")}/data`,
    fetcher
  );
  const { trigger, isMutating } = useSWRMutation(
    `/api/file/${params.get("id")}/like`,
    post
  );

  const hasLike = data?.has(session?.id);

  const handleClick = async () => {
    const value = !hasLike;
    await trigger({ value });
    mutate(
      (data) => {
        const set = new Set(data);

        if (value) {
          set.add(session.id);
        } else {
          set.delete(session.id);
        }

        return set;
      },
      { revalidate: false }
    );
  };

  const colorClassName = hasLike && "[color:red]";

  return (
    <span
      className={classNames(
        colorClassName,
        "animate-appear transition-colors duration-300"
      )}
    >
      <Button icon onClick={handleClick} loading={isMutating || isLoading}>
        favorite
      </Button>
    </span>
  );
}
