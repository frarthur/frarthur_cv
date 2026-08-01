import { useEffect, useState } from "react";
import { dbToBilingual } from "@/lib/i18n";
import { DEFAULT_LANGS } from "@/lib/constants";
import {
  fetchAbout, fetchAboutFeatured, fetchContact, fetchEducations,
  fetchExperiences, fetchGallery, fetchParcoursLabels, fetchProjects,
  fetchSoftware,
} from "@/lib/supabase";
import type {
  AboutLabels, ContactInfo, ContactLabels, FeaturedItem, FrameworkStat,
  GitHubLang, GalleryItem, ParcoursLabels, ProjectItem, SoftwareItem, TimelineItem,
} from "@/lib/types";

export interface PortfolioData {
  dbError: boolean;
  gitHubLangs: GitHubLang[];
  frameworks: FrameworkStat[];
  infra: string[];
  topics: Record<string, number>;
  aboutLabels: AboutLabels | null;
  parcoursLabels: ParcoursLabels | null;
  contactLabels: ContactLabels | null;
  contactInfo: ContactInfo | null;
  featuredItems: FeaturedItem[];
  experiences: TimelineItem[];
  educations: TimelineItem[];
  software: SoftwareItem[];
  projects: ProjectItem[];
  galleryItems: GalleryItem[];
}

export function usePortfolioData(): PortfolioData {
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

  return {
    dbError, gitHubLangs, frameworks, infra, topics,
    aboutLabels, parcoursLabels, contactLabels, contactInfo,
    featuredItems, experiences, educations, software, projects, galleryItems,
  };
}
