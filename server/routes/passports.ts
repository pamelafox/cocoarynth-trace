import { Router } from "express";
import {
  createOriginPassport,
  PassportNotAvailableError,
} from "../services/originPassport.js";
import { getPassportSource } from "../services/batchCatalog.js";

export const passportsRouter = Router();

passportsRouter.get("/:batchId/passport", (request, response) => {
  const source = getPassportSource(request.params.batchId);
  if (!source) {
    response.status(404).json({ message: "Batch not found." });
    return;
  }

  try {
    const passport = createOriginPassport(
      source.batch,
      source.product,
      source.origin,
      source.shipment,
    );
    response
      .type("application/json")
      .attachment(`origin-passport-${source.batch.batchNumber}.json`)
      .send(JSON.stringify(passport, null, 2));
  } catch (error) {
    if (error instanceof PassportNotAvailableError) {
      response.status(409).json({ message: error.message });
      return;
    }
    throw error;
  }
});
