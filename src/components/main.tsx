"use client";

import { SWRConfig } from "swr";

import Snackbar from "commons/components/snackbar";
import { send } from "commons/utils/fetch";
import "commons/utils/worker";

const config = {
  fetcher: send,
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={config}>
      {children}
      <Snackbar />
    </SWRConfig>
  );
}
