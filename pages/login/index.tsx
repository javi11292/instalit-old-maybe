import { useRouter } from "next/router";

import { post } from "commons/utils/fetch";
import Form from "components/form";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
] as const;

export default function Login() {
  const router = useRouter();

  async function handleSubmit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    await post("/user/login", { username, password });
    router.push("/");
  }

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      className="mx-auto"
      title="Inicio de sesión"
      primaryButton="Iniciar sesión"
      secondaryButton="Registrarse"
      secondaryButtonProps={{ href: "/register" }}
    />
  );
}
