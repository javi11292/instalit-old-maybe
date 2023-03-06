import {
  pbkdf2 as pbkdf2Sync,
  randomBytes as randomBytesSync,
} from "node:crypto";
import { promisify } from "node:util";

const randomBytes = promisify(randomBytesSync);
const pbkdf2 = promisify(pbkdf2Sync);

const SALT_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

export const hashPassword = async (password: string) => {
  const salt = await randomBytes(SALT_LENGTH);
  const key = await pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, "sha256");

  const buffer = Buffer.alloc(KEY_LENGTH + SALT_LENGTH);

  salt.copy(buffer);
  key.copy(buffer, SALT_LENGTH);

  return buffer.toString("hex");
};

export const matchPassword = async (password: string, hash: string) => {
  const buffer = Buffer.from(hash, "hex");
  const salt = buffer.subarray(0, SALT_LENGTH);
  const keyA = buffer.subarray(SALT_LENGTH);
  const keyB = await pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, "sha256");

  return keyA.compare(keyB) === 0;
};
