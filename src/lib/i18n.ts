import type { Bilingual, Lang } from "./types";

export function dbToBilingual(fr: string, en: string): Bilingual {
  return { fr, en };
}

export const t = (lang: Lang) => (obj: Bilingual) => obj[lang];
