"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Lang, Page } from "@/lib/types";

interface NavbarProps {
  readonly lang: Lang;
  readonly activePage: Page;
  readonly setActivePage: (p: Page) => void;
  readonly setLang: (l: Lang) => void;
}

export default function Navbar({ lang, activePage, setActivePage, setLang }: NavbarProps) {
  const _ = t(lang);
  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");
  const flagSrc = lang === "fr" ? "/img/divers/United_Kingdom.png" : "/img/divers/France.png";

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {NAV_ITEMS.map(({ page, label }) => (
          <li className="navbar-item" key={page}><button className={`navbar-link${activePage === page ? " active" : ""}`} onClick={() => setActivePage(page)}>{_(label)}</button></li>
        ))}
        <li className="navbar-item">
          <button className="navbar-link" onClick={toggleLang} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <img src={flagSrc} alt={lang === "fr" ? "EN" : "FR"} style={{ width: 18, height: 12, borderRadius: 2, display: "inline" }} />{lang === "fr" ? "EN" : "FR"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
