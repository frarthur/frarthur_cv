"use client";

import { useCallback } from "react";

export type CrudAction = "select" | "upsert" | "delete" | "update_password";

export interface ApiResponse {
  success?: boolean;
  data?: unknown;
  error?: string;
  deleted?: unknown;
}

export function useAdminApi<T = unknown>(password: string) {
  const call = useCallback(
    async (table: string, action: CrudAction, extra?: { data?: Record<string, unknown>; match?: { id: string } }): Promise<T | null> => {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, table, action, ...extra }),
      });
      const json: ApiResponse = await res.json();
      if (!res.ok) {
        alert(json.error ?? "Erreur inconnue");
        return null;
      }
      return json.data as T ?? (json.success as T);
    },
    [password]
  );
  return call;
}
