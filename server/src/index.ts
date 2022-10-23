import cors from "cors";
import express from "express";
import http from "http";

import { router } from "router";
import { session } from "middleware/session";
import { errorHandler } from "middleware/error-handler";

const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(session);
app.use(express.json());
app.use(router);
app.use(errorHandler);

http.createServer(app).listen(3000, () => console.log("HTTP server started"));

process.on("SIGTERM", process.exit);
