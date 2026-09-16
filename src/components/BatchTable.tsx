import type { BatchSummary } from "../../shared/types";

interface BatchTableProps {
  batches: BatchSummary[];
  onSelect: (batchId: string) => void;
}

export function BatchTable({ batches, onSelect }: BatchTableProps) {
  if (batches.length === 0) {
    return (
      <div className="empty-state">
        <strong>No batches match these filters.</strong>
        <span>Try a different batch number, origin, or status.</span>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Batch</th>
            <th>Product</th>
            <th>Origin</th>
            <th>Production date</th>
            <th>Status</th>
            <th>Shipment</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id}>
              <td>
                <button
                  className="table-link"
                  onClick={() => onSelect(batch.id)}
                >
                  {batch.batchNumber}
                </button>
              </td>
              <td>{batch.productName}</td>
              <td>
                {batch.country}
                <span className="secondary">{batch.region}</span>
              </td>
              <td>{batch.productionDate}</td>
              <td>
                <span className={`status status-${batch.status}`}>
                  {batch.status.replace("-", " ")}
                </span>
              </td>
              <td>{batch.shipmentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
