import type React from "react";

export const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, marginTop: 4, boxSizing: "border-box",
};

export const labelStyle: React.CSSProperties = { display: "flex", flexDirection: "column", fontSize: 13, color: "var(--light-gray-70)", fontWeight: 500, gap: 2 };

export const btnPrimary: React.CSSProperties = { padding: "10px 22px", borderRadius: 8, border: "none", background: "var(--orange-yellow-crayola)", color: "#000", fontWeight: 600, fontSize: 14, cursor: "pointer" };
export const btnDanger: React.CSSProperties = { padding: "8px 16px", borderRadius: 8, border: "none", background: "#e74c3c", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" };
export const btnSecondary: React.CSSProperties = { padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontWeight: 500, fontSize: 13, cursor: "pointer" };

export const cardStyle: React.CSSProperties = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20, marginBottom: 16 };
export const sectionTitle: React.CSSProperties = { fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#fff" };
export const badgeStyle: React.CSSProperties = { display: "inline-block", padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.08)", fontSize: 12, color: "var(--light-gray-70)", marginRight: 6, marginBottom: 6 };
