import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/care/site-footer";
import { SiteHeader } from "@/components/care/site-header";
import { SITE } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "OdontoHub Care — Os dentistas certos. Para o seu caso.",
    template: "%s · OdontoHub Care",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "dentista em Taubaté",
    "dentista para limpeza",
    "dentista para extração",
    "dentista para aparelho",
    "dentista para implante",
    "dentista verificado",
    "OdontoHub Care",
  ],
  authors: [{ name: "OdontoHub" }],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.domain,
    siteName: SITE.name,
    title: SITE.slogan,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.slogan,
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.domain,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.domain}/#organization`,
      name: "OdontoHub Care",
      url: SITE.domain,
      parentOrganization: {
        "@type": "Organization",
        name: "OdontoHub",
        url: SITE.hubWww,
      },
      description: SITE.description,
    },
    {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.domain,
      inLanguage: "pt-BR",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE.domain}/buscar?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className={`${inter.className} flex min-h-full flex-col bg-black text-[#f5f5f7]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <div id="conteudo" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
