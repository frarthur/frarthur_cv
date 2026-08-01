export type Lang = "fr" | "en";

export const PAGES = ["about", "resume", "portfolio", "contact", "gallery"] as const;
export type Page = (typeof PAGES)[number];

export interface Bilingual {
  fr: string;
  en: string;
}

export interface FeaturedItem {
  image: string;
  logo: string;
  link: string;
  linkUrl: string;
  title: Bilingual;
  desc: Bilingual;
}

export interface TimelineItem {
  logo: string | null;
  title: Bilingual;
  date: Bilingual;
  desc: Bilingual;
}

export interface SoftwareItem {
  name: string;
  logo: string;
}

export interface ProjectItem {
  img: string;
  logo: string;
  link: string;
  title: Bilingual;
  category: Bilingual;
  text: Bilingual;
}

export interface GalleryItem {
  img: string;
  title: Bilingual;
  desc: Bilingual;
}

export interface ContactInfo {
  phone: Bilingual;
  email: string;
  location: Bilingual;
  linkedin_url: string;
  github_url: string;
  cv_pdf_url: string;
  profile_photo_url: string;
}

export interface AboutLabels {
  aboutTitle: Bilingual;
  aboutP1: Bilingual;
  aboutP2: Bilingual;
  highlightsTitle: Bilingual;
  hlCompleted: Bilingual;
  hlInProgress: Bilingual;
  hlMaintained: Bilingual;
  featuredTitle: Bilingual;
}

export interface ParcoursLabels {
  resumeTitle: Bilingual;
  experienceLabel: Bilingual;
  educationLabel: Bilingual;
  skillsLabel: Bilingual;
  frameworksLabel: Bilingual;
  softwareLabel: Bilingual;
  infraLabelFR: string;
  infraLabelEN: string;
}

export interface ContactLabels {
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

export interface GitHubLang {
  name: string;
  pct: number;
  logo: string;
}

export interface FrameworkStat {
  name: string;
  count: number;
  pct: number;
  logo: string;
}
