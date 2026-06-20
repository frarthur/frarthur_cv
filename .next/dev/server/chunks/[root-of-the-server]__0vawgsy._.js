module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/github-langs/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const LOGO_MAP = {
    Python: "/img/langages/logo_python.png",
    JavaScript: "/img/langages/logo_js.png",
    TypeScript: "/img/langages/logo_js.png",
    Java: "/img/langages/logo_java.png",
    "C++": "/img/langages/logo_c.png",
    C: "/img/langages/logo_c.png",
    "C#": "/img/langages/logo_cs.png",
    HTML: "/img/langages/logo_htmlcss.png",
    CSS: "/img/langages/logo_htmlcss.png",
    PHP: "/img/langages/logo_slqphp.png",
    Dart: "/img/langages/logo_dart.png",
    Kotlin: "/img/langages/logo_kotlin.png",
    Lua: "/img/langages/logo_lua.png",
    Vue: "/img/langages/logo_vue.png"
};
const NON_LANG = new Set([
    "Dockerfile",
    "Makefile",
    "CMake",
    "Shell",
    "Jupyter Notebook"
]);
const FW_LOGOS = {
    "Next.js": "/img/frameworks/logo_nextjs.png",
    Flutter: "/img/frameworks/logo_flutter.png",
    React: "/img/frameworks/logo_react.png",
    "Vue.js": "/img/frameworks/logo_vue.png",
    "Node.js": "/img/frameworks/logo_nodejs.png",
    Express: "/img/frameworks/logo_express.png",
    Tkinter: "/img/langages/logo_python.png",
    Processing: "/img/frameworks/logo_processing.png",
    "ESP32 / Arduino": "/img/frameworks/logo_arduino.png",
    "Power Apps": "/img/logiciels/logo_power.png",
    Tailwind: "/img/frameworks/logo_tailwind.png",
    FastAPI: "/img/frameworks/logo_fastapi.png",
    Electron: "/img/frameworks/logo_electron.png",
    "React Native": "/img/frameworks/logo_react.png"
};
// ---------- detect framework & infra from package.json / pubspec.yaml ----------
async function fetchJson(owner, repo, path, headers) {
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers,
            next: {
                revalidate: 3600
            }
        });
        if (!res.ok) return null;
        const data = await res.json();
        const buf = Buffer.from(data.content, "base64");
        return JSON.parse(buf.toString("utf-8"));
    } catch  {
        return null;
    }
}
function extractFrameworksFromDeps(deps) {
    if (!deps) return [];
    const keys = Object.keys(deps).map((k)=>k.toLowerCase());
    const found = [];
    if (keys.some((k)=>k === "next")) found.push("Next.js");
    if (keys.some((k)=>k === "react" || k === "react-dom")) found.push("React");
    if (keys.some((k)=>k === "vue")) found.push("Vue.js");
    if (keys.some((k)=>k.includes("flutter") || k === "flutter")) found.push("Flutter");
    if (keys.some((k)=>k === "express")) found.push("Express");
    if (keys.some((k)=>k === "tailwindcss" || k.includes("tailwind"))) found.push("Tailwind");
    if (keys.some((k)=>k === "fastapi")) found.push("FastAPI");
    if (keys.some((k)=>k === "electron")) found.push("Electron");
    if (keys.some((k)=>k === "react-native")) found.push("React Native");
    if (keys.some((k)=>k === "tkinter")) found.push("Tkinter");
    return found;
}
function extractInfraFromDeps(deps) {
    if (!deps) return [];
    const allKeys = [
        ...Object.keys(deps),
        ...Object.values(deps)
    ].map((s)=>s.toLowerCase());
    const found = [];
    if (allKeys.some((k)=>k.includes("vercel"))) found.push("Vercel");
    if (allKeys.some((k)=>k.includes("netlify"))) found.push("Netlify");
    if (allKeys.some((k)=>k.includes("supabase"))) found.push("Supabase");
    if (allKeys.some((k)=>k.includes("firebase"))) found.push("Firebase");
    if (allKeys.some((k)=>k.includes("aws") || k.includes("lambda"))) found.push("AWS");
    return found;
}
async function GET() {
    try {
        const token = process.env.GITHUB_TOKEN;
        const owner = token ? "" : "frarthur";
        const headers = {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "portfolio"
        };
        if (token) headers.Authorization = `Bearer ${token}`;
        const url = token ? "https://api.github.com/user/repos?per_page=100&sort=updated&visibility=all&affiliation=owner" : `https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`;
        const res = await fetch(url, {
            headers,
            next: {
                revalidate: 3600
            }
        });
        if (!res.ok) throw new Error("GitHub API error");
        const repos = await res.json();
        // fetch all package.json + pubspec.yaml in parallel
        const depsResults = await Promise.all(repos.map(async (repo)=>{
            const repoOwner = repo.owner.login;
            const [pkg, pub] = await Promise.all([
                fetchJson(repoOwner, repo.name, "package.json", headers),
                fetchJson(repoOwner, repo.name, "pubspec.yaml", headers)
            ]);
            let fws = [];
            let infs = [];
            if (pkg) {
                fws = extractFrameworksFromDeps({
                    ...pkg.dependencies,
                    ...pkg.devDependencies
                });
                infs = extractInfraFromDeps({
                    ...pkg.dependencies,
                    ...pkg.devDependencies
                });
            }
            if (pub) {
                const dartDeps = {
                    ...pub.dependencies,
                    ...pub.dev_dependencies
                };
                const keys = Object.keys(dartDeps || {}).map((k)=>k.toLowerCase());
                if (keys.some((k)=>k.includes("flutter"))) fws.push("Flutter");
            }
            return {
                fws,
                infs,
                name: repo.name,
                desc: repo.description || "",
                lang: repo.language,
                topics: repo.topics || [],
                fork: repo.fork
            };
        }));
        const langCount = {};
        const fwCount = {};
        const infraSet = new Set();
        const pairCount = {};
        const topicCount = {};
        const TOPIC_LABELS = [
            "completed",
            "in-progress",
            "maintenance",
            "archived"
        ];
        let totalLangs = 0;
        let projectCount = 0;
        for(let i = 0; i < repos.length; i++){
            const repo = repos[i];
            const deps = depsResults[i];
            const lang = repo.language;
            if (lang && !NON_LANG.has(lang)) {
                langCount[lang] = (langCount[lang] || 0) + 1;
                totalLangs++;
            }
            const fws = deps.fws;
            for (const fw of fws){
                fwCount[fw] = (fwCount[fw] || 0) + 1;
                // Track compatible lang+fw pairs per repo
                if (lang) {
                    const pair = `${lang} + ${fw}`;
                    pairCount[pair] = (pairCount[pair] || 0) + 1;
                }
            }
            for (const inf of deps.infs)infraSet.add(inf);
            if (!repo.fork) {
                projectCount++;
                for (const t of deps.topics){
                    if (TOPIC_LABELS.includes(t)) topicCount[t] = (topicCount[t] || 0) + 1;
                }
            }
        }
        const langs = Object.entries(langCount).map(([name, count])=>({
                name,
                pct: Math.round(count / totalLangs * 100),
                logo: LOGO_MAP[name] || "/img/langages/logo_c.png"
            })).sort((a, b)=>b.pct - a.pct).slice(0, 8);
        const frameworks = Object.entries(fwCount).map(([name, count])=>({
                name,
                count,
                pct: Math.round(count / repos.length * 100),
                logo: FW_LOGOS[name] || "/img/langages/logo_c.png"
            })).sort((a, b)=>b.count - a.count);
        // Best pair = the lang+framework combo that actually appears together in the most repos
        const bestPair = Object.entries(pairCount).sort((a, b)=>b[1] - a[1])[0];
        const stackSignature = bestPair ? bestPair[0] : langs[0]?.name || "";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            langs,
            frameworks,
            infra: Array.from(infraSet),
            stackSignature,
            projectCount,
            topics: topicCount
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            langs: [],
            frameworks: [],
            infra: [],
            stackSignature: "",
            projectCount: 0,
            topics: {}
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0vawgsy._.js.map