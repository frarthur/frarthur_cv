"use client";

import IonIcon from "../ion-icon";
import { logoSm } from "../ui";
import { t } from "@/lib/i18n";
import type { AboutLabels, FeaturedItem, Lang, Page } from "@/lib/types";

interface AboutSectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly topics: Record<string, number>;
  readonly aboutLabels: AboutLabels | null;
  readonly featuredItems: FeaturedItem[];
}

export default function AboutSection({ lang, activePage, topics, aboutLabels, featuredItems }: AboutSectionProps) {
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
