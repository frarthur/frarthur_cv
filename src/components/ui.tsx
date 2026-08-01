import React from "react";
import IonIcon from "./ion-icon";

export const iconBoxEl = (name: string) => (
  <div className="icon-box">
    <IonIcon name={name} />
  </div>
);

export const badgeStyle = {
  color: "var(--white-1)",
  background: "var(--onyx)",
  fontSize: "var(--fs-7)",
  fontWeight: 300 as const,
  padding: "5px 12px",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  gap: 6,
};

export const logoSm = (src: string) => (
  <img src={src} alt="" style={{ width: 18, height: 18, objectFit: "contain" as const, display: "inline" }} />
);

export function logoImg(src: string, size: number, extra?: React.CSSProperties) {
  return (
    <img
      src={src}
      alt=""
      style={{ width: size, height: size, objectFit: "contain" as const, display: "inline", ...extra }}
    />
  );
}
