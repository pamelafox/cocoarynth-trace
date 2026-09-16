import { useEffect, useState } from "react";
import type { BatchDetail, BatchSummary } from "../shared/types";
import { fetchBatch, fetchBatches } from "./api";
import { BatchDetailPage } from "./pages/BatchDetailPage";
import { BatchesPage } from "./pages/BatchesPage";

export function App() {
  const [batches, setBatches] = useState<BatchSummary[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<BatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBatches()
      .then(setBatches)
      .catch(() => setError("Unable to load batch records."))
      .finally(() => setLoading(false));
  }, []);

  async function selectBatch(batchId: string) {
    setLoading(true);
    setError("");
    try {
      setSelectedBatch(await fetchBatch(batchId));
    } catch {
      setError("Unable to load that batch.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <img src="/cocoarynth-logo.svg" alt="" />
          <div>
            <strong>Cocoarynth</strong>
            <span>Trace</span>
          </div>
        </div>
        <p>Origin to shipment</p>
      </header>
      <main>
        {loading && <div className="loading-state">Tracing batch records…</div>}
        {!loading && error && (
          <div className="error-state" role="alert">
            {error}
          </div>
        )}
        {!loading &&
          !error &&
          (selectedBatch ? (
            <BatchDetailPage
              batch={selectedBatch}
              onBack={() => setSelectedBatch(null)}
            />
          ) : (
            <BatchesPage batches={batches} onSelect={selectBatch} />
          ))}
      </main>
    </div>
  );
}
