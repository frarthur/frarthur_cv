"use client";

import { PORTFOLIO_TITLE } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Lang, Page, ProjectItem } from "@/lib/types";
import { logoSm } from "../ui";

interface PortfolioSectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly projects: ProjectItem[];
}

export default function PortfolioSection({ lang, activePage, projects }: PortfolioSectionProps) {
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
