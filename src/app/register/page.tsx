"use client";

import { mutate } from "swr";

import Form from "components/form";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
  { name: "confirmPassword", label: "Repite la contraseña", type: "password" },
] as const;

export default function Register() {
  const handleSubmit = async (
    trigger: () => Promise<unknown>,
    {
      password,
      confirmPassword,
    }: {
      password: string;
      confirmPassword: string;
    }
  ) => {
    if (password !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    await trigger();
    await mutate("/api/user");
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      api="/api/user/register"
      className="mx-auto"
      title="Registro"
      primaryButton="Registrarse"
    />
  );
}
