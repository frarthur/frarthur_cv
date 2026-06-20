"use client";

import { useState, useEffect } from "react";
import IonIcon from "./ion-icon";

function AiTools({ lang }: { readonly lang: Lang }) {
  const [copied, setCopied] = useState(false);

  const cvFile = lang === "fr" ? "cv_fresse_arthur_fr.pdf" : "cv_fresse_arthur_en.pdf";
  const cvUrl = `https://frarthur.github.io/${cvFile}`;
  const prompt = `Analyze this CV: ${cvUrl}`;
  const encodedPrompt = encodeURIComponent(prompt);
  const chatGptUrl = `https://chatgpt.com/?hint=search&q=${encodedPrompt}`;
  const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="ai-tools-float">
      <button className="ai-tools-btn" onClick={handleCopy}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
        {copied ? "Copied!" : "Copy as Markdown"}
      </button>
      <a href={chatGptUrl} target="_blank" rel="noreferrer noopener" className="ai-tools-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20.5647 10.1815C21.0185 8.8202 20.8627 7.3302 20.138 6.09079C19.0476 4.19442 16.8532 3.21915 14.713 3.67292C13.7581 2.60283 12.39 1.99328 10.9542 2.00006C8.76659 2.00006 6.82281 3.40879 6.14554 5.48801C4.73681 5.77924 3.52449 6.6597 2.81335 7.90588C1.71617 9.80225 1.96676 12.1863 3.43644 13.8117C2.98267 15.173 3.13844 16.663 3.86312 17.8957C4.95354 19.7988 7.1479 20.7741 9.29486 20.3203C10.243 21.3904 11.6111 22.0067 13.047 21.9999C15.2345 21.9999 17.1783 20.5912 17.8556 18.512C19.2643 18.2208 20.4766 17.3403 21.181 16.0941C22.285 14.1978 22.0344 11.8138 20.5647 10.1883V10.1815ZM19.007 6.74774C19.4404 7.50629 19.603 8.39352 19.454 9.25366C19.4269 9.23334 19.3727 9.20625 19.3388 9.18593L15.3565 6.8832C15.1533 6.76806 14.9027 6.76806 14.6995 6.8832L10.0331 9.57875V7.60111L13.8868 5.37288C15.6815 4.33665 17.9707 4.95297 19.007 6.74774ZM10.0331 10.8588L11.9972 9.72097L13.9613 10.8588V13.1277L11.9972 14.2655L10.0331 13.1277V10.8588ZM10.9474 3.30719C11.8279 3.30719 12.6745 3.61197 13.3517 4.1741C13.3246 4.18765 13.2705 4.22151 13.2298 4.24183L9.24745 6.53779C9.04427 6.65293 8.92236 6.86965 8.92236 7.1067V12.4978L7.20886 11.509V7.05252C7.20886 4.98006 8.88172 3.30719 10.9542 3.30042L10.9474 3.30719ZM3.95117 8.56284C4.3914 7.80429 5.07544 7.22184 5.90172 6.91706V11.6512C5.90172 11.8883 6.02363 12.0982 6.22681 12.2201L10.8865 14.9089L9.16618 15.9045L5.31926 13.683C3.53126 12.6468 2.91494 10.3576 3.95117 8.56284ZM5.00094 17.2523C4.56072 16.5005 4.40494 15.6065 4.55394 14.7463C4.58103 14.7667 4.63522 14.7938 4.66908 14.8141L8.65145 17.1168C8.85463 17.2319 9.10522 17.2319 9.3084 17.1168L13.968 14.4213V16.3989L10.1144 18.6204C8.31958 19.6498 6.0304 19.0403 4.99417 17.2523H5.00094ZM13.0537 20.6928C12.18 20.6928 11.3267 20.388 10.6562 19.8259C10.6833 19.8124 10.7442 19.7785 10.7781 19.7582L14.7605 17.4622C14.9636 17.3471 15.0923 17.1303 15.0855 16.8933V11.509L16.799 12.4978V16.9475C16.799 19.0199 15.1194 20.6996 13.0537 20.6996V20.6928ZM20.0567 15.4372C19.6165 16.1957 18.9257 16.7782 18.1062 17.0762V12.342C18.1062 12.105 17.9843 11.8883 17.7811 11.7731L13.1147 9.07756L14.8282 8.08875L18.6819 10.3102C20.4766 11.3464 21.0862 13.6356 20.05 15.4304L20.0567 15.4372Z" fill="currentColor" />
        </svg>
        Ask ChatGPT
      </a>
      <a href={claudeUrl} target="_blank" rel="noreferrer noopener" className="ai-tools-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5.92381 15.2988L9.85798 13.0912L9.92381 12.8988L9.85798 12.7924H9.66558L9.00735 12.7519L6.75925 12.6912L4.80988 12.6102L2.92127 12.5089L2.44533 12.4076L1.99976 11.8203L2.04533 11.5266L2.44533 11.2583L3.01748 11.3089L4.2833 11.395L6.18203 11.5266L7.55925 11.6076L9.59976 11.8203H9.92381L9.96938 11.6886L9.85798 11.6076L9.77191 11.5266L7.80735 10.195L5.68077 8.78737L4.56684 7.97724L3.96431 7.56711L3.66052 7.1823L3.52887 6.3418L4.07571 5.73927L4.80988 5.7899L4.99722 5.84053L5.74153 6.41268L7.3314 7.64306L9.40735 9.17218L9.71115 9.42534L9.83267 9.33927L9.84786 9.27851L9.71115 9.05066L8.58203 7.01015L7.37697 4.9342L6.84026 4.07344L6.69849 3.55699C6.64786 3.34433 6.61241 3.16712 6.61241 2.94939L7.2352 2.10382L7.5795 1.99243L8.40988 2.10382L8.75925 2.40762L9.27571 3.58737L10.1111 5.4456L11.4074 7.97218L11.7871 8.72154L11.9896 9.41522L12.0656 9.62787H12.1972V9.50635L12.3036 8.08357L12.501 6.33673L12.6934 4.08863L12.7592 3.45572L13.0732 2.69623L13.696 2.2861L14.182 2.51901L14.582 3.09117L14.5263 3.46079L14.2884 5.00509L13.8225 7.42534L13.5187 9.0456H13.696L13.8985 8.84306L14.7187 7.75446L16.096 6.03294L16.7036 5.34939L17.4124 4.59496L17.8681 4.23547H18.7289L19.3618 5.17724L19.0782 6.14939L18.1922 7.27344L17.458 8.22534L16.4048 9.64306L15.7466 10.7772L15.8074 10.8684L15.9643 10.8532L18.3441 10.3469L19.6301 10.114L21.1643 9.85066L21.858 10.1747L21.9339 10.5038L21.6605 11.1772L20.02 11.5823L18.096 11.9671L15.2301 12.6456L15.1947 12.6709L15.2352 12.7215L16.5263 12.8431L17.0782 12.8734H18.4301L20.9466 13.0608L21.6048 13.4962L21.9998 14.0279L21.9339 14.4329L20.9213 14.9494L19.5542 14.6253L16.3643 13.8658L15.2706 13.5924H15.1187V13.6836L16.0301 14.5747L17.701 16.0836L19.7922 18.0279L19.8985 18.5089L19.6301 18.8886L19.3466 18.8481L17.5086 17.4658L16.7998 16.8431L15.1947 15.4912H15.0884V15.6329L15.458 16.1747L17.4124 19.1114L17.5137 20.0127L17.3719 20.3064L16.8656 20.4836L16.3086 20.3823L15.1643 18.7772L13.9846 16.9696L13.0327 15.3494L12.9162 15.4152L12.3542 21.4658L12.0909 21.7747L11.4833 22.0076L10.977 21.6228L10.7086 21L10.977 19.7696L11.301 18.1646L11.5643 16.8886L11.8023 15.3038L11.9441 14.7772L11.9339 14.7418L11.8175 14.757L10.6225 16.3975L8.80482 18.8532L7.36684 20.3924L7.02254 20.5291L6.42507 20.2203L6.48077 19.6684L6.81495 19.1772L8.80482 16.6456L10.0048 15.076L10.7795 14.1696L10.7744 14.038H10.7289L5.44279 17.4709L4.50102 17.5924L4.09596 17.2127L4.14659 16.5899L4.339 16.3874L5.92887 15.2937L5.92381 15.2988Z" fill="currentColor" />
        </svg>
        Ask Claude
      </a>
    </div>
  );
}

type Lang = "fr" | "en";

/* ========== TRANSLATIONS ========== */

const T = {
  aboutTitle: { fr: "A propos", en: "Digital Identity" },
  aboutP1: { fr: "Ingenieur generaliste passionne par l'innovation et le developpement durable. Entrepreneur SNEE avec le projet Hypocaps et Ambassadeur TeamIt+ engage dans des initiatives environnementales.", en: "Generalist engineer passionate about innovation and sustainable development. SNEE entrepreneur with the Hypocaps project and TeamIt+ Ambassador engaged in environmental initiatives." },
  aboutP2: { fr: "Je combine des competences en gestion de projet, amelioration continue, et developpement logiciel pour creer des solutions concretes. Mon parcours pluridisciplinaire m'a permis d'acquerir une vision globale des problematiques techniques et organisationnelles.", en: "I combine skills in project management, continuous improvement, and software development to create concrete solutions. My multidisciplinary background has given me a global vision of technical and organizational challenges." },
  highlightsTitle: { fr: "Highlights & Reussites", en: "Highlights & Successes" },
  hlCompleted: { fr: "PROJETS FINIS", en: "COMPLETED PROJECTS" },
  hlInProgress: { fr: "PROJETS EN COURS", en: "PROJECTS IN PROGRESS" },
  hlMaintained: { fr: "PROJETS MAINTENUS", en: "MAINTAINED PROJECTS" },
  featuredTitle: { fr: "Projets en vedette", en: "Featured Projects" },
  featHypocapsTitle: { fr: "Projet Sante", en: "Health Project" },
  featHypocapsDesc: { fr: "Creation d'entreprise dans le domaine de la sante : conception 3D, prototypage, R&D et veille scientifique.", en: "Startup creation in the health sector: 3D design, prototyping, R&D and scientific monitoring." },
  featTeamitTitle: { fr: "Ambassadeur Environnement", en: "Environment Ambassador" },
  featTeamitDesc: { fr: "Developpement d'un outil web pour aider les entreprises a se fournir localement en energie, transport et emballage.", en: "Development of a web tool to help companies source energy, transport and packaging locally." },
  resumeTitle: { fr: "Parcours", en: "Career Snapshot" },
  experience: { fr: "Experience", en: "Experience" },
  education: { fr: "Formation", en: "Education" },
  skills: { fr: "Langages", en: "Languages" },
  frameworks: { fr: "Frameworks", en: "Frameworks" },
  software: { fr: "Logiciels", en: "Software" },
  exp1Title: { fr: "Auto-entrepreneur - Hypocaps", en: "Entrepreneur - Hypocaps" },
  exp1Date: { fr: "2024 — Aujourd'hui", en: "2024 — Present" },
  exp1Desc: { fr: "Projet de creation d'entreprise dans le domaine de la sante. Gestion de projet, travail en autonomie, R&D, conception et prototypage 3D, usinage de precision, biochimie et chimie pharmaceutique.", en: "Startup project in the health sector. Project management, autonomous work, R&D, 3D design and prototyping, precision machining, biochemistry and pharmaceutical chemistry." },
  exp2Title: { fr: "Ingenieur Gestion de Projet / Amelioration Continue", en: "Project Manager / Continuous Improvement Engineer" },
  exp2Date: { fr: "2023 — 2026", en: "2023 — 2026" },
  exp2Desc: { fr: "Entreprise confidentielle - secteur agroalimentaire. Developpement d'applications Android et Power Apps pour le suivi de production, automatisation des processus de donnees, Power Automate, configuration SharePoint, formation securite chimique.", en: "Confidential company - agri-food sector. Development of Android and Power Apps for production tracking, data process automation, Power Automate, SharePoint configuration, chemical safety training." },
  exp3Title: { fr: "Assistant de recherche en genomique", en: "Genomics Research Assistant" },
  exp3Date: { fr: "2021", en: "2021" },
  exp3Desc: { fr: "Ecolgen - Universite Charles de Prague. Analyse de donnees genomiques, participation a un projet de recherche en genetique moleculaire, maintenance d'equipements de laboratoire, traitement de donnees experimentales.", en: "Ecolgen - Charles University of Prague. Genomic data analysis, participation in molecular genetics research, laboratory equipment maintenance, experimental data processing." },
  edu1Title: { fr: "Ingenieur Generaliste", en: "Generalist Engineer" },
  edu1Date: { fr: "2023 — 2026", en: "2023 — 2026" },
  edu1Desc: { fr: "ESTIA - Bidart. Formation d'ingenieur pluridisciplinaire : gestion de projet, informatique, genie industriel.", en: "ESTIA - Bidart. Multidisciplinary engineering training: project management, IT, industrial engineering." },
  edu2Title: { fr: "BTS ANABIOTEC", en: "BTS ANABIOTEC" },
  edu2Date: { fr: "2021 — 2023", en: "2021 — 2023" },
  edu2Desc: { fr: "LEGTA - Blanquefort. Analyses biologiques et biotechnologiques.", en: "LEGTA - Blanquefort. Biological and biotechnological analysis." },
  edu3Title: { fr: "BAC STAV", en: "BAC STAV" },
  edu3Date: { fr: "2019 — 2021", en: "2019 — 2021" },
  edu3Desc: { fr: "LEGTA - Montagne-Saint-Emilion. Sciences et technologies de l'agronomie et du vivant.", en: "LEGTA - Montagne-Saint-Emilion. Agronomy and life sciences." },
  portfolioTitle: { fr: "Projets", en: "Creative Showcase" },
  proj1Title: { fr: "Data Battle 2026", en: "Data Battle 2026" }, proj1Cat: { fr: "IA / Machine Learning", en: "AI / Machine Learning" },
  proj1Desc: { fr: "Modele d'IA pour la prediction probabiliste de la fin d'orages a partir de donnees spatio-temporelles de foudre.", en: "AI model for probabilistic prediction of storm endings based on spatio-temporal lightning data." },
  proj2Title: { fr: "TeamIt+ - Campagne Plaidorie", en: "TeamIt+ - Advocacy Campaign" }, proj2Cat: { fr: "Web / Environnement", en: "Web / Environment" },
  proj2Desc: { fr: "Developpement d'un site web pour aider les entreprises a se fournir localement en energie, transport et emballage.", en: "Development of a website to help companies source energy, transport and packaging locally." },
  proj3Title: { fr: "Hackathon Chanel Mode", en: "Chanel Fashion Hackathon" }, proj3Cat: { fr: "Innovation Durable", en: "Sustainable Innovation" },
  proj3Desc: { fr: "Solution durable pour recycler les dechets de production d'articles en cuir, developpee en equipe internationale.", en: "Sustainable solution to recycle leather production waste, developed in an international team." },
  proj4Title: { fr: "24h de l'Innovation - ESTIA", en: "24h of Innovation - ESTIA" }, proj4Cat: { fr: "Energie", en: "Energy" },
  proj4Desc: { fr: "Solution pour optimiser la consommation energetique communale, notamment l'eclairage public.", en: "Solution to optimize municipal energy consumption, particularly public lighting." },
  proj5Title: { fr: "24h de l'Innovation - PAU", en: "24h of Innovation - PAU" }, proj5Cat: { fr: "Agritech / Data", en: "Agritech / Data" },
  proj5Desc: { fr: "Centralisation d'informations sur les elements du sol pour agriculteurs et collectivites.", en: "Centralization of soil data for farmers and local authorities." },
  contactTitle: { fr: "Contact", en: "Let's Connect" }, contactDetails: { fr: "Coordonnees", en: "Contact Details" },
  contactMobile: { fr: "Telephone", en: "Mobile" }, contactFormTitle: { fr: "Me contacter", en: "Contact Form" },
  contactName: { fr: "Nom complet", en: "Full Name" }, contactEmail: { fr: "Adresse email", en: "Email Address" },
  contactMsg: { fr: "Votre message", en: "Your Message" }, contactSend: { fr: "Envoyer", en: "Send Message" },
  contactSent: { fr: "Message envoye ! (demo)", en: "Message sent! (demo)" }, contactPhone: { fr: "06 52 03 44 07", en: "+33 6 52 03 44 07" },
  galleryTitle: { fr: "Explorations", en: "Explorations" }, footer: { fr: "Tous droits reserves", en: "All Rights Reserved" },
  showContacts: { fr: "Contacts", en: "Show Contacts" },
};

/* ========== DATA ========== */

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

const NAV_ITEMS: { page: Page; label: { fr: string; en: string } }[] = [
  { page: "about", label: { fr: "A propos", en: "About" } },
  { page: "resume", label: { fr: "Parcours", en: "Resume" } },
  { page: "portfolio", label: { fr: "Projets", en: "Portfolio" } },
  { page: "contact", label: { fr: "Contact", en: "Contact" } },
  { page: "gallery", label: { fr: "Galerie", en: "Gallery" } },
];

const softwareData = [
  { name: "Office 365", logo: "/img/logiciels/logo_office.png" },
  { name: "Power Platform", logo: "/img/logiciels/logo_power.png" },
  { name: "ANSYS Workbench", logo: "/img/logiciels/logo_ansys.png" },
  { name: "Simulink / NI Multisim", logo: "/img/logiciels/logo_ni.png" },
  { name: "Fusion 360 / OnShape", logo: "/img/logiciels/logo_Fusio360.png" },
  { name: "PrusaSlicer", logo: "/img/logiciels/logo_PrusaSlicer.png" },
  { name: "Draw.io", logo: "/img/logiciels/logo_DrawIo.png" },
  { name: "VS Code / VS", logo: "/img/logiciels/logo_VisualStudioCode.png" },
  { name: "Android Studio", logo: "/img/logiciels/logo_AndroidStudio.png" },
];

const portfolioData = [
  { img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop", logo: "/img/projets/logo_DataBattle2026.png", title: T.proj1Title, category: T.proj1Cat, text: T.proj1Desc },
  { img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=340&fit=crop", logo: "/img/projets/logo_teamit.png", title: T.proj2Title, category: T.proj2Cat, text: T.proj2Desc },
  { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=340&fit=crop", logo: "/img/projets/logo_chanelMode.png", title: T.proj3Title, category: T.proj3Cat, text: T.proj3Desc },
  { img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=340&fit=crop", logo: "/img/projets/logo_24h.png", title: T.proj4Title, category: T.proj4Cat, text: T.proj4Desc },
  { img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&h=340&fit=crop", logo: "/img/projets/logo_avenia24h.png", title: T.proj5Title, category: T.proj5Cat, text: T.proj5Desc },
];

const galleryData = [
  { img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=500&fit=crop", title: { fr: "Innovation", en: "Innovation" }, desc: { fr: "ESTIA - Bidart", en: "ESTIA - Bidart" } },
  { img: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&h=500&fit=crop", title: { fr: "Prototype", en: "Prototype" }, desc: { fr: "Impression 3D", en: "3D Printing" } },
  { img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=500&fit=crop", title: { fr: "Science", en: "Science" }, desc: { fr: "Biochimie", en: "Biochemistry" } },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=500&fit=crop", title: { fr: "Tech", en: "Tech" }, desc: { fr: "Dev & Code", en: "Dev & Code" } },
];

/* ========== HELPERS ========== */

const t = (lang: Lang) => (obj: { fr: string; en: string }) => obj[lang];

const iconBoxEl = (name: string) => <div className="icon-box"><IonIcon name={name} /></div>;

const badgeStyle = { color: "var(--white-1)", background: "var(--onyx)", fontSize: "var(--fs-7)", fontWeight: 300 as const, padding: "5px 12px", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 };

const logoSm = (src: string) => <img src={src} alt="" style={{ width: 18, height: 18, objectFit: "contain" as const, display: "inline" }} />;

/* ========== SUB-COMPONENTS ========== */

interface SidebarProps {
  readonly lang: Lang;
  readonly sidebarOpen: boolean;
  readonly setSidebarOpen: (v: boolean) => void;
}

function Sidebar({ lang, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const _ = t(lang);

  return (
    <aside className={`sidebar${sidebarOpen ? " active" : ""}`} data-sidebar>
      <div className="sidebar-info">
        <a href="https://www.linkedin.com/in/fr-arthur/" target="_blank" className="avatar-box">
          <figure>
            <img src="/img/divers/photo_profil.png" alt="Voir mon profil LinkedIn" />
          </figure>
        </a>
        <div className="info-content courgette-head">
          <h1 className="name" title="Arthur Fresse">Arthur Fresse</h1>
          <p className="title">Ingenieur Generaliste</p>
        </div>
        <button className="info_more-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span>{_(T.showContacts)}</span>
          <IonIcon name="chevron-down" />
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>
        <ul className="contacts-list">
          <li className="contact-item">{iconBoxEl("mail-outline")}<div className="contact-info"><p className="contact-title">Email</p><a href="mailto:fr.arthur@protonmail.com" className="contact-link">fr.arthur@protonmail.com</a></div></li>
          <li className="contact-item">{iconBoxEl("location-outline")}<div className="contact-info"><p className="contact-title">Location</p><address className="contact-text">Vitry-sur-Seine, FR</address></div></li>
        </ul>
        <div className="separator"></div>
        <ul className="social-list">
          {[
            { h: "https://www.linkedin.com/in/fr-arthur/", t: "LinkedIn", p: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", vb: "0 0 24 24" },
            { h: "https://github.com/frarthur", t: "GitHub", p: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z", vb: "0 0 16 16" },
            { h: "/cv-arthur-fresse.pdf", t: "CV", p: "M4 0a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V5.5L10.5 0H4zm6.5 1.5L13 5h-2a.5.5 0 0 1-.5-.5V1.5zM4 6h8v1H4V6zm0 2h8v1H4V8zm0 2h5v1H4v-1z", vb: "0 0 16 16" },
          ].map(s => (
            <li key={s.t} className="social-item"><a href={s.h} className="social-link" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox={s.vb}><title>{s.t}</title><path d={s.p}/></svg></a></li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

interface NavbarProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly setActivePage: (p: Page) => void;
  readonly setLang: (l: Lang) => void;
}

function Navbar({ lang, activePage, setActivePage, setLang }: NavbarProps) {
  const _ = t(lang);
  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");
  const flagSrc = lang === "fr" ? "/img/divers/United_Kingdom.png" : "/img/divers/France.png";
  const flagAlt = lang === "fr" ? "EN" : "FR";

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {NAV_ITEMS.map(({ page, label }) => (
          <li className="navbar-item" key={page}><button className={`navbar-link${activePage === page ? " active" : ""}`} onClick={() => setActivePage(page)}>{_(label)}</button></li>
        ))}
        <li className="navbar-item">
          <button className="navbar-link" onClick={toggleLang} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <img src={flagSrc} alt={flagAlt} style={{ width: 18, height: 12, borderRadius: 2, display: "inline" }} />
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

interface AboutSectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly topics: Record<string, number>;
}

function AboutSection({ lang, activePage, topics }: AboutSectionProps) {
  const _ = t(lang);

  return (
    <article className={`about${activePage === "about" ? " active" : ""}`} data-page="about">
      <header><h2 className="h2 article-title">{_(T.aboutTitle)}</h2></header>
      <section className="about-text"><p>{_(T.aboutP1)}</p><p>{_(T.aboutP2)}</p></section>
      <section className="highlights">
        <h3 className="h3 highlights-title"><IonIcon name="star-outline" />{_(T.highlightsTitle)}</h3>
        <ul className="highlights-list has-scrollbar">
          {([
            [`+${topics["completed"] || 0}`, T.hlCompleted],
            [`+${topics["in-progress"] || 0}`, T.hlInProgress],
            [`+${topics["maintenance"] || 0}`, T.hlMaintained],
          ] as [string, { fr: string; en: string }][]).map(([n, label]) => (
            <li key={label.fr} className="highlights-item"><h2 className="h2 service-item-title">{n}</h2><p className="service-item-text">{_(label)}</p></li>
          ))}
        </ul>
      </section>
      <section className="showcase-posts">
        <div className="showcase-header"><h3 className="h3 showcase-title"><IonIcon name="folder-open-outline" />{_(T.featuredTitle)}</h3></div>
        <ul className="showcase-posts-list">
          {[
            { logo: "/img/projets/logo_Hypocaps.png", link: "Hypocaps", title: T.featHypocapsTitle, desc: T.featHypocapsDesc, img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=340&fit=crop" },
            { logo: "/img/projets/logo_teamit.png", link: "TeamIt+", title: T.featTeamitTitle, desc: T.featTeamitDesc, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop" },
          ].map(p => (
            <li key={p.link} className="showcase-post-item">
              <a href="https://github.com/frarthur" target="_blank" rel="noopener noreferrer">
                <figure className="showcase-banner-box"><img src={p.img} alt="" /></figure>
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
    </article>
  );
}

interface ResumeSectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly gitHubLangs: GitHubLang[];
  readonly frameworks: FrameworkStat[];
  readonly infra: string[];
}

function ResumeSection({ lang, activePage, gitHubLangs, frameworks, infra }: ResumeSectionProps) {
  const _ = t(lang);
  const defaultFrameworks: FrameworkStat[] = [
    { name: "Next.js", count: 0, pct: 0, logo: "/img/frameworks/logo_nextjs.png" },
    { name: "Flutter", count: 0, pct: 0, logo: "/img/frameworks/logo_flutter.png" },
    { name: "Node.js", count: 0, pct: 0, logo: "/img/frameworks/logo_nodejs.png" },
    { name: "Vue.js", count: 0, pct: 0, logo: "/img/frameworks/logo_vue.png" },
  ];
  const defaultInfra = ["GitHub Pages", "Vercel", "Netlify", "Supabase", "GitHub Actions", "Docker", "Raspberry Pi", "ESP32", "ESP8266", "Home Assistant", "Linux / SSH"];
  const infraTitle = lang === "fr" ? "Deploiement / Infra" : "Deployment / Infra";

  return (
    <article className={`resume${activePage === "resume" ? " active" : ""}`} data-page="resume">
      <header><h2 className="h2 article-title">{_(T.resumeTitle)}</h2></header>

      <section className="timeline">
        <div className="title-wrapper">{iconBoxEl("briefcase-outline")}<h3 className="h3">{_(T.experience)}</h3></div>
        <ol className="timeline-list">
          {[
            { logo: "/img/projets/logo_Hypocaps.png", title: T.exp1Title, date: T.exp1Date, desc: T.exp1Desc },
            { logo: "/img/etablissements/logo_Estia.png", title: T.exp2Title, date: T.exp2Date, desc: T.exp2Desc },
            { logo: "/img/etablissements/logo_CharlesUniversity.png", title: T.exp3Title, date: T.exp3Date, desc: T.exp3Desc },
          ].map(item => (
            <li key={item.title.fr} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.logo && <img src={item.logo} alt="" style={{ width: 22, height: 22, objectFit: "contain" as const, verticalAlign: "middle", marginRight: 8, display: "inline" }} />}{_(item.title)}</h4>
              <span>{_(item.date)}</span>
              <p className="timeline-text">{_(item.desc)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">{iconBoxEl("school-outline")}<h3 className="h3">{_(T.education)}</h3></div>
        <ol className="timeline-list">
          {[
            { logo: "/img/etablissements/logo_Estia.png", title: T.edu1Title, date: T.edu1Date, desc: T.edu1Desc },
            { title: T.edu2Title, date: T.edu2Date, desc: T.edu2Desc },
            { title: T.edu3Title, date: T.edu3Date, desc: T.edu3Desc },
          ].map(item => (
            <li key={item.title.fr} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.logo && <img src={item.logo} alt="" style={{ width: 22, height: 22, objectFit: "contain" as const, verticalAlign: "middle", marginRight: 8, display: "inline" }} />}{_(item.title)}</h4>
              <span>{_(item.date)}</span>
              <p className="timeline-text">{_(item.desc)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">{_(T.skills)}</h3>
        <ul className="skills-list content-card">
          {gitHubLangs.map(s => (
            <li key={s.name} className="skills-item">
              <div className="title-wrapper">
                <a href="https://github.com/frarthur" target="_blank" rel="noopener noreferrer" style={{ display: "contents" }}><img src={s.logo} alt="" style={{ width: 30, height: 30, objectFit: "contain" as const, marginRight: 10 }} /></a>
                <h5 className="h5">{s.name}</h5>
                <data value={s.pct}>{s.pct}%</data>
              </div>
              <div className="skill-progress-bg"><div className="skill-progress-fill" style={{ width: `${s.pct}%` }}></div></div>
            </li>
          ))}
        </ul>
        <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 6, textAlign: "center" }}>{lang === "fr" ? "% des projets GitHub par langage" : "% of GitHub projects by language"}</p>
      </section>

      <section className="skill" style={{ marginTop: 30 }}>
        <h3 className="h3 skills-title">{_(T.frameworks)}</h3>
        <div className="content-card" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 20 }}>
          {(frameworks.length > 0 ? frameworks : defaultFrameworks).map(fw => (
            <span key={fw.name} style={badgeStyle}>{logoSm(fw.logo)}{fw.name}</span>
          ))}
        </div>
      </section>

      <section className="skill" style={{ marginTop: 30 }}>
        <h3 className="h3 skills-title">{infraTitle}</h3>
        <div className="content-card" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 20 }}>
          {(infra.length > 0 ? infra : defaultInfra).map(name => (
            <span key={name} style={badgeStyle}>🚀 {name}</span>
          ))}
        </div>
      </section>

      <section className="skill" style={{ marginTop: 30 }}>
        <h3 className="h3 skills-title">{_(T.software)}</h3>
        <div className="content-card" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 20 }}>
          {softwareData.map(sw => (<span key={sw.name} style={badgeStyle}>{logoSm(sw.logo)}{sw.name}</span>))}
        </div>
      </section>
    </article>
  );
}

interface SectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
}

function PortfolioSection({ lang, activePage }: SectionProps) {
  const _ = t(lang);

  return (
    <article className={`portfolio${activePage === "portfolio" ? " active" : ""}`} data-page="portfolio">
      <header><h2 className="h2 article-title">{_(T.portfolioTitle)}</h2></header>
      <section className="portfolio-posts">
        <ul className="portfolio-posts-list">
          {portfolioData.map(p => (
            <li key={p.title.fr} className="portfolio-post-item">
              <a href="https://github.com/frarthur" target="_blank" rel="noopener noreferrer">
                <figure className="portfolio-banner-box"><img src={p.img} alt={_(p.title)} loading="lazy" /></figure>
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
    </article>
  );
}

function ContactSection({ lang, activePage }: SectionProps) {
  const _ = t(lang);

  return (
    <article className={`contact${activePage === "contact" ? " active" : ""}`} data-page="contact">
      <header><h2 className="h2 article-title">{_(T.contactTitle)}</h2></header>
      <section className="mapbox" data-mapbox><figure><iframe title="Localisation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83974.21371039714!2d2.3522211331609687!3d48.78580251471849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e672f22f8ec7b9%3A0x40b82c3688c9460!2sVitry-sur-Seine%2C%20France!5e0!3m2!1sen!2sfr!4v1700000000000" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></figure></section>
      <section className="contact-details-wrapper">
        <div className="contact-details">
          <h3 className="h3">{_(T.contactDetails)}</h3>
          <ul className="contact-info-list">
            <li>{iconBoxEl("phone-portrait-outline")}<div><h5 className="h5">{_(T.contactMobile)}</h5><a href="tel:+33652034407" className="contact-text">{_(T.contactPhone)}</a></div></li>
            <li>{iconBoxEl("mail-outline")}<div><h5 className="h5">Email</h5><a href="mailto:fr.arthur@protonmail.com" className="contact-text">fr.arthur@protonmail.com</a></div></li>
          </ul>
        </div>
      </section>
      <section className="contact-form-wrapper">
        <div className="contact-form-box">
          <h3 className="h3 form-title">{_(T.contactFormTitle)}</h3>
          <form className="form contact-form" onSubmit={e => { e.preventDefault(); alert(_(T.contactSent)); }}>
            <div className="input-wrapper">
              <input type="text" name="name" className="form-input" placeholder={_(T.contactName)} required autoComplete="name" />
              <input type="email" name="email" className="form-input" placeholder={_(T.contactEmail)} required autoComplete="email" />
            </div>
            <textarea name="message" className="form-input" placeholder={_(T.contactMsg)} required autoComplete="off"></textarea>
            <button className="form-btn" type="submit"><div className="content"><IonIcon name="paper-plane" className="icon" /><span className="btn-label">{_(T.contactSend)}</span></div></button>
          </form>
        </div>
      </section>
    </article>
  );
}

function GallerySection({ lang, activePage }: SectionProps) {
  const _ = t(lang);

  return (
    <article className={`gallery${activePage === "gallery" ? " active" : ""}`} data-page="gallery">
      <header><h2 className="h2 article-title">{_(T.galleryTitle)}</h2></header>
      <section className="container">
        {galleryData.map(item => (
          <div key={item.title.fr} className="card-wrap">
            <div className="card">
              <div className="card-bg"><img src={item.img} alt={_(item.title)} loading="lazy" /></div>
              <div className="card-info"><h2>{_(item.title)}</h2><p>{_(item.desc)}</p></div>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}

/* ========== MAIN COMPONENT ========== */

export default function HomeClient() {
  const [activePage, setActivePage] = useState<Page>("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const [popupOpen, setPopupOpen] = useState(false);
  const [gitHubLangs, setGitHubLangs] = useState<GitHubLang[]>(DEFAULT_LANGS);
  const [frameworks, setFrameworks] = useState<FrameworkStat[]>([]);
  const [infra, setInfra] = useState<string[]>([]);
  const [topics, setTopics] = useState<Record<string, number>>({});

  const _ = t(lang);

  useEffect(() => {
    fetch("/api/github-langs").then(r => r.json()).then(data => {
      if (data.langs?.length) setGitHubLangs(data.langs);
      if (data.frameworks?.length) setFrameworks(data.frameworks);
      if (data.infra?.length) setInfra(data.infra);
      if (data.topics) setTopics(data.topics);
    }).catch(() => {});
  }, []);

  return (
    <>
      <main>
        <Sidebar lang={lang} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="main-content">
          <Navbar lang={lang} activePage={activePage} setActivePage={setActivePage} setLang={setLang} />
          <AboutSection lang={lang} activePage={activePage} topics={topics} />
          <ResumeSection lang={lang} activePage={activePage} gitHubLangs={gitHubLangs} frameworks={frameworks} infra={infra} />
          <PortfolioSection lang={lang} activePage={activePage} />
          <ContactSection lang={lang} activePage={activePage} />
          <GallerySection lang={lang} activePage={activePage} />
        </div>
      </main>

      <aside className="right-sidebar">
        <AiTools lang={lang} />
      </aside>

      <footer><div className="footerContainer"><p className="copyright">&copy; {new Date().getFullYear()} Arthur Fresse | {_(T.footer)}</p></div></footer>

      <button
        id="popup"
        className={popupOpen ? "show" : ""}
        onClick={() => setPopupOpen(false)}
      >
        <img src="/img/divers/photo_profil.png" alt="Arthur Fresse" />
      </button>
    </>
  );
}
