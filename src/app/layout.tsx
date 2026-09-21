import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/care/site-footer";
import { SiteHeader } from "@/components/care/site-header";
import { REGIONS } from "@/lib/catalog/regions";
import { CARE_CASES } from "@/lib/seo/cases";
import { CARE_FAQS, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cityKeywords = REGIONS.flatMap((region) => [
  `dentista em ${region.city}`,
  `dentista ${region.city}`,
  `clínica odontológica em ${region.city}`,
]);
const treatmentKeywords = CARE_CASES.flatMap((item) => [
  item.googleQuery,
  item.title.toLowerCase(),
]);

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Dentista perto de você | OdontoHub Care",
    template: "%s · OdontoHub Care",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "dentista",
    "encontrar dentista",
    "dentista perto de mim",
    "marcar consulta dentista",
    "OdontoHub Care",
    "OdontoHub",
    ...treatmentKeywords,
    ...cityKeywords,
  ],
  authors: [{ name: "OdontoHub" }],
  category: "health",
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.domain,
    siteName: SITE.name,
    title: "Dentista para o seu tratamento | OdontoHub Care",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentista para o seu tratamento | OdontoHub Care",
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.domain,
    languages: { "pt-BR": SITE.domain },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": `${SITE.domain}/#organization`,
      name: "OdontoHub Care",
      url: SITE.domain,
      description: SITE.description,
      areaServed: "BR",
      parentOrganization: {
        "@type": "Organization",
        name: "OdontoHub",
        url: SITE.hubWww,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.domain}/#website`,
      name: SITE.name,
      url: SITE.domain,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE.domain}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE.domain}/buscar?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    faqJsonLd(CARE_FAQS),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className={`${inter.className} flex min-h-full flex-col bg-[#f5f5f7] text-[#1d1d1f]`}>
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
