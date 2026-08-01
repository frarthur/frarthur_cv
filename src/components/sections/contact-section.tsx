"use client";

import { t } from "@/lib/i18n";
import type { ContactInfo, ContactLabels, Lang, Page } from "@/lib/types";
import IonIcon from "../ion-icon";
import { iconBoxEl } from "../ui";

interface ContactSectionProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly contactInfo: ContactInfo | null;
  readonly contactLabels: ContactLabels | null;
}

function telHref(phone: string | undefined): string {
  if (!phone) return "tel:";
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default function ContactSection({ lang, activePage, contactInfo, contactLabels }: ContactSectionProps) {
  const _ = t(lang);
  const cl = contactLabels;
  const c = contactInfo;
  return (
    <article className={`contact${activePage === "contact" ? " active" : ""}`} data-page="contact">
      <header><h2 className="h2 article-title">{cl ? _(cl.contactTitle) : ""}</h2></header>
      <section className="mapbox" data-mapbox><figure><iframe title="Localisation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83974.21371039714!2d2.3522211331609687!3d48.78580251471849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e672f22f8ec7b9%3A0x40b82c3688c9460!2sVitry-sur-Seine%2C%20France!5e0!3m2!1sen!2sfr!4v1700000000000" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></figure></section>
      <section className="contact-details-wrapper">
        <div className="contact-details">
          <h3 className="h3">{cl ? _(cl.contactDetails) : ""}</h3>
          <ul className="contact-info-list">
            <li>{iconBoxEl("phone-portrait-outline")}<div><h5 className="h5">{cl ? _(cl.contactMobile) : ""}</h5><a href={telHref(c ? _(c.phone) : "")} className="contact-text">{c ? _(c.phone) : ""}</a></div></li>
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
