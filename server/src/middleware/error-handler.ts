import express from "express";

const errors: Record<string, (...args: unknown[]) => void> = {};

export function errorHandler(
  error: Error,
  req: express.Request,
  res: express.Response
) {
  function sendUnknownError() {
    res.status(500);
    res.send("Error desconocido");
  }

  res.status(400);

  const handler = errors[error.constructor.name];

  try {
    if (handler) {
      handler(error, req, res);
    } else {
      throw error;
    }
  } catch (e) {
    console.error(e);
    sendUnknownError();
  }
}
