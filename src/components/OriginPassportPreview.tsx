import type { OriginPassport } from "../../shared/types";
import { passportDownloadUrl } from "../api";

export function OriginPassportPreview({
  batchId,
  passport,
}: {
  batchId: string;
  passport: OriginPassport;
}) {
  return (
    <section className="passport-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Partner-facing traceability</p>
          <h2>Origin Passport</h2>
        </div>
        <a className="button" href={passportDownloadUrl(batchId)} download>
          Download JSON
        </a>
      </div>
      <dl className="passport-grid">
        <div>
          <dt>Passport ID</dt>
          <dd>{passport.passportId}</dd>
        </div>
        <div>
          <dt>Product</dt>
          <dd>{passport.productName}</dd>
        </div>
        <div>
          <dt>Origin</dt>
          <dd>
            {passport.region}, {passport.country}
          </dd>
        </div>
        <div>
          <dt>Producer</dt>
          <dd>{passport.producerName}</dd>
        </div>
        <div>
          <dt>Harvest</dt>
          <dd>{passport.harvestYear}</dd>
        </div>
        <div>
          <dt>Certification</dt>
          <dd>{passport.certificationStatus}</dd>
        </div>
        <div>
          <dt>Production date</dt>
          <dd>{passport.productionDate}</dd>
        </div>
        <div>
          <dt>Shipment date</dt>
          <dd>{passport.shipmentDate}</dd>
        </div>
      </dl>
    </section>
  );
}
