import { post } from "commons/utils";
import Form from "components/form";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
] as const;

export default function Login() {
  function handleSubmit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    return post("/user/login", { username, password });
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
