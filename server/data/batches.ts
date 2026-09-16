import type {
  ProductionBatch,
  ProductionEvent,
  ProductionStage,
} from "../../shared/types.js";

const operators: Record<ProductionStage, string> = {
  roasting: "Avery Chen",
  grinding: "Noah Williams",
  conching: "Samira Patel",
  tempering: "Jordan Brooks",
  packaging: "Camila Ortiz",
};

function event(
  stage: ProductionStage,
  completedAt: string,
  notes: string,
): ProductionEvent {
  return { stage, completedAt, operatorName: operators[stage], notes };
}

export const batches: ProductionBatch[] = [
  {
    id: "batch-esm-2026-042",
    batchNumber: "ESM-2026-042",
    productId: "product-esmeraldas-72",
    productionDate: "2026-08-18",
    status: "shipped",
    productionEvents: [
      event("roasting", "2026-08-18T09:15:00Z", "Floral aroma confirmed."),
      event("grinding", "2026-08-18T14:30:00Z", "Particle size on target."),
      event("conching", "2026-08-20T11:00:00Z", "Finished after 42 hours."),
      event("tempering", "2026-08-21T16:20:00Z", "Stable crystal curve."),
      event("packaging", "2026-08-22T13:10:00Z", "Lot labels verified."),
    ],
    internalQualityNotes:
      "Release approved after final snap and temper inspection.",
  },
  {
    id: "batch-suh-2026-031",
    batchNumber: "SUH-2026-031",
    productId: "product-suhum-68",
    productionDate: "2026-08-24",
    status: "ready",
    productionEvents: [
      event("roasting", "2026-08-24T08:40:00Z", "Roast curve complete."),
      event("grinding", "2026-08-24T15:05:00Z", "Viscosity within range."),
      event("conching", "2026-08-26T15:05:00Z", "Nutty profile retained."),
      event("tempering", "2026-08-27T10:45:00Z", "Temper passed."),
      event("packaging", "2026-08-27T14:30:00Z", "Awaiting shipment."),
    ],
    internalQualityNotes: "Ready for wholesale allocation.",
  },
  {
    id: "batch-piu-2026-018",
    batchNumber: "PIU-2026-018",
    productId: "product-piura-70",
    productionDate: "2026-09-02",
    status: "quality-review",
    productionEvents: [
      event("roasting", "2026-09-02T09:00:00Z", "Light roast profile."),
      event("grinding", "2026-09-02T15:20:00Z", "Initial grind complete."),
      event("conching", "2026-09-04T12:00:00Z", "Fruit notes prominent."),
      event("tempering", "2026-09-05T10:10:00Z", "Sample bars prepared."),
    ],
    internalQualityNotes: "Certification renewal document under review.",
  },
  {
    id: "batch-sam-2026-027",
    batchNumber: "SAM-2026-027",
    productId: "product-sambirano-74",
    productionDate: "2026-09-08",
    status: "in-production",
    productionEvents: [
      event("roasting", "2026-09-08T08:20:00Z", "Berry profile confirmed."),
      event("grinding", "2026-09-08T14:00:00Z", "Grinding underway."),
    ],
    internalQualityNotes: "No release decision until conching completes.",
  },
  {
    id: "batch-esm-2026-039",
    batchNumber: "ESM-2026-039",
    productId: "product-esmeraldas-72",
    productionDate: "2026-07-29",
    status: "shipped",
    productionEvents: [
      event("roasting", "2026-07-29T09:05:00Z", "Roast approved."),
      event("grinding", "2026-07-29T14:10:00Z", "Refining complete."),
      event("conching", "2026-07-31T12:15:00Z", "Conche complete."),
      event("tempering", "2026-08-01T09:40:00Z", "Temper approved."),
      event("packaging", "2026-08-01T14:05:00Z", "Cases sealed."),
    ],
    internalQualityNotes: "Released without exception.",
  },
  {
    id: "batch-suh-2026-028",
    batchNumber: "SUH-2026-028",
    productId: "product-suhum-68",
    productionDate: "2026-07-14",
    status: "shipped",
    productionEvents: [
      event("roasting", "2026-07-14T08:45:00Z", "Roast complete."),
      event("grinding", "2026-07-14T15:00:00Z", "Grinding complete."),
      event("conching", "2026-07-16T13:00:00Z", "Conching complete."),
      event("tempering", "2026-07-17T10:00:00Z", "Temper complete."),
      event("packaging", "2026-07-17T15:30:00Z", "Pallet complete."),
    ],
    internalQualityNotes: "Final retention sample archived.",
  },
];
