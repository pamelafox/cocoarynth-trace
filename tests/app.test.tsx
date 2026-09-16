import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../src/App";

const shippedBatch = {
  id: "batch-esm-2026-042",
  batchNumber: "ESM-2026-042",
  productName: "Ecuador Esmeraldas 72%",
  country: "Ecuador",
  region: "Esmeraldas",
  productionDate: "2026-08-18",
  status: "shipped",
  shipmentStatus: "Shipped",
};

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("displays batches and opens a shipped batch detail with JSON download", async () => {
    const detail = {
      ...shippedBatch,
      cacaoPercentage: 72,
      producerName: "Río Verde Cacao Cooperative",
      harvestYear: 2026,
      certificationStatus: "Organic verified",
      productionEvents: [
        {
          stage: "roasting",
          completedAt: "2026-08-18T09:15:00Z",
          operatorName: "Avery Chen",
          notes: "Internal",
        },
      ],
      shipment: {
        customerName: "Northstar Specialty Foods",
        shippedAt: "2026-08-26",
        destination: "Seattle, WA",
      },
      passport: {
        passportId: "passport-esm-2026-042",
        productName: "Ecuador Esmeraldas 72%",
        batchNumber: "ESM-2026-042",
        country: "Ecuador",
        region: "Esmeraldas",
        producerName: "Río Verde Cacao Cooperative",
        harvestYear: 2026,
        cacaoPercentage: 72,
        certificationStatus: "Organic verified",
        productionDate: "2026-08-18",
        shipmentDate: "2026-08-26",
        generatedAt: "2026-08-26T18:00:00.000Z",
      },
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify([shippedBatch]), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify(detail), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    expect(await screen.findByText("ESM-2026-042")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "ESM-2026-042" }));

    expect(await screen.findByText("Production timeline")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download JSON" }),
    ).toHaveAttribute(
      "href",
      "/api/batches/batch-esm-2026-042/passport",
    );
  });

  it("does not show a download action for an unshipped batch", async () => {
    const batch = {
      ...shippedBatch,
      id: "batch-suh-2026-031",
      batchNumber: "SUH-2026-031",
      status: "ready",
      shipmentStatus: "Not shipped",
    };
    const detail = {
      ...batch,
      cacaoPercentage: 68,
      producerName: "Asempanaye Growers Union",
      harvestYear: 2026,
      certificationStatus: "Fair trade verified",
      productionEvents: [],
      shipment: null,
      passport: null,
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify([batch]), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify(detail), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    await userEvent.click(
      await screen.findByRole("button", { name: "SUH-2026-031" }),
    );
    await waitFor(() =>
      expect(screen.getByText(/has not shipped/)).toBeInTheDocument(),
    );
    expect(
      screen.queryByRole("link", { name: "Download JSON" }),
    ).not.toBeInTheDocument();
  });
});
