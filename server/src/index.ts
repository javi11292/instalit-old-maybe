import cors from "cors";
import express from "express";
import http from "http";

import router from "router";

const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(router);

http.createServer(app).listen(3000, () => console.log("HTTP server started"));

process.on("SIGTERM", process.exit);
