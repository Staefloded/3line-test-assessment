import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserRolesTable } from "../components/settings/UserRolesTable";
import type { TableRole } from "../types";

const mockRoles: TableRole[] = [
  {
    id: 1,
    name: "Superadmin",
    type: "DEFAULT",
    dateCreated: "Jan 1, 2023",
    status: "ACTIVE",
    avatarCount: 4,
  },
  {
    id: 2,
    name: "Developeradmin",
    type: "SYSTEM-CUSTOM",
    dateCreated: "May 1, 2023",
    status: "ACTIVE",
    avatarCount: 3,
  },
  {
    id: 3,
    name: "Deputy sales",
    type: "CUSTOM",
    dateCreated: "Apr 1, 2023",
    status: "INACTIVE",
    avatarCount: 3,
  },
];

describe("UserRolesTable", () => {
  it("renders role names", () => {
    render(<UserRolesTable roles={mockRoles} />);
    expect(screen.getAllByText("Superadmin").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Developeradmin").length).toBeGreaterThan(0);
  });

  it("renders correct status badges", () => {
    render(<UserRolesTable roles={mockRoles} />);
    expect(screen.getAllByText("Active").length).toBeGreaterThan(0);
    expect(screen.getAllByText("In Active").length).toBeGreaterThan(0);
  });

  it("renders role types", () => {
    render(<UserRolesTable roles={mockRoles} />);
    expect(screen.getAllByText("DEFAULT").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SYSTEM-CUSTOM").length).toBeGreaterThan(0);
    expect(screen.getAllByText("CUSTOM").length).toBeGreaterThan(0);
  });

  it("renders date created", () => {
    render(<UserRolesTable roles={mockRoles} />);
    expect(screen.getAllByText("Jan 1, 2023").length).toBeGreaterThan(0);
  });

  it("select all checkbox selects all rows", () => {
    render(<UserRolesTable roles={mockRoles} />);
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    const rowCheckboxes = checkboxes.slice(1);
    rowCheckboxes.forEach((cb) => {
      expect(cb).toBeChecked();
    });
  });

  it("individual row checkbox can be toggled", () => {
    render(<UserRolesTable roles={mockRoles} />);
    const checkboxes = screen.getAllByRole("checkbox");
    const firstRowCb = checkboxes[1];
    expect(firstRowCb).not.toBeChecked();
    fireEvent.click(firstRowCb);
    expect(firstRowCb).toBeChecked();
    fireEvent.click(firstRowCb);
    expect(firstRowCb).not.toBeChecked();
  });

  it("renders Download all button", () => {
    render(<UserRolesTable roles={mockRoles} />);
    expect(screen.getByText(/download all/i)).toBeInTheDocument();
  });
});
