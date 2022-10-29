import { MongoClient } from "mongodb";

const URL = "mongodb://mongodb:27017";

const client = new MongoClient(URL, {
  auth: {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
});

export default client.db("database");
