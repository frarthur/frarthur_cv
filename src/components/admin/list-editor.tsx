"use client";

import { useCallback, useEffect, useState } from "react";
import type React from "react";
import { useAdminApi } from "./use-admin-api";
import { btnDanger, btnPrimary, btnSecondary, cardStyle, sectionTitle } from "./styles";

interface ListEditorProps<T extends { id?: string }> {
  readonly password: string;
  readonly table: string;
  readonly title: string;
  readonly defaultItem: T;
  readonly renderForm: (item: T, onChange: (item: T) => void) => React.ReactNode;
  readonly renderPreview?: (item: T) => React.ReactNode;
}

export default function ListEditor<T extends { id?: string }>({ password, table, title, defaultItem, renderForm, renderPreview }: ListEditorProps<T>) {
  const api = useAdminApi<T[]>(password);
  const apiSingle = useAdminApi<T>(password);
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<T | null>(null);
  const [added, setAdded] = useState(false);

  const load = useCallback(async () => {
    const data = await api(table, "select");
    if (data) setItems(data);
  }, [api, table]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    await apiSingle(table, "upsert", { data: editing as unknown as Record<string, unknown>, match: editing.id ? { id: editing.id } : undefined });
    setEditing(null);
    setAdded(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet element ?")) return;
    await apiSingle(table, "delete", { match: { id } });
    load();
  };

  const handleNew = () => {
    setEditing({ ...defaultItem });
    setAdded(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={sectionTitle}>{title}</h2>
        <button onClick={handleNew} style={btnPrimary}>+ Ajouter</button>
      </div>

      {editing && (
        <div style={cardStyle}>
          <h3 style={{ color: "#fff", marginBottom: 16, fontSize: 15 }}>{added ? "Nouvel element" : "Modifier"}</h3>
          {renderForm(editing, setEditing)}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={handleSave} style={btnPrimary}>Enregistrer</button>
            <button onClick={() => { setEditing(null); setAdded(false); }} style={btnSecondary}>Annuler</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(item => {
          const id = item.id ?? "";
          return (
            <div key={id} style={{ ...cardStyle, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                {renderPreview ? renderPreview(item) : <span style={{ color: "#fff", fontSize: 14 }}>{id.substring(0, 8)}...</span>}
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => setEditing(item)} style={btnSecondary}>Modifier</button>
                <button onClick={() => handleDelete(id)} style={btnDanger}>Supprimer</button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p style={{ color: "var(--light-gray-70)", textAlign: "center", padding: 40 }}>Aucun element. Cliquez sur &quot;Ajouter&quot;.</p>
        )}
      </div>
    </div>
  );
}
