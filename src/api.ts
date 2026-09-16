import type { BatchDetail, BatchSummary } from "../shared/types";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }
  return response.json() as Promise<T>;
}

export function fetchBatches(): Promise<BatchSummary[]> {
  return getJson<BatchSummary[]>("/api/batches");
}

export function fetchBatch(batchId: string): Promise<BatchDetail> {
  return getJson<BatchDetail>(`/api/batches/${batchId}`);
}

export function passportDownloadUrl(batchId: string): string {
  return `/api/batches/${batchId}/passport`;
}
