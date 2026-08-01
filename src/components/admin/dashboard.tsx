"use client";

import {
  AboutEditor, ContactEditor, ExperienceEditor, FeaturedEditor,
  GalleryEditor, ParcoursLabelsEditor, PasswordEditor, ProjectsEditor,
  SoftwareEditor,
} from "./editors";
import { btnSecondary } from "./styles";

const TABS: { key: string; label: string }[] = [
  { key: "a_propos", label: "A propos" },
  { key: "a_propos_vedette", label: "A propos - Vedette" },
  { key: "parcours_labels", label: "Parcours - Labels" },
  { key: "parcours_experience", label: "Parcours - Pro & Formation" },
  { key: "parcours_logiciel", label: "Parcours - Logiciels" },
  { key: "projets", label: "Projets" },
  { key: "contact", label: "Contact" },
  { key: "galerie", label: "Galerie" },
  { key: "password", label: "Mot de passe" },
];

interface DashboardProps {
  readonly password: string;
  readonly activeTab: string;
  readonly setActiveTab: (t: string) => void;
}

export default function AdminDashboard({ password, activeTab, setActiveTab }: DashboardProps) {
  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    window.location.reload();
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--eerie-black-2, #1a1a1a)", display: "flex" }}>
      {/* Sidebar */}
      <nav style={{ width: 240, background: "var(--eerie-black-1, #222)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Admin Portfolio</h2>
          <p style={{ fontSize: 12, color: "var(--light-gray-70)", margin: "4px 0 0" }}>Edition de la base</p>
        </div>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: "block", width: "100%", textAlign: "left", padding: "10px 20px", border: "none", background: activeTab === tab.key ? "rgba(255,255,255,0.08)" : "transparent",
              color: activeTab === tab.key ? "#fff" : "var(--light-gray-70)", fontSize: 14, cursor: "pointer", fontWeight: activeTab === tab.key ? 600 : 400,
              borderLeft: activeTab === tab.key ? "3px solid var(--orange-yellow-crayola)" : "3px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", padding: "20px" }}>
          <button onClick={handleLogout} style={{ ...btnSecondary, width: "100%" }}>Deconnexion</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ flex: 1, padding: 30, overflowY: "auto", maxHeight: "100vh" }}>
        {activeTab === "a_propos" && <AboutEditor password={password} />}
        {activeTab === "a_propos_vedette" && <FeaturedEditor password={password} />}
        {activeTab === "parcours_labels" && <ParcoursLabelsEditor password={password} />}
        {activeTab === "parcours_experience" && <ExperienceEditor password={password} />}
        {activeTab === "parcours_logiciel" && <SoftwareEditor password={password} />}
        {activeTab === "projets" && <ProjectsEditor password={password} />}
        {activeTab === "contact" && <ContactEditor password={password} />}
        {activeTab === "galerie" && <GalleryEditor password={password} />}
        {activeTab === "password" && <PasswordEditor password={password} />}
      </div>
    </div>
  );
}
