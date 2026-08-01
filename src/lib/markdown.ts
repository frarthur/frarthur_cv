import { DEFAULT_FRAMEWORKS, DEFAULT_INFRA, PORTFOLIO_TITLE } from "./constants";
import { t } from "./i18n";
import type {
  AboutLabels, ContactInfo, ContactLabels, FrameworkStat, GitHubLang,
  Lang, ParcoursLabels, ProjectItem, SoftwareItem, TimelineItem,
} from "./types";

interface MarkdownInput {
  lang: Lang;
  aboutLabels: AboutLabels | null;
  parcoursLabels: ParcoursLabels | null;
  contactLabels: ContactLabels | null;
  contactInfo: ContactInfo | null;
  experiences: TimelineItem[];
  educations: TimelineItem[];
  software: SoftwareItem[];
  projects: ProjectItem[];
  gitHubLangs: GitHubLang[];
  frameworks: FrameworkStat[];
  infra: string[];
}

export function buildRecruiterMarkdown({
  lang, aboutLabels, parcoursLabels, contactLabels, contactInfo,
  experiences, educations, software, projects, gitHubLangs, frameworks, infra,
}: MarkdownInput): string {
  const _ = t(lang);
  const section = (title: string) => `\n## ${title}\n`;
  const bullet = (text: string) => `- ${text}\n`;
  const displayFrameworks = frameworks.length > 0 ? frameworks.map(f => f.name) : DEFAULT_FRAMEWORKS.map(f => f.name);
  const displayInfra = infra.length > 0 ? infra : DEFAULT_INFRA;

  const recruiterPrompt = `Tu es un recruteur technique specialise dans les profils ingenieurs et developpeurs.
Analyse le portfolio ci-dessous comme si tu devais decider si tu convoques cette personne en entretien.
Donne-moi :
1. Une synthese du profil en 5 lignes maximum.
2. Les 5 points forts du candidat.
3. Les points faibles ou elements qui pourraient freiner un recrutement.
4. Les competences techniques qui ressortent le plus.
5. Les competences qui semblent manquer ou qui meriteraient d'etre renforcees.
6. Les types de postes auxquels ce profil correspond le mieux.
7. Une estimation du niveau du candidat (junior, confirme, senior) avec justification.
8. Les questions que tu poserais en entretien technique et RH.
9. Des recommandations concretes pour ameliorer ce portfolio.
10. Quelles informations du portfolio meriteraient d'etre approfondies en entretien ?
Sois critique et honnete, ne cherche pas uniquement a etre positif.

Voici le portfolio au format markdown :
# Arthur Fresse — Ingenieur Generaliste
> GitHub : ${contactInfo?.github_url ?? ""}
> LinkedIn : ${contactInfo?.linkedin_url ?? ""}
`;

  let md = recruiterPrompt;
  md += section(aboutLabels ? _(aboutLabels.aboutTitle) : "");
  md += `${aboutLabels ? _(aboutLabels.aboutP1) : ""}\n\n${aboutLabels ? _(aboutLabels.aboutP2) : ""}\n`;
  md += section(parcoursLabels ? _(parcoursLabels.resumeTitle) : "");
  md += `### ${parcoursLabels ? _(parcoursLabels.experienceLabel) : ""}\n`;
  experiences.forEach(e => { md += `- **${_(e.title)}** — ${_(e.date)}\n  ${_(e.desc)}\n`; });
  md += `### ${parcoursLabels ? _(parcoursLabels.educationLabel) : ""}\n`;
  educations.forEach(e => { md += `- **${_(e.title)}** — ${_(e.date)}\n  ${_(e.desc)}\n`; });
  md += `### ${lang === "fr" ? "Langages les plus utilises sur GitHub" : "Most used languages on GitHub"}\n`;
  gitHubLangs.forEach(l => { md += bullet(`${l.name} (${l.pct}%)`); });
  md += `_${lang === "fr" ? "% des projets GitHub par langage" : "% of GitHub projects by language"}_\n`;
  md += `### ${parcoursLabels ? _(parcoursLabels.frameworksLabel) : ""}\n${displayFrameworks.join(", ")}\n`;
  md += `### ${parcoursLabels ? (lang === "fr" ? parcoursLabels.infraLabelFR : parcoursLabels.infraLabelEN) : ""}\n${displayInfra.join(", ")}\n`;
  md += `### ${parcoursLabels ? _(parcoursLabels.softwareLabel) : ""}\n${software.map(s => s.name).join(", ")}\n`;
  md += section(_(PORTFOLIO_TITLE));
  projects.forEach((p, i) => {
    md += `### Projet ${i + 1} : ${_(p.title)}\n`;
    md += `- **Categorie** : ${_(p.category)}\n- **Description** : ${_(p.text)}\n`;
    if (p.link) md += `- **Lien** : ${p.link}\n`;
  });
  md += section(contactLabels ? _(contactLabels.contactTitle) : "");
  md += bullet(`Email : ${contactInfo?.email ?? ""}`);
  md += bullet(`Telephone : ${contactInfo ? _(contactInfo.phone) : ""}`);
  md += bullet(`Localisation : ${contactInfo ? _(contactInfo.location) : ""}`);
  md += bullet(`LinkedIn : ${contactInfo?.linkedin_url ?? ""}`);
  md += bullet(`GitHub : ${contactInfo?.github_url ?? ""}`);
  return md;
}
