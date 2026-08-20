import {
  CaseStudies,
  Header,
  Hero,
  Methodology,
  PaperShader,
  PlaceholderSections,
} from "../components/landing";
import { site } from "../lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  description: site.description,
  areaServed: ["CL", "AR", "PE"],
  knowsAbout: [
    "Software a medida",
    "Sistemas de apoyo a decisiones",
    "Modelos de datos",
    "Automatización de procesos",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    availableLanguage: ["es"],
    areaServed: ["CL", "AR", "PE"],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background px-3 font-sans text-kk-text sm:px-6 lg:px-10 2xl:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-[1132px] border-x border-kk-border bg-kk-canvas lg:max-w-[1240px]">
        <Header currentPath="/" />
        <Hero />
        <CaseStudies />
        <Methodology />
        <PlaceholderSections />
      </div>
      <PaperShader />
    </main>
  );
}
