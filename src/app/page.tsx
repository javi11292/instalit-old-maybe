import { getFiles } from "server/database/file";
import { getSessionToken } from "server/utils/session";
import Photos from "./photos";

export default async function Home() {
  const session = getSessionToken();
  const files = session && (await getFiles(session.id));

  return <Photos files={files} />;
}
