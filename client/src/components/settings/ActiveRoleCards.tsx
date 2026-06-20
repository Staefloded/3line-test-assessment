import { useState } from "react";
import { Users, CheckCircle2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AddRoleModal } from "./AddRoleModal";
import type { ActiveRole } from "@/types";

interface ActiveRoleCardsProps {
  roles: ActiveRole[];
  onRoleCreated: (role: ActiveRole) => void;
  onRoleUpdated: (role: ActiveRole) => void;
}

interface RoleCardProps {
  role: ActiveRole;
  selected: boolean;
  onSelect: (id: number) => void;
  onEdit: (role: ActiveRole) => void;
}

function RoleCard({ role, selected, onSelect, onEdit }: RoleCardProps) {
  return (
    <div
      onClick={() => onSelect(role.id)}
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all",
        selected
          ? "border-violet-300 bg-violet-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          selected ? "bg-violet-100" : "bg-gray-100"
        )}
      >
        <Users className={cn("w-5 h-5", selected ? "text-violet-600" : "text-gray-500")} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-semibold", selected ? "text-violet-700" : "text-gray-900")}>
          {role.name}
        </p>
        <p className={cn("text-xs mt-0.5", selected ? "text-violet-500" : "text-gray-500")}>
          Last active {role.lastActive}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              selected ? "text-violet-600" : "text-gray-500 hover:text-gray-700",
              "px-0"
            )}
          >
            Set as default
          </Button>
          <Button
            variant="link"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(role);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="shrink-0 mt-1">
        {selected ? (
          <CheckCircle2 className="w-5 h-5 text-violet-600" />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
        )}
      </div>
    </div>
  );
}

export function ActiveRoleCards({ roles, onRoleCreated, onRoleUpdated }: ActiveRoleCardsProps) {
  const [selectedRole, setSelectedRole] = useState(roles[0]?.id ?? 0);
  const [addOpen, setAddOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<ActiveRole | null>(null);

  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="mb-4 lg:mb-0 lg:w-64 shrink-0">
          <h3 className="text-sm font-medium text-gray-700">Active Role</h3>
          <p className="text-sm text-gray-500 mt-0.5">Select active role available to the user.</p>
        </div>

        <div className="flex-1 space-y-3">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              selected={selectedRole === role.id}
              onSelect={setSelectedRole}
              onEdit={setEditingRole}
            />
          ))}

          <Button
            variant="ghost"
            onClick={() => setAddOpen(true)}
            className="text-gray-500 hover:text-violet-600 mt-2"
          >
            <Plus className="w-4 h-4" />
            Add role to user
          </Button>
        </div>
      </div>

      {/* Add modal */}
      <AddRoleModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={(role) => {
          onRoleCreated(role);
          setSelectedRole(role.id);
        }}
      />

      {/* Edit modal */}
      <AddRoleModal
        open={editingRole !== null}
        onClose={() => setEditingRole(null)}
        onCreated={() => {}}
        editRole={editingRole ?? undefined}
        onUpdated={(role) => {
          onRoleUpdated(role);
          setEditingRole(null);
        }}
      />
    </div>
  );
}
