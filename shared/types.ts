export type CertificationStatus =
  | "Organic verified"
  | "Fair trade verified"
  | "Organic pending renewal"
  | "Direct trade verified";

export type BatchStatus =
  | "in-production"
  | "quality-review"
  | "ready"
  | "shipped";

export type ProductionStage =
  | "roasting"
  | "grinding"
  | "conching"
  | "tempering"
  | "packaging";

export interface Origin {
  id: string;
  country: string;
  region: string;
  producerName: string;
  harvestYear: number;
  certificationStatus: CertificationStatus;
  producerContactName: string;
  producerContactEmail: string;
  pricePerKilogram: number;
}

export interface Product {
  id: string;
  name: string;
  cacaoPercentage: number;
  originId: string;
}

export interface ProductionEvent {
  stage: ProductionStage;
  completedAt: string;
  operatorName: string;
  notes: string;
}

export interface ProductionBatch {
  id: string;
  batchNumber: string;
  productId: string;
  productionDate: string;
  status: BatchStatus;
  productionEvents: ProductionEvent[];
  internalQualityNotes: string;
}

export interface Shipment {
  id: string;
  batchId: string;
  customerName: string;
  shippedAt: string;
  destination: string;
}

export interface OriginPassport {
  passportId: string;
  productName: string;
  batchNumber: string;
  country: string;
  region: string;
  producerName: string;
  harvestYear: number;
  cacaoPercentage: number;
  certificationStatus: CertificationStatus;
  productionDate: string;
  shipmentDate: string;
  generatedAt: string;
}

export interface BatchSummary {
  id: string;
  batchNumber: string;
  productName: string;
  country: string;
  region: string;
  productionDate: string;
  status: BatchStatus;
  shipmentStatus: "Shipped" | "Not shipped";
}

export interface BatchDetail extends BatchSummary {
  cacaoPercentage: number;
  producerName: string;
  harvestYear: number;
  certificationStatus: CertificationStatus;
  productionEvents: ProductionEvent[];
  shipment: Pick<
    Shipment,
    "customerName" | "shippedAt" | "destination"
  > | null;
  passport: OriginPassport | null;
}
