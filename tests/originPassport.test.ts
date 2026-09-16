import { describe, expect, it } from "vitest";
import { batches } from "../server/data/batches";
import { origins } from "../server/data/origins";
import { products } from "../server/data/products";
import { shipments } from "../server/data/shipments";
import { createOriginPassport } from "../server/services/originPassport";

describe("createOriginPassport", () => {
  it("builds an allowlisted passport for a shipped batch", () => {
    const batch = batches.find(
      (candidate) => candidate.batchNumber === "ESM-2026-042",
    )!;
    const product = products.find(
      (candidate) => candidate.id === batch.productId,
    )!;
    const origin = origins.find(
      (candidate) => candidate.id === product.originId,
    )!;
    const shipment = shipments.find(
      (candidate) => candidate.batchId === batch.id,
    );

    const passport = createOriginPassport(
      batch,
      product,
      origin,
      shipment,
      new Date("2026-08-26T18:00:00.000Z"),
    );

    expect(passport).toEqual({
      passportId: "passport-esm-2026-042",
      productName: "Ecuador Esmeraldas 72%",
      batchNumber: "ESM-2026-042",
      country: "Ecuador",
      region: "Esmeraldas",
      producerName: "Río Verde Cacao Cooperative",
      harvestYear: 2026,
      cacaoPercentage: 72,
      certificationStatus: "Organic verified",
      productionDate: "2026-08-18",
      shipmentDate: "2026-08-26",
      generatedAt: "2026-08-26T18:00:00.000Z",
    });
  });

  it("excludes confidential and internal record fields", () => {
    const batch = batches[0];
    const product = products.find(
      (candidate) => candidate.id === batch.productId,
    )!;
    const origin = origins.find(
      (candidate) => candidate.id === product.originId,
    )!;
    const shipment = shipments.find(
      (candidate) => candidate.batchId === batch.id,
    );

    const passport = createOriginPassport(batch, product, origin, shipment);
    const exported = JSON.stringify(passport);

    expect(exported).not.toContain(origin.producerContactName);
    expect(exported).not.toContain(origin.producerContactEmail);
    expect(exported).not.toContain(String(origin.pricePerKilogram));
    expect(exported).not.toContain(batch.internalQualityNotes);
    for (const productionEvent of batch.productionEvents) {
      expect(exported).not.toContain(productionEvent.operatorName);
      expect(exported).not.toContain(productionEvent.notes);
    }
  });
});
