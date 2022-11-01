import { database } from "database";
import { hashPassword } from "utils/crypto";

const collection = database.collection("users");

collection.createIndex({ username: 1 }, { unique: true });

export async function getUser(username: string) {
  const user = await collection.findOne(
    { username },
    { projection: { _id: 0 } }
  );

  return user;
}

export async function addUser(username: string, password: string) {
  const user = {
    username,
    password: await hashPassword(password),
  };

  await collection.insertOne(user);

  return user;
}
