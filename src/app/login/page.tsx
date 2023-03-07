"use client";

import { mutate } from "swr";

import Form from "components/form";
import { useSession } from "hooks/session";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
] as const;

export default function Login() {
  useSession();

  const handleSubmit = async (trigger: () => Promise<unknown>) => {
    await trigger();
    await mutate("/api/user");
  };

  return (
    <Form
      fields={fields}
      api="/api/user/login"
      className="mx-auto"
      onSubmit={handleSubmit}
      title="Inicio de sesión"
      primaryButton="Iniciar sesión"
      secondaryButton="Registrarse"
      secondaryButtonProps={{ href: "/register" }}
    />
  );
}
