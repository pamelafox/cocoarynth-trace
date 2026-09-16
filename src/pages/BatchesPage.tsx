import { useMemo, useState } from "react";
import type { BatchSummary } from "../../shared/types";
import { BatchFilters } from "../components/BatchFilters";
import { BatchTable } from "../components/BatchTable";

export function BatchesPage({
  batches,
  onSelect,
}: {
  batches: BatchSummary[];
  onSelect: (batchId: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [status, setStatus] = useState("");

  const origins = useMemo(
    () => [...new Set(batches.map((batch) => batch.country))].sort(),
    [batches],
  );
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return batches.filter(
      (batch) =>
        (!query ||
          batch.batchNumber.toLowerCase().includes(query) ||
          batch.productName.toLowerCase().includes(query)) &&
        (!origin || batch.country === origin) &&
        (!status || batch.status === status),
    );
  }, [batches, origin, search, status]);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Production workspace</p>
          <h1>Chocolate batches</h1>
          <p>
            Follow each lot from cacao origin through production and wholesale
            shipment.
          </p>
        </div>
        <span className="record-count">{filtered.length} records</span>
      </div>
      <BatchFilters
        search={search}
        origin={origin}
        status={status}
        origins={origins}
        onSearchChange={setSearch}
        onOriginChange={setOrigin}
        onStatusChange={setStatus}
      />
      <BatchTable batches={filtered} onSelect={onSelect} />
    </>
  );
}
