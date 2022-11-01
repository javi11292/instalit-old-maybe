import { database } from "database";
import { hashPassword } from "utils/crypto";

type User = {
  username: string;
  password: string;
};

const collection = database.collection<User>("users");

collection.createIndex({ username: 1 }, { unique: true });

export function getUser(username: string) {
  return collection.findOne({ username });
}

export async function addUser(username: string, password: string) {
  const user = {
    username,
    password: await hashPassword(password),
  };

  const { insertedId } = await collection.insertOne(user);

  return { _id: insertedId };
}
