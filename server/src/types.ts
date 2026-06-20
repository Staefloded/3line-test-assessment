export interface ActiveRole {
  id: number;
  name: string;
  lastActive: string;
}

export type RoleType = "DEFAULT" | "CUSTOM" | "SYSTEM-CUSTOM";
export type RoleStatus = "ACTIVE" | "INACTIVE";

export interface TableRole {
  id: number;
  name: string;
  type: RoleType;
  dateCreated: string;
  status: RoleStatus;
  avatarCount: number;
}

export interface RolesData {
  activeRoles: ActiveRole[];
  tableRoles: TableRole[];
}

export interface CreateActiveRoleInput {
  name: string;
}
