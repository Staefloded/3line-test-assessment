import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { ConnectedEmail } from "./ConnectedEmail";
import { ActiveRoleCards } from "./ActiveRoleCards";
import { UserRolesTable } from "./UserRolesTable";
import type { ActiveRole, TableRole, ApiRolesResponse } from "@/types";

export function RolesPage() {
  const [apiRoles, setApiRoles] = useState<ActiveRole[]>([]);
  const [tableRoles, setTableRoles] = useState<TableRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/roles`);
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data: ApiRolesResponse = await res.json();
        setApiRoles(data.activeRoles);
        setTableRoles(data.tableRoles);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load roles. Please ensure the server is running."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchRoles();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">User Roles</h2>
        <p className="text-sm text-gray-500 mt-0.5">Update your roles details and information.</p>
      </div>

      {loading ? (
        <div className="py-12 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      ) : (
        <>
          <ConnectedEmail />
          <ActiveRoleCards
            roles={apiRoles}
            onRoleCreated={(role) => setApiRoles((prev) => [...prev, role])}
            onRoleUpdated={(role) =>
              setApiRoles((prev) => prev.map((r) => (r.id === role.id ? role : r)))
            }
          />
          <UserRolesTable roles={tableRoles} />
        </>
      )}
    </div>
  );
}
