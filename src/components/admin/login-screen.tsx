"use client";

import { useState } from "react";
import type { ApiResponse } from "./use-admin-api";
import { btnPrimary, inputStyle } from "./styles";

interface LoginScreenProps {
  readonly onLogin: (pw: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, table: "settings", action: "select" }),
      });
      const json: ApiResponse = await res.json();
      if (res.ok && json.success) {
        sessionStorage.setItem("admin_pw", pw);
        onLogin(pw);
      } else {
        alert(json.error ?? "Mot de passe incorrect");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--eerie-black-2, #1a1a1a)" }}>
      <form onSubmit={handleSubmit} style={{ width: 380, padding: 40, borderRadius: 16, background: "var(--eerie-black-1, #222)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#fff" }}>Admin Portfolio</h1>
        <p style={{ color: "var(--light-gray-70)", marginBottom: 24, fontSize: 14 }}>Mot de passe requis</p>
        <input
          type="password"
          placeholder="Mot de passe"
          value={pw}
          onChange={e => setPw(e.target.value)}
          style={{ ...inputStyle, textAlign: "center", fontSize: 16, padding: "14px" }}
          autoFocus
        />
        <button type="submit" disabled={loading} style={{ ...btnPrimary, width: "100%", marginTop: 16, padding: "14px", fontSize: 15 }}>
          {loading ? "Verification..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
