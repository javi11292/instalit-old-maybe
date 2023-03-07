import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

import { post } from "commons/utils/fetch";

export const useSession = () => {
  const router = useRouter();
  const { data: session } = useSWR("/api/user", post);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
};
