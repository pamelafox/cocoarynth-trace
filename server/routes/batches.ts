import { Router } from "express";
import {
  getBatchDetail,
  listBatchSummaries,
} from "../services/batchCatalog.js";

export const batchesRouter = Router();

batchesRouter.get("/", (_request, response) => {
  response.json(listBatchSummaries());
});

batchesRouter.get("/:batchId", (request, response) => {
  const batch = getBatchDetail(request.params.batchId);
  if (!batch) {
    response.status(404).json({ message: "Batch not found." });
    return;
  }

  response.json(batch);
});
