import type {
  Origin,
  OriginPassport,
  Product,
  ProductionBatch,
  Shipment,
} from "../../shared/types.js";

export class PassportNotAvailableError extends Error {
  constructor(batchNumber: string) {
    super(`Batch ${batchNumber} has not shipped and has no final passport.`);
    this.name = "PassportNotAvailableError";
  }
}

export function createOriginPassport(
  batch: ProductionBatch,
  product: Product,
  origin: Origin,
  shipment: Shipment | undefined,
  generatedAt = new Date(),
): OriginPassport {
  if (batch.status !== "shipped" || !shipment) {
    throw new PassportNotAvailableError(batch.batchNumber);
  }

  return {
    passportId: `passport-${batch.batchNumber.toLowerCase()}`,
    productName: product.name,
    batchNumber: batch.batchNumber,
    country: origin.country,
    region: origin.region,
    producerName: origin.producerName,
    harvestYear: origin.harvestYear,
    cacaoPercentage: product.cacaoPercentage,
    certificationStatus: origin.certificationStatus,
    productionDate: batch.productionDate,
    shipmentDate: shipment.shippedAt,
    generatedAt: generatedAt.toISOString(),
  };
}
