import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import { PORT, DB_URL } from "./config";

const app: Express = express();

mongoose.connect(DB_URL);

app.use(cors()).use(express.json()).use(morgan("dev"));

// Routes
app
  .use("/api/user", require("./routes/user.routes"))
  .use("/api/task", require("./routes/task.routes"));

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT} 🚀`);
});
