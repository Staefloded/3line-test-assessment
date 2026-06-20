import fs from "fs";
import path from "path";
import type { ActiveRole } from "../types";

const STORE_PATH = path.resolve(__dirname, "../../data/roles-store.json");

interface Store {
  activeRoles: ActiveRole[];
}

const DEFAULT_STORE: Store = {
  activeRoles: [
    { id: 1, name: "Superadmin", lastActive: "06/2023" },
    { id: 2, name: "Developeradmin", lastActive: "01/2023" },
    { id: 3, name: "Supportadmin", lastActive: "10/2022" },
  ],
};

function readStore(): Store {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as Store;
  } catch {
    writeStore(DEFAULT_STORE);
    return DEFAULT_STORE;
  }
}

function writeStore(store: Store): void {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

export function getActiveRoles(): ActiveRole[] {
  return readStore().activeRoles;
}

export function addActiveRole(role: ActiveRole): void {
  const store = readStore();
  store.activeRoles.push(role);
  writeStore(store);
}

export function updateActiveRole(id: number, name: string): ActiveRole | null {
  const store = readStore();
  const idx = store.activeRoles.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  store.activeRoles[idx] = { ...store.activeRoles[idx], name };
  writeStore(store);
  return store.activeRoles[idx];
}
