import { MongoClient } from "mongodb";

const URL = process.env.MONGODB_URI as string;

const client = new MongoClient(URL, {
  auth: {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
});

export const database = client.db("database");
