import { getFiles } from "server/database/file";
import { getSessionToken } from "server/utils/session";
import Images from "./images";

export default async function Home() {
  const session = getSessionToken();
  const images = session && (await getFiles(session.id));

  return <Images images={images} />;
}
