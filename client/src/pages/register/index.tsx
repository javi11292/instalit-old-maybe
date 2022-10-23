import { getMainLayout } from "layouts/main";
import Form from "components/form";
import Button from "ui/button";

const fields = [
  { name: "username", label: "Usuario" },
  { name: "password", label: "Contraseña", type: "password" },
  { name: "confirmPassword", label: "Repite la contraseña", type: "password" },
] as const;

export default function Register() {
  function handleSubmit({
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
  }

  return (
    <Form fields={fields} onSubmit={handleSubmit}>
      {({ onClick }) => (
        <Button variant="filled" onClick={onClick} className="mt-2 ml-auto">
          Registrarse
        </Button>
      )}
    </Form>
  );
}

Register.getLayout = getMainLayout();
