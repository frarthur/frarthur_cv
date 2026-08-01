"use client";

import { GitHubIcon, LinkedInIcon, PortfolioIcon } from "./icons";
import IonIcon from "./ion-icon";
import { iconBoxEl } from "./ui";
import { t } from "@/lib/i18n";
import type { ContactInfo, ContactLabels, Lang } from "@/lib/types";

interface SidebarProps {
  readonly lang: Lang;
  readonly sidebarOpen: boolean;
  readonly setSidebarOpen: (v: boolean) => void;
  readonly contactInfo: ContactInfo | null;
  readonly contactLabels: ContactLabels | null;
}

export default function Sidebar({ lang, sidebarOpen, setSidebarOpen, contactInfo, contactLabels }: SidebarProps) {
  const _ = t(lang);
  const c = contactInfo;
  const showContactsText = contactLabels ? _(contactLabels.showContacts) : "Contacts";

  return (
    <aside className={`sidebar${sidebarOpen ? " active" : ""}`} data-sidebar>
      <div className="sidebar-info">
        <a href={c?.linkedin_url ?? "#"} target="_blank" className="avatar-box">
          <figure><img src={c?.profile_photo_url ?? "/img/divers/photo_profil.png"} alt="Voir mon profil LinkedIn" /></figure>
        </a>
        <div className="info-content courgette-head">
          <h1 className="name" title="Arthur Fresse">Arthur Fresse</h1>
          <p className="title">Ingenieur Generaliste</p>
        </div>
        <button className="info_more-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span>{showContactsText}</span><IonIcon name="chevron-down" />
        </button>
      </div>
      <div className="sidebar-info_more">
        <div className="separator"></div>
        <ul className="contacts-list">
          <li className="contact-item">{iconBoxEl("mail-outline")}<div className="contact-info"><p className="contact-title">Email</p><a href={`mailto:${c?.email ?? ""}`} className="contact-link">{c?.email ?? ""}</a></div></li>
          <li className="contact-item">{iconBoxEl("location-outline")}<div className="contact-info"><p className="contact-title">Location</p><address className="contact-text">{c ? _(c.location) : ""}</address></div></li>
        </ul>
        <div className="separator"></div>
        <ul className="social-list">
          <li className="social-item"><a href={c?.linkedin_url ?? "#"} className="social-link" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a></li>
          <li className="social-item"><a href={c?.github_url ?? "#"} className="social-link" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a></li>
          <li className="social-item"><a href={c?.cv_pdf_url ?? "#"} className="social-link" target="_blank" rel="noopener noreferrer"><PortfolioIcon /></a></li>
        </ul>
      </div>
    </aside>
  );
}
