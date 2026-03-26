import SectionDots from '@/components/SectionDots';
import HeroSection from '@/components/home/HeroSection';
import IngredientsSection from '@/components/home/IngredientsSection';
import PainPointSection from '@/components/home/PainPointSection';
import TeamEffortSection from '@/components/home/TeamEffortSection';
import TrackingSection from '@/components/home/TrackingSection';
import CtaSection from '@/components/home/CtaSection';
import ContactSection from '@/components/home/ContactSection';

// Schema.org JSON-LD para Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KeroKero",
  "url": "https://keroke.ro",
  "logo": "https://keroke.ro/favicon.png",
  "description": "La primera software factory en Chile completamente automatizada. Desarrollo de software sin burocracia.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Damián Panes"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CL"
  },
  "sameAs": [
    "https://www.linkedin.com/in/damianpanes/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://keroke.ro/contacto"
  }
};

export default function Home() {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SectionDots sections={6} />
      <main className="">
        <HeroSection />
        <IngredientsSection />
        <PainPointSection />
        <TeamEffortSection />
        <TrackingSection />
        <CtaSection />
        <ContactSection />
      </main>
    </>
  );
}
