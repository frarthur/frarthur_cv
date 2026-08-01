"use client";

import { useMemo, useState } from "react";
import AiTools from "@/components/ai-tools";
import DbError from "@/components/db-error";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import GallerySection from "@/components/sections/gallery-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ResumeSection from "@/components/sections/resume-section";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { t } from "@/lib/i18n";
import { buildRecruiterMarkdown } from "@/lib/markdown";
import type { Lang, Page } from "@/lib/types";

export default function HomeClient() {
  const [activePage, setActivePage] = useState<Page>("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const [popupOpen, setPopupOpen] = useState(false);

  const data = usePortfolioData();
  const _ = t(lang);

  const markdownContent = useMemo(
    () => buildRecruiterMarkdown({
      lang,
      aboutLabels: data.aboutLabels,
      parcoursLabels: data.parcoursLabels,
      contactLabels: data.contactLabels,
      contactInfo: data.contactInfo,
      experiences: data.experiences,
      educations: data.educations,
      software: data.software,
      projects: data.projects,
      gitHubLangs: data.gitHubLangs,
      frameworks: data.frameworks,
      infra: data.infra,
    }),
    [
      lang, data.aboutLabels, data.parcoursLabels, data.contactLabels, data.contactInfo,
      data.experiences, data.educations, data.software, data.projects,
      data.gitHubLangs, data.frameworks, data.infra,
    ]
  );

  if (data.dbError) return <DbError />;

  return (
    <>
      <main>
        <Sidebar lang={lang} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} contactInfo={data.contactInfo} contactLabels={data.contactLabels} />
        <div className="main-content">
          <Navbar lang={lang} activePage={activePage} setActivePage={setActivePage} setLang={setLang} />
          <AboutSection lang={lang} activePage={activePage} topics={data.topics} aboutLabels={data.aboutLabels} featuredItems={data.featuredItems} />
          <ResumeSection lang={lang} activePage={activePage} gitHubLangs={data.gitHubLangs} frameworks={data.frameworks} infra={data.infra} experiences={data.experiences} educations={data.educations} software={data.software} parcoursLabels={data.parcoursLabels} />
          <PortfolioSection lang={lang} activePage={activePage} projects={data.projects} />
          <ContactSection lang={lang} activePage={activePage} contactInfo={data.contactInfo} contactLabels={data.contactLabels} />
          <GallerySection lang={lang} activePage={activePage} galleryItems={data.galleryItems} />
        </div>
      </main>
      <aside className="right-sidebar"><AiTools markdownContent={markdownContent} /></aside>
      <footer><div className="footerContainer"><p className="copyright">&copy; {new Date().getFullYear()} Arthur Fresse | {data.contactLabels ? _(data.contactLabels.footer) : ""}</p></div></footer>
      <button id="popup" className={popupOpen ? "show" : ""} onClick={() => setPopupOpen(false)}>
        <img src="/img/divers/photo_profil.png" alt="Arthur Fresse" />
      </button>
    </>
  );
}
