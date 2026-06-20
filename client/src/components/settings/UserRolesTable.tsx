import { useState } from "react";
import { ArrowDown, Check, CloudDownload } from "lucide-react";
import { cn } from "@/lib/utils";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import { Badge } from "@/components/ui/Badge";
import { AvatarGroup } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import type { TableRole } from "@/types";

interface UserRolesTableProps {
  roles: TableRole[];
}

const STATUS_LABEL: Record<"ACTIVE" | "INACTIVE", string> = {
  ACTIVE: "Active",
  INACTIVE: "In Active",
};

const AVATAR_SRCS = [avatar1, avatar2, avatar3, avatar4, avatar5];

function getAvatars(count: number) {
  return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
    src: AVATAR_SRCS[i % AVATAR_SRCS.length],
    fallback: String.fromCharCode(65 + i),
  }));
}

export function UserRolesTable({ roles }: UserRolesTableProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  function toggleAll() {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(roles.map((r) => r.id));
      setSelectAll(true);
    }
  }

  function toggleRow(id: number) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">User Roles</h2>
        <Button variant="default" size="sm">
          <CloudDownload className="w-4 h-4" />
          Download all
        </Button>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block border border-gray-200 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16 px-6 border-r border-gray-200">
                <Checkbox checked={selectAll} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Name <ArrowDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="last:border-r-0 border-r-0">Role users</TableHead>
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id} className={cn(selected.includes(role.id) && "bg-violet-50")}>
                <TableCell className="px-6">
                  <Checkbox
                    checked={selected.includes(role.id)}
                    onCheckedChange={() => toggleRow(role.id)}
                  />
                </TableCell>
                <TableCell className="font-semibold text-gray-900">{role.name}</TableCell>
                <TableCell className="text-gray-400">{role.type}</TableCell>
                <TableCell>{role.dateCreated}</TableCell>
                <TableCell>
                  <Badge variant={role.status === "ACTIVE" ? "default" : "inactive"}>
                    {role.status === "ACTIVE" && <Check className="w-3 h-3 stroke-[2.5]" />}
                    {STATUS_LABEL[role.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <AvatarGroup avatars={getAvatars(role.avatarCount)} max={4} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <CloudDownload className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile table */}
      <div className="lg:hidden border border-gray-200 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 px-4 border-r-0">
                <Checkbox checked={selectAll} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead className="border-r-0">
                <div className="flex items-center gap-1">
                  Name <ArrowDown className="w-3 h-3" />
                </div>
              </TableHead>
              <TableHead className="border-r-0">Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow
                key={role.id}
                className={cn(selected.includes(role.id) ? "bg-violet-50" : "hover:bg-gray-50")}
              >
                <TableCell className="px-4">
                  <Checkbox
                    checked={selected.includes(role.id)}
                    onCheckedChange={() => toggleRow(role.id)}
                  />
                </TableCell>
                <TableCell className="font-semibold text-gray-900">{role.name}</TableCell>
                <TableCell>{role.dateCreated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
