import { post } from "commons/utils/fetch";
import Form from "components/form";
import { store } from "store";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
  { name: "confirmPassword", label: "Repite la contraseña", type: "password" },
] as const;

export default function Register() {
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

    const session = await post("/api/user/register", { username, password });
    store.setSession(session);
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
