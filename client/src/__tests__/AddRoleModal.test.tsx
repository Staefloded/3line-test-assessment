import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddRoleModal } from "../components/settings/AddRoleModal";
import type { ActiveRole } from "../types";

const noop = vi.fn();
const mockRole: ActiveRole = { id: 1, name: "Superadmin", lastActive: "06/2023" };

afterEach(() => vi.unstubAllGlobals());

describe("AddRoleModal", () => {
  it("renders nothing when open is false", () => {
    render(<AddRoleModal open={false} onClose={noop} onCreated={noop} />);
    expect(screen.queryByText("Create")).not.toBeInTheDocument();
    expect(screen.queryByText("Save changes")).not.toBeInTheDocument();
  });

  describe("add mode", () => {
    it("shows Create button and empty input", () => {
      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} />);
      expect(screen.getByText("Create")).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e.g. Billing admin/i)).toBeInTheDocument();
    });

    it("Create button is disabled when name is empty", () => {
      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} />);
      expect(screen.getByText("Create")).toBeDisabled();
    });

    it("Create button is disabled when name is only whitespace", () => {
      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. Billing admin/i), {
        target: { value: "   " },
      });
      expect(screen.getByText("Create")).toBeDisabled();
    });

    it("calls onCreated and onClose on successful create", async () => {
      const onCreated = vi.fn();
      const onClose = vi.fn();
      const newRole = { id: 4, name: "Newadmin", lastActive: "06/2026" };
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: newRole }),
      }));

      render(<AddRoleModal open={true} onClose={onClose} onCreated={onCreated} />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. Billing admin/i), {
        target: { value: "Newadmin" },
      });
      fireEvent.click(screen.getByText("Create"));

      await waitFor(() => expect(onCreated).toHaveBeenCalledWith(newRole));
      expect(onClose).toHaveBeenCalled();
    });

    it("shows API error message when create fails", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Name already taken" }),
      }));

      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. Billing admin/i), {
        target: { value: "Newadmin" },
      });
      fireEvent.click(screen.getByText("Create"));

      await waitFor(() => expect(screen.getByText("Name already taken")).toBeInTheDocument());
    });

    it("shows error message when network request fails", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("Network error")));

      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} />);
      fireEvent.change(screen.getByPlaceholderText(/e.g. Billing admin/i), {
        target: { value: "Newadmin" },
      });
      fireEvent.click(screen.getByText("Create"));

      await waitFor(() => expect(screen.getByText("Network error")).toBeInTheDocument());
    });
  });

  describe("edit mode", () => {
    it("shows Save changes button and pre-filled name", () => {
      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} editRole={mockRole} onUpdated={noop} />);
      expect(screen.getByText("Save changes")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Superadmin")).toBeInTheDocument();
    });

    it("calls onUpdated and onClose on successful edit", async () => {
      const onUpdated = vi.fn();
      const onClose = vi.fn();
      const updated = { id: 1, name: "SuperadminV2", lastActive: "06/2023" };
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: updated }),
      }));

      render(<AddRoleModal open={true} onClose={onClose} onCreated={noop} editRole={mockRole} onUpdated={onUpdated} />);
      fireEvent.change(screen.getByDisplayValue("Superadmin"), {
        target: { value: "SuperadminV2" },
      });
      fireEvent.click(screen.getByText("Save changes"));

      await waitFor(() => expect(onUpdated).toHaveBeenCalledWith(updated));
      expect(onClose).toHaveBeenCalled();
    });

    it("shows API error message when update fails", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Role not found" }),
      }));

      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} editRole={mockRole} onUpdated={noop} />);
      fireEvent.change(screen.getByDisplayValue("Superadmin"), {
        target: { value: "SuperadminV2" },
      });
      fireEvent.click(screen.getByText("Save changes"));

      await waitFor(() => expect(screen.getByText("Role not found")).toBeInTheDocument());
    });

    it("shows error message when network request fails during edit", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("Network error")));

      render(<AddRoleModal open={true} onClose={noop} onCreated={noop} editRole={mockRole} onUpdated={noop} />);
      fireEvent.change(screen.getByDisplayValue("Superadmin"), {
        target: { value: "SuperadminV2" },
      });
      fireEvent.click(screen.getByText("Save changes"));

      await waitFor(() => expect(screen.getByText("Network error")).toBeInTheDocument());
    });
  });
});
