import { addMessage } from "commons/components/snackbar";

export const withErrorMessage = async (callback: () => unknown) => {
  try {
    await callback();
  } catch (error) {
    if (error instanceof Error) {
      addMessage({ text: error.message, type: "error" });
    }
  }
};
