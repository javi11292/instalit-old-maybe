import { addMessage } from "commons/components/snackbar";
import { useCallback } from "react";

export function useErrorMessage() {
  return useCallback(async (callback: () => unknown) => {
    try {
      await callback();
    } catch (error) {
      if (error instanceof Error) {
        addMessage({ text: error.message, type: "error" });
      }
    }
  }, []);
}
