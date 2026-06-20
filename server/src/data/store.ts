import type { ActiveRole } from "../types";

const SEED: ActiveRole[] = [
  { id: 1, name: "Superadmin", lastActive: "06/2023" },
  { id: 2, name: "Developeradmin", lastActive: "01/2023" },
  { id: 3, name: "Supportadmin", lastActive: "10/2022" },
];

let activeRoles: ActiveRole[] = [...SEED];

export function resetStore(): void {
  activeRoles = SEED.map((r) => ({ ...r }));
}

export function getActiveRoles(): ActiveRole[] {
  return activeRoles;
}

export function addActiveRole(role: ActiveRole): void {
  activeRoles.push(role);
}

export function updateActiveRole(id: number, name: string): ActiveRole | null {
  const idx = activeRoles.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  activeRoles[idx] = { ...activeRoles[idx], name };
  return activeRoles[idx];
}
