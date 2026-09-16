import type { BatchDetail } from "../../shared/types";
import { OriginPassportPreview } from "../components/OriginPassportPreview";
import { ProductionTimeline } from "../components/ProductionTimeline";

export function BatchDetailPage({
  batch,
  onBack,
}: {
  batch: BatchDetail;
  onBack: () => void;
}) {
  return (
    <>
      <button className="back-link" onClick={onBack}>
        ← All batches
      </button>
      <div className="page-heading detail-heading">
        <div>
          <p className="eyebrow">{batch.batchNumber}</p>
          <h1>{batch.productName}</h1>
          <p>
            {batch.region}, {batch.country} · {batch.cacaoPercentage}% cacao
          </p>
        </div>
        <span className={`status status-${batch.status}`}>
          {batch.status.replace("-", " ")}
        </span>
      </div>

      <div className="detail-grid">
        <section className="card">
          <h2>Origin details</h2>
          <dl className="fact-list">
            <div>
              <dt>Producer</dt>
              <dd>{batch.producerName}</dd>
            </div>
            <div>
              <dt>Harvest year</dt>
              <dd>{batch.harvestYear}</dd>
            </div>
            <div>
              <dt>Certification</dt>
              <dd>{batch.certificationStatus}</dd>
            </div>
            <div>
              <dt>Production date</dt>
              <dd>{batch.productionDate}</dd>
            </div>
          </dl>
        </section>

        <section className="card">
          <h2>Wholesale shipment</h2>
          {batch.shipment ? (
            <dl className="fact-list">
              <div>
                <dt>Customer</dt>
                <dd>{batch.shipment.customerName}</dd>
              </div>
              <div>
                <dt>Shipped</dt>
                <dd>{batch.shipment.shippedAt}</dd>
              </div>
              <div>
                <dt>Destination</dt>
                <dd>{batch.shipment.destination}</dd>
              </div>
            </dl>
          ) : (
            <p className="muted">
              This batch has not shipped. A final Origin Passport is not yet
              available.
            </p>
          )}
        </section>
      </div>

      <section className="card timeline-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trace</p>
            <h2>Production timeline</h2>
          </div>
        </div>
        <ProductionTimeline events={batch.productionEvents} />
      </section>

      {batch.passport && (
        <OriginPassportPreview batchId={batch.id} passport={batch.passport} />
      )}
    </>
  );
}
