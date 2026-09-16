import express from "express";
import { batchesRouter } from "./routes/batches.js";
import { passportsRouter } from "./routes/passports.js";

export const app = express();

app.use(express.json());
app.use("/api/batches", batchesRouter);
app.use("/api/batches", passportsRouter);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);
    response.status(500).json({ message: "Unexpected server error." });
  },
);
