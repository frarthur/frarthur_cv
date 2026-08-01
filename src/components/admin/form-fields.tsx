"use client";

import React from "react";
import { inputStyle, labelStyle } from "./styles";

export function frEnInputs(prefix: string, values: Record<string, string>, onChange: (key: string, value: string) => void) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <label style={labelStyle}>
        {prefix} FR
        <input style={inputStyle} value={values[prefix + "_fr"] ?? ""} onChange={e => onChange(prefix + "_fr", e.target.value)} />
      </label>
      <label style={labelStyle}>
        {prefix} EN
        <input style={inputStyle} value={values[prefix + "_en"] ?? ""} onChange={e => onChange(prefix + "_en", e.target.value)} />
      </label>
    </div>
  );
}

export function frEnTextareas(prefix: string, values: Record<string, string>, onChange: (key: string, value: string) => void) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <label style={labelStyle}>
        {prefix} FR
        <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" } as React.CSSProperties} value={values[prefix + "_fr"] ?? ""} onChange={e => onChange(prefix + "_fr", e.target.value)} />
      </label>
      <label style={labelStyle}>
        {prefix} EN
        <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" } as React.CSSProperties} value={values[prefix + "_en"] ?? ""} onChange={e => onChange(prefix + "_en", e.target.value)} />
      </label>
    </div>
  );
}
