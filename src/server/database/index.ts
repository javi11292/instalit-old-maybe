import { MongoClient } from "mongodb";

const URL = process.env.MONGODB_URI as string;

const client = new MongoClient(URL);

export const database = client.db("database");
