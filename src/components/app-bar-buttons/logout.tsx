import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import Button from "commons/components/button";
import { get } from "commons/utils/fetch";

export default function Logout() {
  const { isMutating, trigger } = useSWRMutation("/api/user/logout", get);

  const handleClick = async () => {
    await trigger();
    mutate("/api/user");
  };

  return (
    <Button onClick={handleClick} icon loading={isMutating}>
      logout
    </Button>
  );
}
