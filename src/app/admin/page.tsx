"use client";

import { useState, useEffect, useCallback } from "react";

/* ========== TYPES ========== */

type CrudAction = "select" | "upsert" | "delete" | "update_password";

interface ApiResponse {
  success?: boolean;
  data?: unknown;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleted?: any;
}

/* ========== HOOKS ========== */

function useAdminApi<T = unknown>(password: string) {
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

/* ========== HELPERS ========== */

function frEnInputs(prefix: string, values: Record<string, string>, onChange: (key: string, value: string) => void) {
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

function frEnTextareas(prefix: string, values: Record<string, string>, onChange: (key: string, value: string) => void) {
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

/* ========== STYLES ========== */

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, marginTop: 4, boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = { display: "flex", flexDirection: "column", fontSize: 13, color: "var(--light-gray-70)", fontWeight: 500, gap: 2 };

const btnPrimary: React.CSSProperties = { padding: "10px 22px", borderRadius: 8, border: "none", background: "var(--orange-yellow-crayola)", color: "#000", fontWeight: 600, fontSize: 14, cursor: "pointer" };
const btnDanger: React.CSSProperties = { padding: "8px 16px", borderRadius: 8, border: "none", background: "#e74c3c", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" };
const btnSecondary: React.CSSProperties = { padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontWeight: 500, fontSize: 13, cursor: "pointer" };

const cardStyle: React.CSSProperties = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20, marginBottom: 16 };
const sectionTitle: React.CSSProperties = { fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#fff" };
const badgeStyle: React.CSSProperties = { display: "inline-block", padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.08)", fontSize: 12, color: "var(--light-gray-70)", marginRight: 6, marginBottom: 6 };

/* ========== LOGIN SCREEN ========== */

function LoginScreen({ onLogin }: { readonly onLogin: (pw: string) => void }) {
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
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#fff" }}>Admin CV</h1>
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

/* ========== MAIN ADMIN PANEL ========== */

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("a_propos");

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_pw");
    if (stored) setPassword(stored);
  }, []);

  if (!password) return <LoginScreen onLogin={setPassword} />;

  return <AdminDashboard password={password} activeTab={activeTab} setActiveTab={setActiveTab} />;
}

/* ========== DASHBOARD ========== */

const TABS: { key: string; label: string }[] = [
  { key: "a_propos", label: "A propos" },
  { key: "a_propos_vedette", label: "A propos - Vedette" },
  { key: "parcours_experience", label: "Parcours - Pro & Formation" },
  { key: "parcours_logiciel", label: "Parcours - Logiciels" },
  { key: "projets", label: "Projets" },
  { key: "contact", label: "Contact" },
  { key: "galerie", label: "Galerie" },
  { key: "password", label: "Mot de passe" },
];

function AdminDashboard({ password, activeTab, setActiveTab }: { readonly password: string; readonly activeTab: string; readonly setActiveTab: (t: string) => void }) {
  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    window.location.reload();
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--eerie-black-2, #1a1a1a)", display: "flex" }}>
      {/* Sidebar */}
      <nav style={{ width: 240, background: "var(--eerie-black-1, #222)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Admin CV</h2>
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

/* ========== GENERIC LIST + FORM HELPER ========== */

interface ListEditorProps<T extends { id?: string }> {
  readonly password: string;
  readonly table: string;
  readonly title: string;
  readonly defaultItem: T;
  readonly renderForm: (item: T, onChange: (item: T) => void) => React.ReactNode;
  readonly renderPreview?: (item: T) => React.ReactNode;
}

function ListEditor<T extends { id?: string }>({ password, table, title, defaultItem, renderForm, renderPreview }: ListEditorProps<T>) {
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

/* ========== SECTION EDITORS ========== */

function AboutEditor({ password }: { readonly password: string }) {
  const api = useAdminApi<Record<string, string>[]>(password);
  const apiSave = useAdminApi<Record<string, string>>(password);
  const [data, setData] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api("a_propos", "select").then(rows => {
      if (rows && rows.length > 0) { setData(rows[0]); setLoaded(true); }
    });
  }, [api]);

  const onChange = (key: string, value: string) => setData(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    await apiSave("a_propos", "upsert", { data });
    alert("Enregistre !");
  };

  if (!loaded) return <p style={{ color: "var(--light-gray-70)" }}>Chargement...</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={sectionTitle}>A propos</h2>
        <button onClick={handleSave} style={btnPrimary}>Enregistrer</button>
      </div>

      <div style={cardStyle}>
        {frEnInputs("about_title", data, onChange)}
        <div style={{ height: 16 }} />
        {frEnTextareas("about_p1", data, onChange)}
        <div style={{ height: 16 }} />
        {frEnTextareas("about_p2", data, onChange)}
        <div style={{ height: 16 }} />
        {frEnInputs("highlights_title", data, onChange)}
        <div style={{ height: 16 }} />
        {frEnInputs("hl_completed", data, onChange)}
        {frEnInputs("hl_in_progress", data, onChange)}
        {frEnInputs("hl_maintained", data, onChange)}
        <div style={{ height: 16 }} />
        {frEnInputs("featured_title", data, onChange)}
      </div>
    </div>
  );
}

type FeaturedRow = { id?: string; image: string; logo: string; link: string; title_fr: string; title_en: string; desc_fr: string; desc_en: string; sort_order: number };

function FeaturedEditor({ password }: { readonly password: string }) {
  const defaultFeatured: FeaturedRow = { image: "", logo: "", link: "", title_fr: "", title_en: "", desc_fr: "", desc_en: "", sort_order: 0 };
  return (
    <ListEditor<FeaturedRow>
      password={password} table="a_propos_vedette" title="Projets en vedette" defaultItem={defaultFeatured}
      renderForm={(item, setItem) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={labelStyle}>Image URL <input style={inputStyle} value={item.image} onChange={e => setItem({ ...item, image: e.target.value })} /></label>
          <label style={labelStyle}>Logo <input style={inputStyle} value={item.logo} onChange={e => setItem({ ...item, logo: e.target.value })} /></label>
          <label style={labelStyle}>Lien (nom) <input style={inputStyle} value={item.link} onChange={e => setItem({ ...item, link: e.target.value })} /></label>
          {frEnInputs("title", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          {frEnTextareas("desc", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          <label style={labelStyle}>Ordre <input type="number" style={inputStyle} value={item.sort_order} onChange={e => setItem({ ...item, sort_order: Number(e.target.value) })} /></label>
        </div>
      )}
      renderPreview={item => (
        <div>
          <strong style={{ color: "#fff" }}>{item.title_fr || "(sans titre)"}</strong>
          <span style={{ ...badgeStyle, marginLeft: 12 }}>{item.link}</span>
        </div>
      )}
    />
  );
}

type ExperienceRow = { id?: string; type: string; title_fr: string; title_en: string; date_fr: string; date_en: string; desc_fr: string; desc_en: string; logo: string; sort_order: number };

function ExperienceEditor({ password }: { readonly password: string }) {
  const defaultExp: ExperienceRow = { type: "experience", title_fr: "", title_en: "", date_fr: "", date_en: "", desc_fr: "", desc_en: "", logo: "", sort_order: 0 };
  return (
    <ListEditor<ExperienceRow>
      password={password} table="parcours_experience" title="Experiences & Formations" defaultItem={defaultExp}
      renderForm={(item, setItem) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={labelStyle}>
            Type
            <select style={inputStyle} value={item.type} onChange={e => setItem({ ...item, type: e.target.value })}>
              <option value="experience">Experience</option>
              <option value="education">Formation</option>
            </select>
          </label>
          {frEnInputs("title", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          {frEnInputs("date", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          {frEnTextareas("desc", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          <label style={labelStyle}>Logo (chemin) <input style={inputStyle} value={item.logo} onChange={e => setItem({ ...item, logo: e.target.value })} /></label>
          <label style={labelStyle}>Ordre <input type="number" style={inputStyle} value={item.sort_order} onChange={e => setItem({ ...item, sort_order: Number(e.target.value) })} /></label>
        </div>
      )}
      renderPreview={item => (
        <div>
          <span style={{ ...badgeStyle, background: item.type === "education" ? "rgba(52,152,219,0.2)" : "rgba(46,204,113,0.2)", color: item.type === "education" ? "#3498db" : "#2ecc71" }}>
            {item.type === "education" ? "Formation" : "Experience"}
          </span>
          <strong style={{ color: "#fff", marginLeft: 8 }}>{item.title_fr || "(sans titre)"}</strong>
          <span style={{ color: "var(--light-gray-70)", marginLeft: 8, fontSize: 13 }}>{item.date_fr}</span>
        </div>
      )}
    />
  );
}

type SoftwareRow = { id?: string; name: string; logo: string; sort_order: number };

function SoftwareEditor({ password }: { readonly password: string }) {
  const defaultSw: SoftwareRow = { name: "", logo: "", sort_order: 0 };
  return (
    <ListEditor<SoftwareRow>
      password={password} table="parcours_logiciel" title="Logiciels" defaultItem={defaultSw}
      renderForm={(item, setItem) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={labelStyle}>Nom <input style={inputStyle} value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} /></label>
          <label style={labelStyle}>Logo (chemin) <input style={inputStyle} value={item.logo} onChange={e => setItem({ ...item, logo: e.target.value })} /></label>
          <label style={labelStyle}>Ordre <input type="number" style={inputStyle} value={item.sort_order} onChange={e => setItem({ ...item, sort_order: Number(e.target.value) })} /></label>
        </div>
      )}
      renderPreview={item => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {item.logo && <img src={item.logo} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />}
          <strong style={{ color: "#fff" }}>{item.name || "(sans nom)"}</strong>
        </div>
      )}
    />
  );
}

type ProjectRow = { id?: string; img: string; logo: string; link: string; title_fr: string; title_en: string; category_fr: string; category_en: string; desc_fr: string; desc_en: string; sort_order: number };

function ProjectsEditor({ password }: { readonly password: string }) {
  const defaultProj: ProjectRow = { img: "", logo: "", link: "https://github.com/frarthur", title_fr: "", title_en: "", category_fr: "", category_en: "", desc_fr: "", desc_en: "", sort_order: 0 };
  return (
    <ListEditor<ProjectRow>
      password={password} table="projets" title="Projets" defaultItem={defaultProj}
      renderForm={(item, setItem) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={labelStyle}>Image URL <input style={inputStyle} value={item.img} onChange={e => setItem({ ...item, img: e.target.value })} /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={labelStyle}>Logo <input style={inputStyle} value={item.logo} onChange={e => setItem({ ...item, logo: e.target.value })} /></label>
            <label style={labelStyle}>Lien <input style={inputStyle} value={item.link} onChange={e => setItem({ ...item, link: e.target.value })} /></label>
          </div>
          {frEnInputs("title", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          {frEnInputs("category", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          {frEnTextareas("desc", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          <label style={labelStyle}>Ordre <input type="number" style={inputStyle} value={item.sort_order} onChange={e => setItem({ ...item, sort_order: Number(e.target.value) })} /></label>
        </div>
      )}
      renderPreview={item => (
        <div>
          <strong style={{ color: "#fff" }}>{item.title_fr || "(sans titre)"}</strong>
          <span style={{ ...badgeStyle, marginLeft: 12 }}>{item.category_fr}</span>
        </div>
      )}
    />
  );
}

type ContactRow = Record<string, string>;

function ContactEditor({ password }: { readonly password: string }) {
  const api = useAdminApi<ContactRow[]>(password);
  const apiSave = useAdminApi<ContactRow>(password);
  const [data, setData] = useState<ContactRow>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api("contact", "select").then(rows => {
      if (rows && rows.length > 0) { setData(rows[0]); setLoaded(true); }
    });
  }, [api]);

  const onChange = (key: string, value: string) => setData(prev => ({ ...prev, [key]: value }));
  const handleSave = async () => { await apiSave("contact", "upsert", { data }); alert("Enregistre !"); };

  if (!loaded) return <p style={{ color: "var(--light-gray-70)" }}>Chargement...</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={sectionTitle}>Contact</h2>
        <button onClick={handleSave} style={btnPrimary}>Enregistrer</button>
      </div>
      <div style={cardStyle}>
        <h3 style={{ color: "#fff", marginBottom: 12, fontSize: 15 }}>Labels</h3>
        {frEnInputs("contact_title", data, onChange)}
        <div style={{ height: 12 }} />
        {frEnInputs("contact_details", data, onChange)}
        {frEnInputs("contact_mobile", data, onChange)}
        {frEnInputs("contact_form_title", data, onChange)}
        {frEnInputs("contact_name", data, onChange)}
        {frEnInputs("contact_email", data, onChange)}
        {frEnInputs("contact_msg", data, onChange)}
        {frEnInputs("contact_send", data, onChange)}
        {frEnInputs("contact_sent", data, onChange)}
        {frEnInputs("show_contacts", data, onChange)}
        {frEnInputs("footer", data, onChange)}

        <h3 style={{ color: "#fff", marginTop: 24, marginBottom: 12, fontSize: 15 }}>Coordonnees</h3>
        {frEnInputs("phone", data, onChange)}
        <div style={{ height: 12 }} />
        <label style={labelStyle}>Email <input style={inputStyle} value={data.email ?? ""} onChange={e => onChange("email", e.target.value)} /></label>
        <div style={{ height: 12 }} />
        {frEnInputs("location", data, onChange)}
        <div style={{ height: 12 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={labelStyle}>LinkedIn URL <input style={inputStyle} value={data.linkedin_url ?? ""} onChange={e => onChange("linkedin_url", e.target.value)} /></label>
          <label style={labelStyle}>GitHub URL <input style={inputStyle} value={data.github_url ?? ""} onChange={e => onChange("github_url", e.target.value)} /></label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={labelStyle}>CV PDF URL <input style={inputStyle} value={data.cv_pdf_url ?? ""} onChange={e => onChange("cv_pdf_url", e.target.value)} /></label>
          <label style={labelStyle}>Photo profil URL <input style={inputStyle} value={data.profile_photo_url ?? ""} onChange={e => onChange("profile_photo_url", e.target.value)} /></label>
        </div>
      </div>
    </div>
  );
}

type GalleryRow = { id?: string; img: string; title_fr: string; title_en: string; desc_fr: string; desc_en: string; sort_order: number };

function GalleryEditor({ password }: { readonly password: string }) {
  const defaultGal: GalleryRow = { img: "", title_fr: "", title_en: "", desc_fr: "", desc_en: "", sort_order: 0 };
  return (
    <ListEditor<GalleryRow>
      password={password} table="galerie" title="Galerie" defaultItem={defaultGal}
      renderForm={(item, setItem) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={labelStyle}>Image URL <input style={inputStyle} value={item.img} onChange={e => setItem({ ...item, img: e.target.value })} /></label>
          {item.img && <img src={item.img} alt="" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }} />}
          {frEnInputs("title", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          {frEnInputs("desc", item as unknown as Record<string, string>, (k, v) => setItem({ ...item, [k]: v }))}
          <label style={labelStyle}>Ordre <input type="number" style={inputStyle} value={item.sort_order} onChange={e => setItem({ ...item, sort_order: Number(e.target.value) })} /></label>
        </div>
      )}
      renderPreview={item => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {item.img && <img src={item.img} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />}
          <div>
            <strong style={{ color: "#fff" }}>{item.title_fr || "(sans titre)"}</strong>
            <p style={{ color: "var(--light-gray-70)", fontSize: 12, margin: "2px 0 0" }}>{item.desc_fr}</p>
          </div>
        </div>
      )}
    />
  );
}

function PasswordEditor({ password }: { readonly password: string }) {
  const api = useAdminApi<{ updated: boolean }>(password);
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChange = async () => {
    if (!newPw || newPw.length < 4) { alert("4 caracteres minimum"); return; }
    if (newPw !== confirm) { alert("Les mots de passe ne correspondent pas"); return; }
    await api("settings", "update_password", { data: { new_password: newPw } });
    alert("Mot de passe modifie !");
    sessionStorage.removeItem("admin_pw");
    window.location.reload();
  };

  return (
    <div>
      <h2 style={sectionTitle}>Changer le mot de passe</h2>
      <div style={{ ...cardStyle, maxWidth: 500 }}>
        <label style={labelStyle}>
          Nouveau mot de passe
          <input type="password" style={inputStyle} value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min. 4 caracteres" />
        </label>
        <div style={{ height: 16 }} />
        <label style={labelStyle}>
          Confirmer
          <input type="password" style={inputStyle} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirmer le mot de passe" />
        </label>
        <button onClick={handleChange} style={{ ...btnPrimary, marginTop: 20 }}>Changer le mot de passe</button>
      </div>
    </div>
  );
}
