import { useState, useEffect, useRef } from "react";
import { X, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ActiveRole, CreateActiveRoleInput } from "@/types";

interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (role: ActiveRole) => void;
  editRole?: ActiveRole;
  onUpdated?: (role: ActiveRole) => void;
}

export function AddRoleModal({ open, onClose, onCreated, editRole, onUpdated }: AddRoleModalProps) {
  const isEdit = !!editRole;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName(editRole?.name ?? "");
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, editRole]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const body: CreateActiveRoleInput = { name: name.trim() };

      const res = await fetch(
        isEdit ? `${import.meta.env.VITE_API_URL}/api/roles/user-roles/${editRole!.id}` : `${import.meta.env.VITE_API_URL}/api/roles/user-roles`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? (isEdit ? "Failed to update role" : "Failed to create role"));
      }

      const { data } = await res.json();
      if (isEdit) {
        onUpdated?.(data as ActiveRole);
      } else {
        onCreated(data as ActiveRole);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {isEdit ? "Edit role" : "Add role to user"}
              </h2>
              <p className="text-sm text-gray-500">
                {isEdit ? "Update the role name." : "Create a new active role."}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="-mt-1 -mr-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role name <span className="text-red-500">*</span>
            </label>
            <Input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Billing admin"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 pt-1">
            <Button
              type="button"
              variant="default"
              onClick={onClose}
              className="flex-1 justify-center py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !name.trim()}
              className="flex-1 justify-center py-2.5"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? (isEdit ? "Saving…" : "Creating…") : isEdit ? "Save changes" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
