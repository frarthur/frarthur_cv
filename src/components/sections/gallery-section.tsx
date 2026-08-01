"use client";

import { GALLERY_TITLE } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { GalleryItem, Lang, Page } from "@/lib/types";

interface GallerySectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly galleryItems: GalleryItem[];
}

export default function GallerySection({ lang, activePage, galleryItems }: GallerySectionProps) {
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
