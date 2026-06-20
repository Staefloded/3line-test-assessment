import type { ActiveRole, TableRole } from "../types";

export const activeRoles: ActiveRole[] = [
  { id: 1, name: "Superadmin", lastActive: "06/2023" },
  { id: 2, name: "Developeradmin", lastActive: "01/2023" },
  { id: 3, name: "Supportadmin", lastActive: "10/2022" },
];

export const tableRoles: TableRole[] = [
  {
    id: 1,
    name: "Superadmin",
    type: "DEFAULT",
    dateCreated: "Jan 1, 2023",
    status: "ACTIVE",
    avatarCount: 6,
  },
  {
    id: 2,
    name: "Merchantadmin",
    type: "DEFAULT",
    dateCreated: "Feb 1, 2023",
    status: "ACTIVE",
    avatarCount: 5,
  },
  {
    id: 3,
    name: "supportadmin",
    type: "DEFAULT",
    dateCreated: "Feb 1, 2023",
    status: "ACTIVE",
    avatarCount: 4,
  },
  {
    id: 4,
    name: "sales personnel",
    type: "CUSTOM",
    dateCreated: "Mar 1, 2023",
    status: "ACTIVE",
    avatarCount: 3,
  },
  {
    id: 5,
    name: "Deputy sales personnel",
    type: "CUSTOM",
    dateCreated: "Apr 1, 2023",
    status: "INACTIVE",
    avatarCount: 4,
  },
  {
    id: 6,
    name: "Developeradmin",
    type: "SYSTEM-CUSTOM",
    dateCreated: "May 1, 2023",
    status: "ACTIVE",
    avatarCount: 4,
  },
  {
    id: 7,
    name: "Developer-basic",
    type: "SYSTEM-CUSTOM",
    dateCreated: "Jun 1, 2023",
    status: "ACTIVE",
    avatarCount: 3,
  },
];
