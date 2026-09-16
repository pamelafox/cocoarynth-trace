import type { BatchStatus } from "../../shared/types";

interface BatchFiltersProps {
  search: string;
  origin: string;
  status: string;
  origins: string[];
  onSearchChange: (value: string) => void;
  onOriginChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const statuses: BatchStatus[] = [
  "in-production",
  "quality-review",
  "ready",
  "shipped",
];

export function BatchFilters({
  search,
  origin,
  status,
  origins,
  onSearchChange,
  onOriginChange,
  onStatusChange,
}: BatchFiltersProps) {
  return (
    <section className="filters" aria-label="Batch filters">
      <label className="search-field">
        <span>Search batches</span>
        <input
          type="search"
          value={search}
          placeholder="Batch number or product"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
      <label>
        <span>Origin</span>
        <select
          value={origin}
          onChange={(event) => onOriginChange(event.target.value)}
        >
          <option value="">All origins</option>
          {origins.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Status</span>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">All statuses</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item.replace("-", " ")}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
