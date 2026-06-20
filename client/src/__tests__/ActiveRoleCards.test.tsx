import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActiveRoleCards } from "../components/settings/ActiveRoleCards";
import type { ActiveRole } from "../types";

const mockRoles: ActiveRole[] = [
  { id: 1, name: "Superadmin", lastActive: "06/2023" },
  { id: 2, name: "Developeradmin", lastActive: "01/2023" },
  { id: 3, name: "Supportadmin", lastActive: "10/2022" },
];

const noop = vi.fn();

afterEach(() => vi.unstubAllGlobals());

function renderCards() {
  return render(<ActiveRoleCards roles={mockRoles} onRoleCreated={noop} onRoleUpdated={noop} />);
}

describe("ActiveRoleCards", () => {
  it("renders all role names", () => {
    renderCards();
    expect(screen.getByText("Superadmin")).toBeInTheDocument();
    expect(screen.getByText("Developeradmin")).toBeInTheDocument();
    expect(screen.getByText("Supportadmin")).toBeInTheDocument();
  });

  it("shows last active dates", () => {
    renderCards();
    expect(screen.getByText(/Last active 06\/2023/)).toBeInTheDocument();
    expect(screen.getByText(/Last active 01\/2023/)).toBeInTheDocument();
  });

  it("first role is selected by default", () => {
    renderCards();
    const superadminCard = screen.getByText("Superadmin").closest('div[class*="border"]');
    expect(superadminCard).toHaveClass("border-violet-300");
  });

  it("clicking a different card selects it", () => {
    renderCards();
    const devCard = screen.getByText("Developeradmin").closest('[class*="rounded-xl"]');
    fireEvent.click(devCard!);
    expect(devCard).toHaveClass("border-violet-300");
  });

  it("renders Edit and Set as default actions", () => {
    renderCards();
    expect(screen.getAllByText("Edit").length).toBe(3);
    expect(screen.getAllByText("Set as default").length).toBe(3);
  });

  it("renders Add role to user button", () => {
    renderCards();
    expect(screen.getByText(/Add role to user/)).toBeInTheDocument();
  });

  it("clicking Add role to user opens the add modal", () => {
    renderCards();
    expect(screen.queryByText("Create")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/Add role to user/));
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Billing admin/i)).toBeInTheDocument();
  });

  it("closing the add modal hides it", () => {
    renderCards();
    fireEvent.click(screen.getByText(/Add role to user/));
    expect(screen.getByText("Create")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Create")).not.toBeInTheDocument();
  });

  it("clicking Edit opens the edit modal pre-filled with role name", () => {
    renderCards();
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);
    expect(screen.getByText("Save changes")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Superadmin")).toBeInTheDocument();
  });

  it("closing the edit modal hides it", () => {
    renderCards();
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByText("Save changes")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Save changes")).not.toBeInTheDocument();
  });

});
