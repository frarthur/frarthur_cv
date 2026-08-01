import type { Bilingual, FrameworkStat, GitHubLang, Page } from "./types";

export const NAV_ITEMS: { page: Page; label: Bilingual }[] = [
  { page: "about", label: { fr: "A propos", en: "About" } },
  { page: "resume", label: { fr: "Parcours", en: "Resume" } },
  { page: "portfolio", label: { fr: "Projets", en: "Portfolio" } },
  { page: "contact", label: { fr: "Contact", en: "Contact" } },
  { page: "gallery", label: { fr: "Galerie", en: "Gallery" } },
];

export const PORTFOLIO_TITLE: Bilingual = { fr: "Projets", en: "Creative Showcase" };
export const GALLERY_TITLE: Bilingual = { fr: "Explorations", en: "Explorations" };

export const DEFAULT_LANGS: GitHubLang[] = [
  { name: "Python", pct: 35, logo: "/img/langages/logo_python.png" },
  { name: "JavaScript", pct: 25, logo: "/img/langages/logo_js.png" },
  { name: "Java", pct: 15, logo: "/img/langages/logo_java.png" },
  { name: "C++", pct: 10, logo: "/img/langages/logo_c.png" },
  { name: "HTML/CSS", pct: 15, logo: "/img/langages/logo_htmlcss.png" },
];

export const DEFAULT_FRAMEWORKS: FrameworkStat[] = [
  { name: "Next.js", count: 0, pct: 0, logo: "/img/frameworks/logo_nextjs.png" },
  { name: "Flutter", count: 0, pct: 0, logo: "/img/frameworks/logo_flutter.png" },
  { name: "Node.js", count: 0, pct: 0, logo: "/img/frameworks/logo_nodejs.png" },
  { name: "Vue.js", count: 0, pct: 0, logo: "/img/frameworks/logo_vue.png" },
];

export const DEFAULT_INFRA = [
  "GitHub Pages", "Vercel", "Netlify", "Supabase", "GitHub Actions",
  "Docker", "Raspberry Pi", "ESP32", "ESP8266", "Home Assistant", "Linux / SSH",
];
