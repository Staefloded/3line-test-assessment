import { Router, Request, Response } from "express";
import { tableRoles } from "../data/roles";
import { getActiveRoles, addActiveRole, updateActiveRole } from "../data/store";
import type { CreateActiveRoleInput } from "../types";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({ activeRoles: getActiveRoles(), tableRoles });
});

router.get("/user-roles", (_req: Request, res: Response): void => {
  res.json({ data: getActiveRoles() });
});

router.post("/user-roles", (req: Request, res: Response): void => {
  const { name } = req.body as CreateActiveRoleInput;

  if (!name || typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ error: "name is required and must be a non-empty string" });
    return;
  }

  const activeRoles = getActiveRoles();
  const maxId = activeRoles.reduce((max, r) => Math.max(max, r.id), 0);
  const now = new Date();
  const lastActive = `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

  const newRole = { id: maxId + 1, name: name.trim(), lastActive };
  addActiveRole(newRole);

  res.status(201).json({ data: newRole });
});

router.put("/user-roles/:id", (req: Request, res: Response): void => {
  const id = parseInt(String(req.params.id), 10);
  const { name } = req.body as CreateActiveRoleInput;

  if (!name || typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ error: "name is required and must be a non-empty string" });
    return;
  }

  const updated = updateActiveRole(id, name.trim());
  if (!updated) {
    res.status(404).json({ error: "Role not found" });
    return;
  }

  res.json({ data: updated });
});

router.get("/table", (req: Request, res: Response): void => {
  const { status, type } = req.query as { status?: string; type?: string };
  let filtered = tableRoles;

  if (status) {
    filtered = filtered.filter((r) => r.status.toLowerCase() === status.toLowerCase());
  }
  if (type) {
    filtered = filtered.filter((r) => r.type.toLowerCase() === type.toLowerCase());
  }

  res.json({ data: filtered, total: filtered.length });
});

router.get("/table/:id", (req: Request, res: Response): void => {
  const id = parseInt(String(req.params.id), 10);
  const role = tableRoles.find((r) => r.id === id);
  if (!role) {
    res.status(404).json({ error: "Role not found" });
    return;
  }
  res.json({ data: role });
});

export default router;
