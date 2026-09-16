import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../server/app";

describe("GET /api/batches/:batchId/passport", () => {
  it("downloads the expected JSON passport", async () => {
    const response = await request(app)
      .get("/api/batches/batch-esm-2026-042/passport")
      .expect(200);

    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.headers["content-disposition"]).toBe(
      'attachment; filename="origin-passport-ESM-2026-042.json"',
    );
    expect(response.body).toMatchObject({
      passportId: "passport-esm-2026-042",
      productName: "Ecuador Esmeraldas 72%",
      batchNumber: "ESM-2026-042",
      shipmentDate: "2026-08-26",
    });
    expect(response.body).not.toHaveProperty("internalQualityNotes");
    expect(response.body).not.toHaveProperty("producerContactEmail");
  });

  it("returns 404 for an unknown batch", async () => {
    const response = await request(app)
      .get("/api/batches/missing/passport")
      .expect(404);

    expect(response.body).toEqual({ message: "Batch not found." });
  });

  it("returns 409 for an unshipped batch", async () => {
    const response = await request(app)
      .get("/api/batches/batch-suh-2026-031/passport")
      .expect(409);

    expect(response.body.message).toMatch(/has not shipped/);
  });
});
