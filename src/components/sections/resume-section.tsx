"use client";

import { DEFAULT_FRAMEWORKS, DEFAULT_INFRA } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Bilingual, FrameworkStat, GitHubLang, Lang, Page, ParcoursLabels, SoftwareItem, TimelineItem } from "@/lib/types";
import { badgeStyle, iconBoxEl, logoImg, logoSm } from "../ui";

interface ResumeSectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly gitHubLangs: GitHubLang[];
  readonly frameworks: FrameworkStat[];
  readonly infra: string[];
  readonly experiences: TimelineItem[];
  readonly educations: TimelineItem[];
  readonly software: SoftwareItem[];
  readonly parcoursLabels: ParcoursLabels | null;
}

function Timeline({ items, label, icon, _ }: {
  readonly items: TimelineItem[];
  readonly label: string;
  readonly icon: string;
  readonly _: (o: Bilingual) => string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="timeline">
      <div className="title-wrapper">{iconBoxEl(icon)}<h3 className="h3">{label}</h3></div>
      <ol className="timeline-list">
        {items.map(item => (
          <li key={item.title.fr} className="timeline-item">
            <h4 className="h4 timeline-item-title">
              {item.logo && logoImg(item.logo, 22, { verticalAlign: "middle", marginRight: 8 })}
              {_(item.title)}
            </h4>
            <span>{_(item.date)}</span><p className="timeline-text">{_(item.desc)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ResumeSection({ lang, activePage, gitHubLangs, frameworks, infra, experiences, educations, software, parcoursLabels }: ResumeSectionProps) {
  const _ = t(lang);
  const pl = parcoursLabels;
  return (
    <article className={`resume${activePage === "resume" ? " active" : ""}`} data-page="resume">
      <header><h2 className="h2 article-title">{pl ? _(pl.resumeTitle) : ""}</h2></header>
      <Timeline items={experiences} label={pl ? _(pl.experienceLabel) : ""} icon="briefcase-outline" _={_} />
      <Timeline items={educations} label={pl ? _(pl.educationLabel) : ""} icon="school-outline" _={_} />
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
          {(frameworks.length > 0 ? frameworks : DEFAULT_FRAMEWORKS).map(fw => (<span key={fw.name} style={badgeStyle}>{logoSm(fw.logo)}{fw.name}</span>))}
        </div>
      </section>
      <section className="skill" style={{ marginTop: 30 }}>
        <h3 className="h3 skills-title">{pl ? (lang === "fr" ? pl.infraLabelFR : pl.infraLabelEN) : ""}</h3>
        <div className="content-card" style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 20 }}>
          {(infra.length > 0 ? infra : DEFAULT_INFRA).map(name => (<span key={name} style={badgeStyle}>🚀 {name}</span>))}
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
