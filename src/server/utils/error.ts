import { MongoError } from "mongodb";
import { NextResponse } from "next/server";

import { DetailError } from "commons/utils/error";

export enum errors {
  EMPTY_USERNAME,
  EMPTY_PASSWORD,
  INCORRECT_CREDENTIALS,
}

export const handleError = (error: unknown) => {
  const init = { status: 400 };
  const body = { error: "Error desconocido" };

  if (error instanceof MongoError) {
    switch (error.code) {
      case 11000: {
        body.error = "Usuario ya en uso";
        break;
      }

      default: {
        body.error = "Error en la base de datos";
      }
    }
  } else if (error instanceof DetailError) {
    switch (error.code) {
      case errors.EMPTY_USERNAME: {
        body.error = "El nombre de usuario no puede estar vacío";
        break;
      }

      case errors.EMPTY_PASSWORD: {
        body.error = "La contraseña no puede estar vacía";
        break;
      }

      case errors.INCORRECT_CREDENTIALS: {
        body.error = "Nombre de usuario o contraseña incorrectos";
        break;
      }
    }
  }

  return NextResponse.json(body, init);
};
