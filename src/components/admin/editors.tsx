"use client";

import { useEffect, useState } from "react";
import ListEditor from "./list-editor";
import { frEnInputs, frEnTextareas } from "./form-fields";
import { useAdminApi } from "./use-admin-api";
import { badgeStyle, btnPrimary, cardStyle, inputStyle, labelStyle, sectionTitle } from "./styles";

function SingleRowEditor({ password, table, title, renderFields }: {
  readonly password: string;
  readonly table: string;
  readonly title: string;
  readonly renderFields: (data: Record<string, string>, onChange: (key: string, value: string) => void) => React.ReactNode;
}) {
  const api = useAdminApi<Record<string, string>[]>(password);
  const apiSave = useAdminApi<Record<string, string>>(password);
  const [data, setData] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api(table, "select").then(rows => {
      if (rows && rows.length > 0) { setData(rows[0]); setLoaded(true); }
    });
  }, [api, table]);

  const onChange = (key: string, value: string) => setData(prev => ({ ...prev, [key]: value }));
  const handleSave = async () => { await apiSave(table, "upsert", { data }); alert("Enregistre !"); };

  if (!loaded) return <p style={{ color: "var(--light-gray-70)" }}>Chargement...</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={sectionTitle}>{title}</h2>
        <button onClick={handleSave} style={btnPrimary}>Enregistrer</button>
      </div>
      <div style={cardStyle}>{renderFields(data, onChange)}</div>
    </div>
  );
}

export function AboutEditor({ password }: { readonly password: string }) {
  return (
    <SingleRowEditor password={password} table="a_propos" title="A propos" renderFields={(data, onChange) => (
      <>
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
      </>
    )} />
  );
}

export function ParcoursLabelsEditor({ password }: { readonly password: string }) {
  return (
    <SingleRowEditor password={password} table="parcours" title="Labels Parcours" renderFields={(data, onChange) => (
      <>
        {frEnInputs("resume_title", data, onChange)}
        <div style={{ height: 16 }} />
        {frEnInputs("experience_label", data, onChange)}
        {frEnInputs("education_label", data, onChange)}
        {frEnInputs("skills_label", data, onChange)}
        {frEnInputs("frameworks_label", data, onChange)}
        {frEnInputs("software_label", data, onChange)}
        {frEnInputs("infra_label", data, onChange)}
      </>
    )} />
  );
}

type FeaturedRow = { id?: string; image: string; logo: string; link: string; link_url: string; title_fr: string; title_en: string; desc_fr: string; desc_en: string; sort_order: number };

export function FeaturedEditor({ password }: { readonly password: string }) {
  const defaultFeatured: FeaturedRow = { image: "", logo: "", link: "", link_url: "https://github.com/frarthur", title_fr: "", title_en: "", desc_fr: "", desc_en: "", sort_order: 0 };
  return (
    <ListEditor<FeaturedRow>
      password={password} table="a_propos_vedette" title="Projets en vedette" defaultItem={defaultFeatured}
      renderForm={(item, setItem) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={labelStyle}>Image URL <input style={inputStyle} value={item.image} onChange={e => setItem({ ...item, image: e.target.value })} /></label>
          <label style={labelStyle}>Logo <input style={inputStyle} value={item.logo} onChange={e => setItem({ ...item, logo: e.target.value })} /></label>
          <label style={labelStyle}>Lien (nom) <input style={inputStyle} value={item.link} onChange={e => setItem({ ...item, link: e.target.value })} /></label>
          <label style={labelStyle}>Lien URL <input style={inputStyle} value={item.link_url} onChange={e => setItem({ ...item, link_url: e.target.value })} /></label>
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

export function ExperienceEditor({ password }: { readonly password: string }) {
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

export function SoftwareEditor({ password }: { readonly password: string }) {
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

export function ProjectsEditor({ password }: { readonly password: string }) {
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

export function ContactEditor({ password }: { readonly password: string }) {
  return (
    <SingleRowEditor password={password} table="contact" title="Contact" renderFields={(data, onChange) => (
      <>
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
          <label style={labelStyle}>Portfolio PDF URL <input style={inputStyle} value={data.cv_pdf_url ?? ""} onChange={e => onChange("cv_pdf_url", e.target.value)} /></label>
          <label style={labelStyle}>Photo profil URL <input style={inputStyle} value={data.profile_photo_url ?? ""} onChange={e => onChange("profile_photo_url", e.target.value)} /></label>
        </div>
      </>
    )} />
  );
}

type GalleryRow = { id?: string; img: string; title_fr: string; title_en: string; desc_fr: string; desc_en: string; sort_order: number };

export function GalleryEditor({ password }: { readonly password: string }) {
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

export function PasswordEditor({ password }: { readonly password: string }) {
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
