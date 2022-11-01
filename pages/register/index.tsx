import { useRouter } from "next/router";

import { post } from "commons/utils/fetch";
import Form from "components/form";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
  { name: "confirmPassword", label: "Repite la contraseña", type: "password" },
] as const;

export default function Register() {
  const router = useRouter();

  async function handleSubmit({
    username,
    password,
    confirmPassword,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    await post("/user/register", { username, password });
    router.push("/");
  }

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      className="mx-auto"
      title="Registro"
      primaryButton="Registrarse"
    />
  );
}
