"use client";

import { useState, useEffect, useMemo } from "react";
import IonIcon from "./ion-icon";
import {
  fetchAbout, fetchAboutFeatured, fetchParcoursLabels,
  fetchExperiences, fetchEducations, fetchSoftware,
  fetchProjects, fetchContact, fetchGallery,
} from "../lib/supabase";

function AiTools({ lang, markdownContent }: { readonly lang: Lang; readonly markdownContent: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const cvFile = lang === "fr" ? "cv_fresse_arthur_fr.pdf" : "cv_fresse_arthur_en.pdf";
  const shortPrompt = `Analyze this CV: https://frarthur.github.io/${cvFile}`;
  const chatGptUrl = `https://chatgpt.com/?hint=search&q=${encodeURIComponent(shortPrompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(shortPrompt)}`;

  return (
    <div className="ai-tools-float">
      <button className="ai-tools-btn" onClick={handleCopy}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
        {copied ? "Copied!" : "Copy as Markdown"}
      </button>
      <a href={chatGptUrl} target="_blank" rel="noreferrer noopener" className="ai-tools-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20.5647 10.1815C21.0185 8.8202 20.8627 7.3302 20.138 6.09079C19.0476 4.19442 16.8532 3.21915 14.713 3.67292C13.7581 2.60283 12.39 1.99328 10.9542 2.00006C8.76659 2.00006 6.82281 3.40879 6.14554 5.48801C4.73681 5.77924 3.52449 6.6597 2.81335 7.90588C1.71617 9.80225 1.96676 12.1863 3.43644 13.8117C2.98267 15.173 3.13844 16.663 3.86312 17.8957C4.95354 19.7988 7.1479 20.7741 9.29486 20.3203C10.243 21.3904 11.6111 22.0067 13.047 21.9999C15.2345 21.9999 17.1783 20.5912 17.8556 18.512C19.2643 18.2208 20.4766 17.3403 21.181 16.0941C22.285 14.1978 22.0344 11.8138 20.5647 10.1883V10.1815ZM19.007 6.74774C19.4404 7.50629 19.603 8.39352 19.454 9.25366C19.4269 9.23334 19.3727 9.20625 19.3388 9.18593L15.3565 6.8832C15.1533 6.76806 14.9027 6.76806 14.6995 6.8832L10.0331 9.57875V7.60111L13.8868 5.37288C15.6815 4.33665 17.9707 4.95297 19.007 6.74774ZM10.0331 10.8588L11.9972 9.72097L13.9613 10.8588V13.1277L11.9972 14.2655L10.0331 13.1277V10.8588ZM10.9474 3.30719C11.8279 3.30719 12.6745 3.61197 13.3517 4.1741C13.3246 4.18765 13.2705 4.22151 13.2298 4.24183L9.24745 6.53779C9.04427 6.65293 8.92236 6.86965 8.92236 7.1067V12.4978L7.20886 11.509V7.05252C7.20886 4.98006 8.88172 3.30719 10.9542 3.30042L10.9474 3.30719ZM3.95117 8.56284C4.3914 7.80429 5.07544 7.22184 5.90172 6.91706V11.6512C5.90172 11.8883 6.02363 12.0982 6.22681 12.2201L10.8865 14.9089L9.16618 15.9045L5.31926 13.683C3.53126 12.6468 2.91494 10.3576 3.95117 8.56284ZM5.00094 17.2523C4.56072 16.5005 4.40494 15.6065 4.55394 14.7463C4.58103 14.7667 4.63522 14.7938 4.66908 14.8141L8.65145 17.1168C8.85463 17.2319 9.10522 17.2319 9.3084 17.1168L13.968 14.4213V16.3989L10.1144 18.6204C8.31958 19.6498 6.0304 19.0403 4.99417 17.2523H5.00094ZM13.0537 20.6928C12.18 20.6928 11.3267 20.388 10.6562 19.8259C10.6833 19.8124 10.7442 19.7785 10.7781 19.7582L14.7605 17.4622C14.9636 17.3471 15.0923 17.1303 15.0855 16.8933V11.509L16.799 12.4978V16.9475C16.799 19.0199 15.1194 20.6996 13.0537 20.6996V20.6928ZM20.0567 15.4372C19.6165 14.6866 18.9325 14.1108 18.0995 13.806V9.06496C18.0995 8.83465 17.9844 8.61804 17.7812 8.49653L13.1283 5.80775L14.8485 4.80537L18.6887 7.03378C20.4835 8.07001 21.0998 10.3523 20.0635 12.147L20.0567 15.4372Z" fill="currentColor"/></svg>
        Ask ChatGPT
      </a>
      <a href={claudeUrl} target="_blank" rel="noreferrer noopener" className="ai-tools-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5.92381 15.2988L9.85798 13.0912L9.92381 12.8988L9.85798 12.7924H9.66558L9.00735 12.7519L6.75925 12.6912L4.80988 12.6102L2.92127 12.5089L2.44533 12.4076L1.99976 11.8203L2.04533 11.5266L2.44533 11.2583L3.01748 11.3089L4.2833 11.395L6.18203 11.5266L7.55925 11.6076L9.59976 11.8203H9.92381L9.96938 11.6886L9.85798 11.6076L9.77191 11.5266L7.80735 10.195L5.68077 8.78737L4.56684 7.97724L3.96431 7.56711L3.66052 7.1823L3.52887 6.3418L4.07571 5.73927L4.80988 5.7899L4.99722 5.84053L5.74153 6.41268L7.3314 7.64306L9.40735 9.17218L9.71115 9.42534L9.83267 9.33927L9.84786 9.27851L9.71115 9.05066L8.58203 7.01015L7.37697 4.9342L6.84026 4.07344L6.69849 3.55699C6.64786 3.34433 6.61241 3.16712 6.61241 2.94939L7.2352 2.10382L7.5795 1.99243L8.40988 2.10382L8.75925 2.40762L9.27571 3.58737L10.1111 5.4456L11.4074 7.97218L11.7871 8.72154L11.9896 9.41522L12.0656 9.62787H12.1972V9.50635L12.3036 8.08357L12.501 6.33673L12.6934 4.08863L12.7592 3.45572L13.0732 2.69623L13.696 2.2861L14.182 2.51901L14.582 3.09117L14.5263 3.46079L14.2884 5.00509L13.8225 7.42534L13.5187 9.0456H13.696L13.8985 8.84306L14.7187 7.75446L16.096 6.03294L16.7036 5.34939L17.4124 4.59496L17.8681 4.23547H18.7289L19.3618 5.17724L19.0782 6.14939L18.1922 7.27344L17.458 8.22534L16.4048 9.64306L15.7466 10.7772L15.8074 10.8684L15.9643 10.8532L18.3441 10.3469L19.6301 10.114L21.1643 9.85066L21.858 10.1747L21.9339 10.5038L21.6605 11.1772L20.02 11.5823L18.096 11.9671L15.2301 12.6456L15.1947 12.6709L15.2352 12.7215L16.5263 12.8431L17.0782 12.8734H18.4301L20.9466 13.0608L21.6048 13.4962L21.9998 14.0279L21.9339 14.4329L20.9213 14.9494L19.5542 14.6253L16.3643 13.8658L15.2706 13.5924H15.1187V13.6836L16.0301 14.5747L17.701 16.0836L19.7922 18.0279L19.8985 18.5089L19.6301 18.8886L19.3466 18.8481L17.5086 17.4658L16.7998 16.8431L15.1947 15.4912H15.0884V15.6329L15.458 16.1747L17.4124 19.1114L17.5137 20.0127L17.3719 20.3064L16.8656 20.4836L16.3086 20.3823L15.1643 18.7772L13.9846 16.9696L13.0327 15.3494L12.9162 15.4152L12.3542 21.4658L12.3289 21.7899L12.8342 22.2861L13.6025 22.1041L15.0189 19.3545L15.6352 18.2542L15.6656 18.2643L15.5744 19.8919L15.539 21.3187L15.68 22.4937L16.0092 22.6952L16.8828 22.3679L16.8023 21.4133L15.4521 16.5354L15.3257 15.907L15.5088 15.7196L19.5103 11.7519L22.1291 9.22717L23.1124 8.35791L23.7795 8.00934L24 7.55456L23.9012 6.95425L23.4457 6.74666L22.5942 6.7669L21.3334 7.1043" fill="currentColor"/></svg>
        Ask Claude
      </a>
    </div>
  );
}

type Lang = "fr" | "en";

/* ========== TYPES ========== */

interface Bilingual { fr: string; en: string; }
interface FeaturedItem { image: string; logo: string; link: string; linkUrl: string; title: Bilingual; desc: Bilingual; }
interface TimelineItem { logo: string | null; title: Bilingual; date: Bilingual; desc: Bilingual; }
interface SoftwareItem { name: string; logo: string; }
interface ProjectItem { img: string; logo: string; link: string; title: Bilingual; category: Bilingual; text: Bilingual; }
interface GalleryItem { img: string; title: Bilingual; desc: Bilingual; }

interface ContactInfo {
  phone: Bilingual;
  email: string;
  location: Bilingual;
  linkedin_url: string;
  github_url: string;
  cv_pdf_url: string;
  profile_photo_url: string;
}

interface AboutLabels {
  aboutTitle: Bilingual;
  aboutP1: Bilingual;
  aboutP2: Bilingual;
  highlightsTitle: Bilingual;
  hlCompleted: Bilingual;
  hlInProgress: Bilingual;
  hlMaintained: Bilingual;
  featuredTitle: Bilingual;
}

interface ParcoursLabels {
  resumeTitle: Bilingual;
  experienceLabel: Bilingual;
  educationLabel: Bilingual;
  skillsLabel: Bilingual;
  frameworksLabel: Bilingual;
  softwareLabel: Bilingual;
  infraLabelFR: string;
  infraLabelEN: string;
}

interface ContactLabels {
  contactTitle: Bilingual;
  contactDetails: Bilingual;
  contactMobile: Bilingual;
  contactFormTitle: Bilingual;
  contactName: Bilingual;
  contactEmail: Bilingual;
  contactMsg: Bilingual;
  contactSend: Bilingual;
  contactSent: Bilingual;
  showContacts: Bilingual;
  footer: Bilingual;
}

/* ========== CONSTANTS ========== */

interface GitHubLang { name: string; pct: number; logo: string; }
interface FrameworkStat { name: string; count: number; pct: number; logo: string; }

const DEFAULT_LANGS: GitHubLang[] = [
  { name: "Python", pct: 35, logo: "/img/langages/logo_python.png" },
  { name: "JavaScript", pct: 25, logo: "/img/langages/logo_js.png" },
  { name: "Java", pct: 15, logo: "/img/langages/logo_java.png" },
  { name: "C++", pct: 10, logo: "/img/langages/logo_c.png" },
  { name: "HTML/CSS", pct: 15, logo: "/img/langages/logo_htmlcss.png" },
];

const PAGES = ["about", "resume", "portfolio", "contact", "gallery"] as const;
type Page = (typeof PAGES)[number];

const NAV_ITEMS: { page: Page; label: Bilingual }[] = [
  { page: "about", label: { fr: "A propos", en: "About" } },
  { page: "resume", label: { fr: "Parcours", en: "Resume" } },
  { page: "portfolio", label: { fr: "Projets", en: "Portfolio" } },
  { page: "contact", label: { fr: "Contact", en: "Contact" } },
  { page: "gallery", label: { fr: "Galerie", en: "Gallery" } },
];

const PORTFOLIO_TITLE: Bilingual = { fr: "Projets", en: "Creative Showcase" };
const GALLERY_TITLE: Bilingual = { fr: "Explorations", en: "Explorations" };

/* ========== HELPERS ========== */

function dbToBilingual(fr: string, en: string): Bilingual { return { fr, en }; }
const t = (lang: Lang) => (obj: Bilingual) => obj[lang];
const iconBoxEl = (name: string) => <div className="icon-box"><IonIcon name={name} /></div>;
const badgeStyle = { color: "var(--white-1)", background: "var(--onyx)", fontSize: "var(--fs-7)", fontWeight: 300 as const, padding: "5px 12px", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 };
const logoSm = (src: string) => <img src={src} alt="" style={{ width: 18, height: 18, objectFit: "contain" as const, display: "inline" }} />;

/* ========== SUB-COMPONENTS ========== */

function Sidebar({ lang, sidebarOpen, setSidebarOpen, contactInfo, contactLabels }: {
  readonly lang: Lang; readonly sidebarOpen: boolean; readonly setSidebarOpen: (v: boolean) => void;
  readonly contactInfo: ContactInfo | null; readonly contactLabels: ContactLabels | null;
}) {
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
          {[
            { h: c?.linkedin_url ?? "#", t: "LinkedIn", p: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", vb: "0 0 24 24" },
            { h: c?.github_url ?? "#", t: "GitHub", p: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z", vb: "0 0 16 16" },
            { h: c?.cv_pdf_url ?? "#", t: "CV", p: "M4 0a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V5.5L10.5 0H4zm6.5 1.5L13 5h-2a.5.5 0 0 1-.5-.5V1.5zM4 6h8v1H4V6zm0 2h8v1H4V8zm0 2h5v1H4v-1z", vb: "0 0 16 16" },
          ].map(s => (<li key={s.t} className="social-item"><a href={s.h} className="social-link" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox={s.vb}><title>{s.t}</title><path d={s.p}/></svg></a></li>))}
        </ul>
      </div>
    </aside>
  );
}

function Navbar({ lang, activePage, setActivePage, setLang }: {
  readonly lang: Lang; readonly activePage: Page; readonly setActivePage: (p: Page) => void; readonly setLang: (l: Lang) => void;
}) {
  const _ = t(lang);
  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");
  const flagSrc = lang === "fr" ? "/img/divers/United_Kingdom.png" : "/img/divers/France.png";
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {NAV_ITEMS.map(({ page, label }) => (
          <li className="navbar-item" key={page}><button className={`navbar-link${activePage === page ? " active" : ""}`} onClick={() => setActivePage(page)}>{_(label)}</button></li>
        ))}
        <li className="navbar-item">
          <button className="navbar-link" onClick={toggleLang} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <img src={flagSrc} alt={lang === "fr" ? "EN" : "FR"} style={{ width: 18, height: 12, borderRadius: 2, display: "inline" }} />{lang === "fr" ? "EN" : "FR"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function AboutSection({ lang, activePage, topics, aboutLabels, featuredItems }: {
  readonly lang: Lang; readonly activePage: Page; readonly topics: Record<string, number>;
  readonly aboutLabels: AboutLabels | null; readonly featuredItems: FeaturedItem[];
}) {
  const _ = t(lang);
  const al = aboutLabels;
  return (
    <article className={`about${activePage === "about" ? " active" : ""}`} data-page="about">
      <header><h2 className="h2 article-title">{al ? _(al.aboutTitle) : ""}</h2></header>
      <section className="about-text"><p>{al ? _(al.aboutP1) : ""}</p><p>{al ? _(al.aboutP2) : ""}</p></section>
      <section className="highlights">
        <h3 className="h3 highlights-title"><IonIcon name="star-outline" />{al ? _(al.highlightsTitle) : ""}</h3>
        <ul className="highlights-list has-scrollbar">
          {([
            { n: `+${topics["completed"] || 0}`, key: "completed", label: al ? al.hlCompleted : { fr: "PROJETS FINIS", en: "COMPLETED PROJECTS" } },
            { n: `+${topics["in-progress"] || 0}`, key: "in-progress", label: al ? al.hlInProgress : { fr: "PROJETS EN COURS", en: "PROJECTS IN PROGRESS" } },
            { n: `+${topics["maintenance"] || 0}`, key: "maintenance", label: al ? al.hlMaintained : { fr: "PROJETS MAINTENUS", en: "MAINTAINED PROJECTS" } },
          ]).map(item => (
            <li key={item.key} className="highlights-item"><h2 className="h2 service-item-title">{item.n}</h2><p className="service-item-text">{_(item.label)}</p></li>
          ))}
        </ul>
      </section>
      {featuredItems.length > 0 && (
        <section className="showcase-posts">
          <div className="showcase-header"><h3 className="h3 showcase-title"><IonIcon name="folder-open-outline" />{al ? _(al.featuredTitle) : ""}</h3></div>
          <ul className="showcase-posts-list">
            {featuredItems.map(p => (
              <li key={p.link} className="showcase-post-item">
                <a href={p.linkUrl} target="_blank" rel="noopener noreferrer">
                  <figure className="showcase-banner-box">{p.image ? <img src={p.image} alt="" /> : null}</figure>
                  <div className="showcase-content">
                    <div className="showcase-meta">{logoSm(p.logo)}<span className="showcase-link">{p.link}</span></div>
                    <h3 className="h3 showcase-item-title">{_(p.title)}</h3>
                    <p className="showcase-text">{_(p.desc)}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

function ResumeSection({ lang, activePage, gitHubLangs, frameworks, infra, experiences, educations, software, parcoursLabels }: {
  readonly lang: Lang; readonly activePage: Page;
  readonly gitHubLangs: GitHubLang[]; readonly frameworks: FrameworkStat[]; readonly infra: string[];
  readonly experiences: TimelineItem[]; readonly educations: TimelineItem[]; readonly software: SoftwareItem[];
  readonly parcoursLabels: ParcoursLabels | null;
}) {
  const _ = t(lang); const pl = parcoursLabels;
  const defaultFrameworks: FrameworkStat[] = [
    { name: "Next.js", count: 0, pct: 0, logo: "/img/frameworks/logo_nextjs.png" },
    { name: "Flutter", count: 0, pct: 0, logo: "/img/frameworks/logo_flutter.png" },
    { name: "Node.js", count: 0, pct: 0, logo: "/img/frameworks/logo_nodejs.png" },
    { name: "Vue.js", count: 0, pct: 0, logo: "/img/frameworks/logo_vue.png" },
  ];
  const defaultInfra = ["GitHub Pages", "Vercel", "Netlify", "Supabase", "GitHub Actions", "Docker", "Raspberry Pi", "ESP32", "ESP8266", "Home Assistant", "Linux / SSH"];
  return (
    <article className={`resume${activePage === "resume" ? " active" : ""}`} data-page="resume">
      <header><h2 className="h2 article-title">{pl ? _(pl.resumeTitle) : ""}</h2></header>
      {experiences.length > 0 && (
        <section className="timeline">
          <div className="title-wrapper">{iconBoxEl("briefcase-outline")}<h3 className="h3">{pl ? _(pl.experienceLabel) : ""}</h3></div>
          <ol className="timeline-list">
            {experiences.map(item => (
              <li key={item.title.fr} className="timeline-item">
                <h4 className="h4 timeline-item-title">{item.logo && <img src={item.logo} alt="" style={{ width: 22, height: 22, objectFit: "contain" as const, verticalAlign: "middle", marginRight: 8, display: "inline" }} />}{_(item.title)}</h4>
                <span>{_(item.date)}</span><p className="timeline-text">{_(item.desc)}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      {educations.length > 0 && (
        <section className="timeline">
          <div className="title-wrapper">{iconBoxEl("school-outline")}<h3 className="h3">{pl ? _(pl.educationLabel) : ""}</h3></div>
          <ol className="timeline-list">
            {educations.map(item => (
              <li key={item.title.fr} className="timeline-item">
                <h4 className="h4 timeline-item-title">{item.logo && <img src={item.logo} alt="" style={{ width: 22, height: 22, objectFit: "contain" as const, verticalAlign: "middle", marginRight: 8, display: "inline" }} />}{_(item.title)}</h4>
                <span>{_(item.date)}</span><p className="timeline-text">{_(item.desc)}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      <section className="skill">
        <h3 className="h3 skills-title">{pl ? _(pl.skillsLabel) : ""}</h3>
        <ul className="skills-list content-card">
          {gitHubLangs.map(s => (
            <li key={s.name} className="skills-item">
              <div className="title-wrapper">
                <a href="https://github.com/frarthur" target="_blank" rel="noopener noreferrer" style={{ display: "contents" }}><img src={s.logo} alt="" style={{ width: 30, height: 30, objectFit: "contain" as const, marginRight: 10 }} /></a>
                <h5 className="h5">{s.name}</h5><data value={s.pct}>{s.pct}%</data>
              </div>
              <div className="skill-progress-bg"><div className="skill-progress-fill" style={{ width: `${s.pct}%` }}></div></div>
            </li>
          ))}
        </ul>
        <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 6, textAlign: "center" }}>{lang === "fr" ? "% des projets GitHub par langage" : "% of GitHub projects by language"}</p>
      </section>
      <section className="skill" style={{ marginTop: 30 }}>
        <h3 className="h3 skills-title">{pl ? _(pl.frameworksLabel) : ""}</h3>
        <div className="content-card" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 20 }}>
          {(frameworks.length > 0 ? frameworks : defaultFrameworks).map(fw => (<span key={fw.name} style={badgeStyle}>{logoSm(fw.logo)}{fw.name}</span>))}
        </div>
      </section>
      <section className="skill" style={{ marginTop: 30 }}>
        <h3 className="h3 skills-title">{pl ? (lang === "fr" ? pl.infraLabelFR : pl.infraLabelEN) : ""}</h3>
        <div className="content-card" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 20 }}>
          {(infra.length > 0 ? infra : defaultInfra).map(name => (<span key={name} style={badgeStyle}>🚀 {name}</span>))}
        </div>
      </section>
      {software.length > 0 && (
        <section className="skill" style={{ marginTop: 30 }}>
          <h3 className="h3 skills-title">{pl ? _(pl.softwareLabel) : ""}</h3>
          <div className="content-card" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 20 }}>
            {software.map(sw => (<span key={sw.name} style={badgeStyle}>{logoSm(sw.logo)}{sw.name}</span>))}
          </div>
        </section>
      )}
    </article>
  );
}

function PortfolioSection({ lang, activePage, projects }: { readonly lang: Lang; readonly activePage: Page; readonly projects: ProjectItem[] }) {
  const _ = t(lang);
  return (
    <article className={`portfolio${activePage === "portfolio" ? " active" : ""}`} data-page="portfolio">
      <header><h2 className="h2 article-title">{_(PORTFOLIO_TITLE)}</h2></header>
      {projects.length > 0 && (
        <section className="portfolio-posts">
          <ul className="portfolio-posts-list">
            {projects.map(p => (
              <li key={p.title.fr} className="portfolio-post-item">
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  <figure className="portfolio-banner-box">{p.img ? <img src={p.img} alt={_(p.title)} loading="lazy" /> : null}</figure>
                  <div className="portfolio-content">
                    <div className="portfolio-meta">{logoSm(p.logo)}<span className="portfolio-category">{_(p.category)}</span></div>
                    <h3 className="h3 portfolio-item-title">{_(p.title)}</h3>
                    <p className="portfolio-text">{_(p.text)}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

function ContactSection({ lang, activePage, contactInfo, contactLabels }: {
  readonly lang: Lang; readonly activePage: Page;
  readonly contactInfo: ContactInfo | null; readonly contactLabels: ContactLabels | null;
}) {
  const _ = t(lang); const cl = contactLabels; const c = contactInfo;
  return (
    <article className={`contact${activePage === "contact" ? " active" : ""}`} data-page="contact">
      <header><h2 className="h2 article-title">{cl ? _(cl.contactTitle) : ""}</h2></header>
      <section className="mapbox" data-mapbox><figure><iframe title="Localisation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83974.21371039714!2d2.3522211331609687!3d48.78580251471849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e672f22f8ec7b9%3A0x40b82c3688c9460!2sVitry-sur-Seine%2C%20France!5e0!3m2!1sen!2sfr!4v1700000000000" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></figure></section>
      <section className="contact-details-wrapper">
        <div className="contact-details">
          <h3 className="h3">{cl ? _(cl.contactDetails) : ""}</h3>
          <ul className="contact-info-list">
            <li>{iconBoxEl("phone-portrait-outline")}<div><h5 className="h5">{cl ? _(cl.contactMobile) : ""}</h5><a href="tel:+33652034407" className="contact-text">{c ? _(c.phone) : ""}</a></div></li>
            <li>{iconBoxEl("mail-outline")}<div><h5 className="h5">Email</h5><a href={`mailto:${c?.email ?? ""}`} className="contact-text">{c?.email ?? ""}</a></div></li>
          </ul>
        </div>
      </section>
      <section className="contact-form-wrapper">
        <div className="contact-form-box">
          <h3 className="h3 form-title">{cl ? _(cl.contactFormTitle) : ""}</h3>
          <form className="form contact-form" onSubmit={e => { e.preventDefault(); alert(cl ? _(cl.contactSent) : ""); }}>
            <div className="input-wrapper">
              <input type="text" name="name" className="form-input" placeholder={cl ? _(cl.contactName) : ""} required autoComplete="name" />
              <input type="email" name="email" className="form-input" placeholder={cl ? _(cl.contactEmail) : ""} required autoComplete="email" />
            </div>
            <textarea name="message" className="form-input" placeholder={cl ? _(cl.contactMsg) : ""} required autoComplete="off"></textarea>
            <button className="form-btn" type="submit"><div className="content"><IonIcon name="paper-plane" className="icon" /><span className="btn-label">{cl ? _(cl.contactSend) : ""}</span></div></button>
          </form>
        </div>
      </section>
    </article>
  );
}

function GallerySection({ lang, activePage, galleryItems }: { readonly lang: Lang; readonly activePage: Page; readonly galleryItems: GalleryItem[] }) {
  const _ = t(lang);
  return (
    <article className={`gallery${activePage === "gallery" ? " active" : ""}`} data-page="gallery">
      <header><h2 className="h2 article-title">{_(GALLERY_TITLE)}</h2></header>
      {galleryItems.length > 0 && (
        <section className="container">
          {galleryItems.map(item => (
            <div key={item.title.fr} className="card-wrap">
              <div className="card">
                <div className="card-bg">{item.img ? <img src={item.img} alt={_(item.title)} loading="lazy" /> : null}</div>
                <div className="card-info"><h2>{_(item.title)}</h2><p>{_(item.desc)}</p></div>
              </div>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}

/* ========== MAIN COMPONENT ========== */

export default function HomeClient() {
  const [activePage, setActivePage] = useState<Page>("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const [popupOpen, setPopupOpen] = useState(false);
  const [dbError, setDbError] = useState(false);

  const [gitHubLangs, setGitHubLangs] = useState<GitHubLang[]>(DEFAULT_LANGS);
  const [frameworks, setFrameworks] = useState<FrameworkStat[]>([]);
  const [infra, setInfra] = useState<string[]>([]);
  const [topics, setTopics] = useState<Record<string, number>>({});

  const [aboutLabels, setAboutLabels] = useState<AboutLabels | null>(null);
  const [parcoursLabels, setParcoursLabels] = useState<ParcoursLabels | null>(null);
  const [contactLabels, setContactLabels] = useState<ContactLabels | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [experiences, setExperiences] = useState<TimelineItem[]>([]);
  const [educations, setEducations] = useState<TimelineItem[]>([]);
  const [software, setSoftware] = useState<SoftwareItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  const _ = t(lang);

  useEffect(() => {
    fetch("/api/github-langs").then(r => r.json()).then(data => {
      if (data.langs?.length) setGitHubLangs(data.langs);
      if (data.frameworks?.length) setFrameworks(data.frameworks);
      if (data.infra?.length) setInfra(data.infra);
      if (data.topics) setTopics(data.topics);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    let aboutOk = false;
    let contactOk = false;
    Promise.allSettled([
      fetchAbout().then(data => {
        if (data) {
          aboutOk = true;
          setAboutLabels({
            aboutTitle: dbToBilingual(data.about_title_fr, data.about_title_en),
            aboutP1: dbToBilingual(data.about_p1_fr, data.about_p1_en),
            aboutP2: dbToBilingual(data.about_p2_fr, data.about_p2_en),
            highlightsTitle: dbToBilingual(data.highlights_title_fr, data.highlights_title_en),
            hlCompleted: dbToBilingual(data.hl_completed_fr, data.hl_completed_en),
            hlInProgress: dbToBilingual(data.hl_in_progress_fr, data.hl_in_progress_en),
            hlMaintained: dbToBilingual(data.hl_maintained_fr, data.hl_maintained_en),
            featuredTitle: dbToBilingual(data.featured_title_fr, data.featured_title_en),
          });
        }
      }),
      fetchAboutFeatured().then(data => {
        if (data?.length) setFeaturedItems(data.map(d => ({
          image: d.image, logo: d.logo, link: d.link, linkUrl: d.link_url || "https://github.com/frarthur",
          title: dbToBilingual(d.title_fr, d.title_en), desc: dbToBilingual(d.desc_fr, d.desc_en),
        })));
      }),
      fetchParcoursLabels().then(data => {
        if (data) setParcoursLabels({
          resumeTitle: dbToBilingual(data.resume_title_fr, data.resume_title_en),
          experienceLabel: dbToBilingual(data.experience_label_fr, data.experience_label_en),
          educationLabel: dbToBilingual(data.education_label_fr, data.education_label_en),
          skillsLabel: dbToBilingual(data.skills_label_fr, data.skills_label_en),
          frameworksLabel: dbToBilingual(data.frameworks_label_fr, data.frameworks_label_en),
          softwareLabel: dbToBilingual(data.software_label_fr, data.software_label_en),
          infraLabelFR: data.infra_label_fr, infraLabelEN: data.infra_label_en,
        });
      }),
      fetchExperiences().then(data => {
        if (data?.length) setExperiences(data.map(d => ({
          logo: d.logo || null, title: dbToBilingual(d.title_fr, d.title_en), date: dbToBilingual(d.date_fr, d.date_en), desc: dbToBilingual(d.desc_fr, d.desc_en),
        })));
      }),
      fetchEducations().then(data => {
        if (data?.length) setEducations(data.map(d => ({
          logo: d.logo || null, title: dbToBilingual(d.title_fr, d.title_en), date: dbToBilingual(d.date_fr, d.date_en), desc: dbToBilingual(d.desc_fr, d.desc_en),
        })));
      }),
      fetchSoftware().then(data => {
        if (data?.length) setSoftware(data.map(d => ({ name: d.name, logo: d.logo })));
      }),
      fetchProjects().then(data => {
        if (data?.length) setProjects(data.map(d => ({
          img: d.img, logo: d.logo, link: d.link,
          title: dbToBilingual(d.title_fr, d.title_en), category: dbToBilingual(d.category_fr, d.category_en), text: dbToBilingual(d.desc_fr, d.desc_en),
        })));
      }),
      fetchContact().then(data => {
        if (data) {
          contactOk = true;
          setContactLabels({
            contactTitle: dbToBilingual(data.contact_title_fr, data.contact_title_en),
            contactDetails: dbToBilingual(data.contact_details_fr, data.contact_details_en),
            contactMobile: dbToBilingual(data.contact_mobile_fr, data.contact_mobile_en),
            contactFormTitle: dbToBilingual(data.contact_form_title_fr, data.contact_form_title_en),
            contactName: dbToBilingual(data.contact_name_fr, data.contact_name_en),
            contactEmail: dbToBilingual(data.contact_email_fr, data.contact_email_en),
            contactMsg: dbToBilingual(data.contact_msg_fr, data.contact_msg_en),
            contactSend: dbToBilingual(data.contact_send_fr, data.contact_send_en),
            contactSent: dbToBilingual(data.contact_sent_fr, data.contact_sent_en),
            showContacts: dbToBilingual(data.show_contacts_fr, data.show_contacts_en),
            footer: dbToBilingual(data.footer_fr, data.footer_en),
          });
          setContactInfo({
            phone: dbToBilingual(data.phone_fr, data.phone_en), email: data.email,
            location: dbToBilingual(data.location_fr, data.location_en),
            linkedin_url: data.linkedin_url, github_url: data.github_url,
            cv_pdf_url: data.cv_pdf_url, profile_photo_url: data.profile_photo_url,
          });
        }
      }),
      fetchGallery().then(data => {
        if (data?.length) setGalleryItems(data.map(d => ({
          img: d.img, title: dbToBilingual(d.title_fr, d.title_en), desc: dbToBilingual(d.desc_fr, d.desc_en),
        })));
      }),
    ]).then(() => {
      if (!aboutOk && !contactOk) setDbError(true);
    }).catch(() => { setDbError(true); });
  }, []);

  const markdownContent = useMemo(() => {
    const section = (title: string) => `\n## ${title}\n`;
    const bullet = (text: string) => `- ${text}\n`;
    const dFw = ["Next.js", "Flutter", "Node.js", "Vue.js"];
    const dInfra = ["GitHub Pages", "Vercel", "Netlify", "Supabase", "GitHub Actions", "Docker", "Raspberry Pi", "ESP32", "ESP8266", "Home Assistant", "Linux / SSH"];
    const displayFrameworks = frameworks.length > 0 ? frameworks.map(f => f.name) : dFw;
    const displayInfra = infra.length > 0 ? infra : dInfra;

    const recruiterPrompt = `Tu es un recruteur technique specialise dans les profils ingenieurs et developpeurs.
Analyse le CV ci-dessous comme si tu devais decider si tu convoques cette personne en entretien.
Donne-moi :
1. Une synthese du profil en 5 lignes maximum.
2. Les 5 points forts du candidat.
3. Les points faibles ou elements qui pourraient freiner un recrutement.
4. Les competences techniques qui ressortent le plus.
5. Les competences qui semblent manquer ou qui meriteraient d'etre renforcees.
6. Les types de postes auxquels ce profil correspond le mieux.
7. Une estimation du niveau du candidat (junior, confirme, senior) avec justification.
8. Les questions que tu poserais en entretien technique et RH.
9. Des recommandations concretes pour ameliorer ce CV.
10. Quelles informations du CV meriteraient d'etre approfondies en entretien ?
Sois critique et honnete, ne cherche pas uniquement a etre positif.

Voici le CV au format markdown :
# Arthur Fresse — Ingenieur Generaliste
> GitHub : ${contactInfo?.github_url ?? ""}
> LinkedIn : ${contactInfo?.linkedin_url ?? ""}
`;

    let md = recruiterPrompt;
    md += section(aboutLabels ? _(aboutLabels.aboutTitle) : "");
    md += `${aboutLabels ? _(aboutLabels.aboutP1) : ""}\n\n${aboutLabels ? _(aboutLabels.aboutP2) : ""}\n`;
    md += section(parcoursLabels ? _(parcoursLabels.resumeTitle) : "");
    md += `### ${parcoursLabels ? _(parcoursLabels.experienceLabel) : ""}\n`;
    experiences.forEach(e => { md += `- **${_(e.title)}** — ${_(e.date)}\n  ${_(e.desc)}\n`; });
    md += `### ${parcoursLabels ? _(parcoursLabels.educationLabel) : ""}\n`;
    educations.forEach(e => { md += `- **${_(e.title)}** — ${_(e.date)}\n  ${_(e.desc)}\n`; });
    md += `### ${lang === "fr" ? "Langages les plus utilises sur GitHub" : "Most used languages on GitHub"}\n`;
    gitHubLangs.forEach(l => { md += bullet(`${l.name} (${l.pct}%)`); });
    md += `_${lang === "fr" ? "% des projets GitHub par langage" : "% of GitHub projects by language"}_\n`;
    md += `### ${parcoursLabels ? _(parcoursLabels.frameworksLabel) : ""}\n${displayFrameworks.join(", ")}\n`;
    md += `### ${parcoursLabels ? (lang === "fr" ? parcoursLabels.infraLabelFR : parcoursLabels.infraLabelEN) : ""}\n${displayInfra.join(", ")}\n`;
    md += `### ${parcoursLabels ? _(parcoursLabels.softwareLabel) : ""}\n${software.map(s => s.name).join(", ")}\n`;
    md += section(_(PORTFOLIO_TITLE));
    projects.forEach((p, i) => {
      md += `### Projet ${i + 1} : ${_(p.title)}\n`;
      md += `- **Categorie** : ${_(p.category)}\n- **Description** : ${_(p.text)}\n`;
      if (p.link) md += `- **Lien** : ${p.link}\n`;
    });
    md += section(contactLabels ? _(contactLabels.contactTitle) : "");
    md += bullet(`Email : ${contactInfo?.email ?? ""}`);
    md += bullet(`Telephone : ${contactInfo ? _(contactInfo.phone) : ""}`);
    md += bullet(`Localisation : ${contactInfo ? _(contactInfo.location) : ""}`);
    md += bullet(`LinkedIn : ${contactInfo?.linkedin_url ?? ""}`);
    md += bullet(`GitHub : ${contactInfo?.github_url ?? ""}`);
    return md;
  }, [lang, _, aboutLabels, parcoursLabels, contactLabels, contactInfo, experiences, educations, software, projects, gitHubLangs, frameworks, infra]);

  if (dbError) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--eerie-black-2, #1a1a1a)", flexDirection: "column", gap: 20 }}>
        <h1 style={{ color: "#e74c3c", fontSize: 24, fontWeight: 700 }}>Base de donnees inaccessible</h1>
        <p style={{ color: "var(--light-gray-70)", fontSize: 14, maxWidth: 400, textAlign: "center" }}>Impossible de charger les donnees du CV depuis Supabase. Verifie ta connexion ou le statut du projet.</p>
        <button onClick={() => window.location.reload()} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: "var(--orange-yellow-crayola)", color: "#000", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Reessayer</button>
      </div>
    );
  }

  return (
    <>
      <main>
        <Sidebar lang={lang} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} contactInfo={contactInfo} contactLabels={contactLabels} />
        <div className="main-content">
          <Navbar lang={lang} activePage={activePage} setActivePage={setActivePage} setLang={setLang} />
          <AboutSection lang={lang} activePage={activePage} topics={topics} aboutLabels={aboutLabels} featuredItems={featuredItems} />
          <ResumeSection lang={lang} activePage={activePage} gitHubLangs={gitHubLangs} frameworks={frameworks} infra={infra} experiences={experiences} educations={educations} software={software} parcoursLabels={parcoursLabels} />
          <PortfolioSection lang={lang} activePage={activePage} projects={projects} />
          <ContactSection lang={lang} activePage={activePage} contactInfo={contactInfo} contactLabels={contactLabels} />
          <GallerySection lang={lang} activePage={activePage} galleryItems={galleryItems} />
        </div>
      </main>
      <aside className="right-sidebar"><AiTools lang={lang} markdownContent={markdownContent} /></aside>
      <footer><div className="footerContainer"><p className="copyright">&copy; {new Date().getFullYear()} Arthur Fresse | {contactLabels ? _(contactLabels.footer) : ""}</p></div></footer>
      <button id="popup" className={popupOpen ? "show" : ""} onClick={() => setPopupOpen(false)}>
        <img src="/img/divers/photo_profil.png" alt="Arthur Fresse" />
      </button>
    </>
  );
}
