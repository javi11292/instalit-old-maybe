import { getMainLayout } from "layouts/main";
import Form from "components/form";
import Button from "ui/button";

const fields = [
  { name: "USERNAME", label: "Usuario" },
  { name: "PASSWORD", label: "Contraseña", type: "password" },
  { name: "CONFIRM_PASSWORD", label: "Repite la contraseña", type: "password" },
];

export default function Register() {
  function handleSubmit() {
    console.log("SUBMIT");
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
