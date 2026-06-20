import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SettingsTabs } from "../components/settings/SettingsTabs";

describe("SettingsTabs", () => {
  it("renders all tab labels", () => {
    render(<SettingsTabs activeTab="Roles" onTabChange={vi.fn()} />);
    expect(screen.getByText("My details")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Roles")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
    expect(screen.getByText("API")).toBeInTheDocument();
  });

  it("applies active styles to the selected tab", () => {
    render(<SettingsTabs activeTab="Roles" onTabChange={vi.fn()} />);
    const rolesTab = screen.getByText("Roles");
    expect(rolesTab).toHaveClass("font-semibold");
  });

  it("calls onTabChange when a tab is clicked", () => {
    const onChange = vi.fn();
    render(<SettingsTabs activeTab="Roles" onTabChange={onChange} />);
    fireEvent.click(screen.getByText("Profile"));
    expect(onChange).toHaveBeenCalledWith("Profile");
  });

  it("inactive tabs do not have active styles", () => {
    render(<SettingsTabs activeTab="Roles" onTabChange={vi.fn()} />);
    const profileTab = screen.getByText("Profile");
    expect(profileTab).not.toHaveClass("font-semibold");
  });
});
