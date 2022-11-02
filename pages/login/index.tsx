import { post } from "commons/utils/fetch";
import Form from "components/form";
import { store } from "store";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
] as const;

export default function Login() {
  async function handleSubmit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const session = await post("/api/user/login", { username, password });
    store.setSession(session);
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
