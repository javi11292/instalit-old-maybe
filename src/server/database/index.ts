import { MongoClient } from "mongodb";

const URL = process.env.MONGODB_URL as string;

const client = new MongoClient(URL, {
  auth: {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
});

export const database = client.db("database");
