import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export const useSession = () => {
  const router = useRouter();
  const { data: session } = useSWR("/api/user");

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
};
