import type { BatchDetail, BatchSummary } from "../../shared/types.js";
import { batches } from "../data/batches.js";
import { origins } from "../data/origins.js";
import { products } from "../data/products.js";
import { shipments } from "../data/shipments.js";
import { createOriginPassport } from "./originPassport.js";

export function getBatchSummary(batchId: string): BatchSummary | undefined {
  const batch = batches.find((candidate) => candidate.id === batchId);
  if (!batch) return undefined;

  const product = products.find((candidate) => candidate.id === batch.productId);
  const origin = origins.find((candidate) => candidate.id === product?.originId);
  if (!product || !origin) return undefined;

  return {
    id: batch.id,
    batchNumber: batch.batchNumber,
    productName: product.name,
    country: origin.country,
    region: origin.region,
    productionDate: batch.productionDate,
    status: batch.status,
    shipmentStatus: shipments.some((shipment) => shipment.batchId === batch.id)
      ? "Shipped"
      : "Not shipped",
  };
}

export function listBatchSummaries(): BatchSummary[] {
  return batches
    .map((batch) => getBatchSummary(batch.id))
    .filter((batch): batch is BatchSummary => batch !== undefined);
}

export function getBatchDetail(batchId: string): BatchDetail | undefined {
  const batch = batches.find((candidate) => candidate.id === batchId);
  const summary = getBatchSummary(batchId);
  if (!batch || !summary) return undefined;

  const product = products.find((candidate) => candidate.id === batch.productId);
  const origin = origins.find((candidate) => candidate.id === product?.originId);
  const shipment = shipments.find((candidate) => candidate.batchId === batch.id);
  if (!product || !origin) return undefined;

  return {
    ...summary,
    cacaoPercentage: product.cacaoPercentage,
    producerName: origin.producerName,
    harvestYear: origin.harvestYear,
    certificationStatus: origin.certificationStatus,
    productionEvents: batch.productionEvents,
    shipment: shipment
      ? {
          customerName: shipment.customerName,
          shippedAt: shipment.shippedAt,
          destination: shipment.destination,
        }
      : null,
    passport: shipment
      ? createOriginPassport(batch, product, origin, shipment)
      : null,
  };
}

export function getPassportSource(batchId: string) {
  const batch = batches.find((candidate) => candidate.id === batchId);
  if (!batch) return undefined;

  const product = products.find((candidate) => candidate.id === batch.productId);
  const origin = origins.find((candidate) => candidate.id === product?.originId);
  const shipment = shipments.find((candidate) => candidate.batchId === batch.id);
  if (!product || !origin) return undefined;

  return { batch, product, origin, shipment };
}
