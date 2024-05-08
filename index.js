import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import profileRouter from "./routes/profile.js";
import tokenRouter from "./routes/tokenRoutes.js";
const app = express();
import https from "https";
import { Server } from "http";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import requestLogger from "./middleware/logger.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let server;
// development or production

if (process.env.BUILD_TYPE === "production") {
  const options = {
    key: fs.readFileSync(path.join(__dirname, "certificates/aititle.key.pem")),
    cert: fs.readFileSync(
      path.join(__dirname, "certificates/aititle.cert.pem")
    ),
  };

  server = https.createServer(options, app);
} else {
  server = new Server(app);
}
app.use(cors());
app.use(requestLogger);

app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello World!  profile issue fixed`);
});
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/token", tokenRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(
        `Connected to mongodb and running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("mong error = " + err.message);
  });
