import Form from "components/form";
import Button from "ui/button";
import { post } from "libraries/fetch";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
  { name: "confirmPassword", label: "Repite la contraseña", type: "password" },
] as const;

export default function Register() {
  function handleSubmit({
    username,
    password,
    confirmPassword,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      throw "Las contraseñas no coinciden";
    }

    return post("/user/register", { username, password });
  }

  return (
    <Form fields={fields} onSubmit={handleSubmit} className="mx-auto">
      {({ onClick, loading }) => (
        <Button
          variant="filled"
          onClick={onClick}
          className="mt-2 ml-auto"
          loading={loading}
        >
          Registrarse
        </Button>
      )}
    </Form>
  );
}
