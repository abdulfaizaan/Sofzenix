"use client";

import { useTransition } from "react";
import type { ContactStatus } from "@prisma/client";

interface StatusSelectProps {
  id: string;
  currentStatus: ContactStatus;
  onUpdate: (id: string, status: ContactStatus) => Promise<{ success: boolean; error?: string }>;
}

const statuses: ContactStatus[] = ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"];

export function StatusSelect({ id, currentStatus, onUpdate }: StatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ContactStatus;
    startTransition(async () => {
      const result = await onUpdate(id, newStatus);
      if (!result.success) {
        alert(result.error || "Failed to update status");
      }
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`block w-full pl-3 pr-8 py-1.5 text-sm rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
