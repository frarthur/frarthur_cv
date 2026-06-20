import React from "react";

interface IonIconProps {
  readonly name: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export default function IonIcon({ name, className, style }: IonIconProps) {
  return React.createElement("ion-icon", { name, class: className, style });
}
