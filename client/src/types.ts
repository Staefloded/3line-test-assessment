export interface ActiveRole {
  id: number;
  name: string;
  lastActive: string;
}

export interface TableRole {
  id: number;
  name: string;
  type: "DEFAULT" | "CUSTOM" | "SYSTEM-CUSTOM";
  dateCreated: string;
  status: "ACTIVE" | "INACTIVE";
  avatarCount: number;
}

export interface AvatarItem {
  src: string | null;
  alt?: string;
  fallback: string;
}

export interface ApiRolesResponse {
  activeRoles: ActiveRole[];
  tableRoles: TableRole[];
}

export interface CreateActiveRoleInput {
  name: string;
}
