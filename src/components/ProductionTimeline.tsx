import type { ProductionEvent } from "../../shared/types";

export function ProductionTimeline({
  events,
}: {
  events: ProductionEvent[];
}) {
  return (
    <ol className="timeline">
      {events.map((event) => (
        <li key={`${event.stage}-${event.completedAt}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <div>
            <strong>{event.stage}</strong>
            <time dateTime={event.completedAt}>
              {new Date(event.completedAt).toLocaleString()}
            </time>
          </div>
        </li>
      ))}
    </ol>
  );
}
