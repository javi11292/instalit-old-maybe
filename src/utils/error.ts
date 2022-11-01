import { MongoError } from "mongodb";
import type { NextApiResponse } from "next";

import { DetailError } from "commons/utils/error";

export enum errors {
  EMPTY_USERNAME,
  EMPTY_PASSWORD,
  INCORRECT_CREDENTIALS,
}

export function handleError(error: unknown, res: NextApiResponse) {
  res.status(400);

  if (error instanceof MongoError) {
    switch (error.code) {
      case 11000: {
        res.send({ error: "Usuario ya en uso" });
        break;
      }

      default: {
        res.send({ error: "Error en la base de datos" });
      }
    }
    return;
  }

  if (error instanceof DetailError) {
    switch (error.code) {
      case errors.EMPTY_USERNAME: {
        res.send({ error: "El nombre de usuario no puede estar vacío" });
        break;
      }

      case errors.EMPTY_PASSWORD: {
        res.send({ error: "La contraseña no puede estar vacía" });
        break;
      }

      case errors.INCORRECT_CREDENTIALS: {
        res.send({ error: "Nombre de usuario o contraseña incorrectos" });
        break;
      }
    }
  }

  res.send({ error: "Error desconocido" });
}
