import { NextResponse } from "next/server";

interface LangStat { name: string; pct: number; logo: string; }
interface FrameworkStat { name: string; count: number; pct: number; logo: string; }

interface RepoInfo {
  owner: { login: string };
  name: string;
  description: string | null;
  language: string | null;
  fork: boolean;
  topics: string[];
}

interface DepsResult {
  fws: string[];
  infs: string[];
  name: string;
  desc: string;
  lang: string | null;
  topics: string[];
  fork: boolean;
}

const LOGO_MAP: Record<string, string> = {
  Python: "/img/langages/logo_python.png", JavaScript: "/img/langages/logo_js.png", TypeScript: "/img/langages/logo_js.png",
  Java: "/img/langages/logo_java.png", "C++": "/img/langages/logo_c.png", C: "/img/langages/logo_c.png",
  "C#": "/img/langages/logo_cs.png", HTML: "/img/langages/logo_htmlcss.png", CSS: "/img/langages/logo_htmlcss.png",
  PHP: "/img/langages/logo_slqphp.png", Dart: "/img/langages/logo_dart.png", Kotlin: "/img/langages/logo_kotlin.png",
  Lua: "/img/langages/logo_lua.png", Vue: "/img/langages/logo_vue.png",
};

const NON_LANG = new Set(["Dockerfile", "Makefile", "CMake", "Shell", "Jupyter Notebook"]);

const FW_LOGOS: Record<string, string> = {
  "Next.js": "/img/frameworks/logo_nextjs.png", Flutter: "/img/frameworks/logo_flutter.png",
  React: "/img/frameworks/logo_react.png", "Vue.js": "/img/frameworks/logo_vue.png",
  "Node.js": "/img/frameworks/logo_nodejs.png", Express: "/img/frameworks/logo_express.png",
  Tkinter: "/img/langages/logo_python.png", Processing: "/img/frameworks/logo_processing.png",
  "ESP32 / Arduino": "/img/frameworks/logo_arduino.png", "Power Apps": "/img/logiciels/logo_power.png",
  Tailwind: "/img/frameworks/logo_tailwind.png", FastAPI: "/img/frameworks/logo_fastapi.png",
  Electron: "/img/frameworks/logo_electron.png", "React Native": "/img/frameworks/logo_react.png",
};

const TOPIC_LABELS = new Set(["completed", "in-progress", "maintenance", "archived"]);

// ---------- detect framework & infra from package.json / pubspec.yaml ----------

async function fetchJson(owner: string, repo: string, path: string, headers: Record<string, string>) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const buf = Buffer.from(data.content, "base64");
    return JSON.parse(buf.toString("utf-8"));
  } catch { return null; }
}

function extractFrameworksFromDeps(deps: Record<string, string> | undefined): string[] {
  if (!deps) return [];
  const keys = Object.keys(deps).map(k => k.toLowerCase());
  const found: string[] = [];
  if (keys.includes("next")) found.push("Next.js");
  if (keys.includes("react") || keys.includes("react-dom")) found.push("React");
  if (keys.includes("vue")) found.push("Vue.js");
  if (keys.some(k => k.includes("flutter"))) found.push("Flutter");
  if (keys.includes("express")) found.push("Express");
  if (keys.some(k => k.includes("tailwind"))) found.push("Tailwind");
  if (keys.includes("fastapi")) found.push("FastAPI");
  if (keys.includes("electron")) found.push("Electron");
  if (keys.includes("react-native")) found.push("React Native");
  if (keys.includes("tkinter")) found.push("Tkinter");
  return found;
}

function extractInfraFromDeps(deps: Record<string, string> | undefined): string[] {
  if (!deps) return [];
  const allKeys = [...Object.keys(deps), ...Object.values(deps)].map(s => s.toLowerCase());
  const found: string[] = [];
  if (allKeys.some(k => k.includes("vercel"))) found.push("Vercel");
  if (allKeys.some(k => k.includes("netlify"))) found.push("Netlify");
  if (allKeys.some(k => k.includes("supabase"))) found.push("Supabase");
  if (allKeys.some(k => k.includes("firebase"))) found.push("Firebase");
  if (allKeys.some(k => k.includes("aws") || k.includes("lambda"))) found.push("AWS");
  return found;
}

// ---------- stats helpers ----------

async function collectDeps(repos: RepoInfo[], headers: Record<string, string>): Promise<DepsResult[]> {
  return Promise.all(
    repos.map(async repo => {
      const repoOwner = repo.owner.login;
      const [pkg, pub] = await Promise.all([
        fetchJson(repoOwner, repo.name, "package.json", headers),
        fetchJson(repoOwner, repo.name, "pubspec.yaml", headers),
      ]);
      let fws: string[] = [];
      let infs: string[] = [];
      if (pkg) {
        fws = extractFrameworksFromDeps({ ...pkg.dependencies, ...pkg.devDependencies });
        infs = extractInfraFromDeps({ ...pkg.dependencies, ...pkg.devDependencies });
      }
      if (pub) {
        const dartDeps = { ...pub.dependencies, ...pub.dev_dependencies };
        const keys = Object.keys(dartDeps || {}).map(k => k.toLowerCase());
        if (keys.some(k => k.includes("flutter"))) fws.push("Flutter");
      }
      return { fws, infs, name: repo.name, desc: repo.description || "", lang: repo.language, topics: repo.topics || [], fork: repo.fork };
    })
  );
}

interface Counts {
  langCount: Record<string, number>;
  fwCount: Record<string, number>;
  pairCount: Record<string, number>;
  topicCount: Record<string, number>;
  infraSet: Set<string>;
}

interface Counters {
  totalLangs: number;
  projectCount: number;
}

function bump(counts: Record<string, number>, key: string) {
  counts[key] = (counts[key] || 0) + 1;
}

function countRepo(repo: RepoInfo, deps: DepsResult, counts: Counts, counters: Counters) {
  const lang = repo.language;
  if (lang && !NON_LANG.has(lang)) {
    bump(counts.langCount, lang);
    counters.totalLangs++;
  }

  for (const fw of deps.fws) {
    bump(counts.fwCount, fw);
    if (lang) {
      bump(counts.pairCount, `${lang} + ${fw}`);
    }
  }
  for (const inf of deps.infs) counts.infraSet.add(inf);

  if (!repo.fork) {
    counters.projectCount++;
    for (const t of deps.topics) {
      if (TOPIC_LABELS.has(t)) bump(counts.topicCount, t);
    }
  }
}

function buildStats(repos: RepoInfo[], depsResults: DepsResult[]) {
  const counts: Counts = {
    langCount: {}, fwCount: {}, pairCount: {}, topicCount: {}, infraSet: new Set<string>(),
  };
  const counters: Counters = { totalLangs: 0, projectCount: 0 };

  repos.forEach((repo, i) => countRepo(repo, depsResults[i], counts, counters));

  const langs: LangStat[] = Object.entries(counts.langCount)
    .map(([name, count]) => ({ name, pct: Math.round((count / counters.totalLangs) * 100), logo: LOGO_MAP[name] || "/img/langages/logo_c.png" }))
    .sort((a, b) => b.pct - a.pct).slice(0, 8);

  const frameworks: FrameworkStat[] = Object.entries(counts.fwCount)
    .map(([name, count]) => ({ name, count, pct: Math.round((count / repos.length) * 100), logo: FW_LOGOS[name] || "/img/langages/logo_c.png" }))
    .sort((a, b) => b.count - a.count);

  const bestPair = Object.entries(counts.pairCount).sort((a, b) => b[1] - a[1])[0];
  const stackSignature = bestPair ? bestPair[0] : (langs[0]?.name || "");

  return { langs, frameworks, infra: Array.from(counts.infraSet), stackSignature, projectCount: counters.projectCount, topics: counts.topicCount };
}

// ---------- GET ----------

const REPO_LIST_QUERY = "per_page=100&sort=updated";

function githubHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchRepos(): Promise<{ repos: RepoInfo[]; headers: Record<string, string> } | null> {
  const token = process.env.GITHUB_TOKEN;
  const candidates: Array<{ url: string; headers: Record<string, string> }> = [];
  if (token) {
    candidates.push({
      url: `https://api.github.com/user/repos?${REPO_LIST_QUERY}&visibility=all&affiliation=owner`,
      headers: githubHeaders(token),
    });
  }
  candidates.push({
    url: `https://api.github.com/users/frarthur/repos?${REPO_LIST_QUERY}`,
    headers: githubHeaders(),
  });

  for (const { url, headers } of candidates) {
    try {
      const res = await fetch(url, { headers, next: { revalidate: 3600 } });
      if (!res.ok) {
        console.error(`[github-langs] repos fetch failed: ${res.status} ${res.statusText} for ${url}`);
        continue;
      }
      const repos: RepoInfo[] = await res.json();
      if (repos.length) return { repos, headers };
      console.error(`[github-langs] repos fetch returned an empty list for ${url}`);
    } catch (e) {
      console.error(`[github-langs] repos fetch error for ${url}`, e);
    }
  }
  return null;
}

export async function GET() {
  try {
    const result = await fetchRepos();
    if (!result) throw new Error("No GitHub repos fetched");
    const depsResults = await collectDeps(result.repos, result.headers);

    return NextResponse.json(buildStats(result.repos, depsResults));
  } catch (e) {
    console.error("[github-langs] GET failed", e);
    return NextResponse.json({ langs: [], frameworks: [], infra: [], stackSignature: "", projectCount: 0, topics: {} });
  }
}
