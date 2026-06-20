import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Arthur Fresse - Portfolio",
  description:
    "Portfolio d'Arthur Fresse, Ingenieur Generaliste. Passionne par l'innovation, le developpement durable et les solutions logicielles.",
  keywords:
    "Arthur Fresse, Ingenieur Generaliste, Portfolio, ESTIA, Hypocaps, Python, Java, Developpement Web",
  authors: [{ name: "Arthur Fresse" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    siteName: "Arthur Fresse",
    title: "Arthur Fresse - Portfolio",
    description:
      "Decouvrez le parcours, les projets et les competences d'Arthur Fresse, Ingenieur Generaliste.",
    url: "https://frarthur.github.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthur Fresse - Portfolio",
    description:
      "Decouvrez le parcours, les projets et les competences d'Arthur Fresse, Ingenieur Generaliste.",
  },
  other: {
    "theme-color": "#121212",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <Script
          strategy="afterInteractive"
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          crossOrigin="anonymous"
        />
        <Script
          strategy="afterInteractive"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          crossOrigin="anonymous"
          noModule
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
