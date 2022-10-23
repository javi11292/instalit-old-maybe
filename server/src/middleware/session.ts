import connect from "connect-mongodb-session";
import session from "express-session";

import { URL } from "database";

const DAYS = 1000 * 60 * 60 * 24;
const COLLECTION = "sessions";

const MongoStore = connect(session);

const store = new MongoStore({
  uri: URL,
  collection: COLLECTION,
  connectionOptions: {
    auth: {
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
    },
  },
});

const handler = session({
  store,
  secret: process.env.SECRET as string,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 365 * DAYS,
  },
});

export { handler as session };
