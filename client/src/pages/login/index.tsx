import { getMainLayout } from "layouts/main";

export default function Login() {
  return "Login";
}

Login.getLayout = getMainLayout({ withoutLogin: true });
