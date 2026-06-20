import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RolesPage } from "../components/settings/RolesPage";
import type { ApiRolesResponse } from "../types";

afterEach(() => vi.unstubAllGlobals());

const mockResponse: ApiRolesResponse = {
  activeRoles: [
    { id: 1, name: "Superadmin", lastActive: "06/2023" },
    { id: 2, name: "Developeradmin", lastActive: "01/2023" },
  ],
  tableRoles: [],
};

describe("RolesPage", () => {
  it("shows a loading spinner initially", () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));
    render(<RolesPage />);
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders roles after a successful fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })
    );
    render(<RolesPage />);
    await waitFor(() => expect(screen.getByText("Superadmin")).toBeInTheDocument());
    expect(screen.getByText("Developeradmin")).toBeInTheDocument();
  });

  it("shows an error when the server returns a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({ ok: false, status: 500 })
    );
    render(<RolesPage />);
    await waitFor(() =>
      expect(screen.getByText(/Server responded with 500/)).toBeInTheDocument()
    );
  });

  it("shows an error when the fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("Network error")));
    render(<RolesPage />);
    await waitFor(() =>
      expect(screen.getByText("Network error")).toBeInTheDocument()
    );
  });

  it("hides the spinner after fetch completes", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })
    );
    render(<RolesPage />);
    await waitFor(() => expect(document.querySelector(".animate-spin")).not.toBeInTheDocument());
  });
});
