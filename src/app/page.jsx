import SectionDots from '@/components/SectionDots';
import HeroSection from '@/components/home/HeroSection';
import IngredientsSection from '@/components/home/IngredientsSection';
import PainPointSection from '@/components/home/PainPointSection';
import TeamEffortSection from '@/components/home/TeamEffortSection';
import TrackingSection from '@/components/home/TrackingSection';
import CtaSection from '@/components/home/CtaSection';
import ContactSection from '@/components/home/ContactSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://keroke.ro';

export const metadata = {
  title: 'Software Factory Automatizada en Chile | KeroKero',
  description:
    'Desarrollo de software a medida en Chile: MVPs, automatizaciones, sistemas internos y productos IA. Un proceso simple, claro y sin burocracia.',
  keywords: [
    'software a medida chile',
    'desarrollo de software chile',
    'mvp chile',
    'automatizacion de procesos',
    'desarrollo web chile',
    'software factory',
    'productos con ia',
    'sistemas internos',
  ],
  openGraph: {
    title: 'KeroKero | Software Factory Automatizada en Chile',
    description:
      'Creamos software a medida para empresas y startups: de MVP a sistemas internos, con foco en velocidad, calidad y cero burocracia.',
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'KeroKero - Software Factory Automatizada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeroKero | Software Factory Automatizada en Chile',
    description:
      'Software a medida en Chile con un proceso claro, rapido y sin burocracia. MVPs, automatizaciones y sistemas internos.',
    images: ['/opengraph-image.png'],
  },
  alternates: {
    canonical: '/',
  },
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'KeroKero',
      url: siteUrl,
      logo: `${siteUrl}/favicon.png`,
      description:
        'Software factory en Chile para construir productos digitales, automatizar procesos y lanzar MVPs sin burocracia.',
      foundingDate: '2024',
      founder: {
        '@type': 'Person',
        name: 'Damián Panes',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CL',
      },
      sameAs: ['https://www.linkedin.com/in/damianpanes/'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: `${siteUrl}/contacto`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'KeroKero',
      inLanguage: 'es-CL',
      description:
        'Sitio oficial de KeroKero: desarrollo de software a medida, automatizaciones y productos IA para empresas y startups.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <SectionDots />
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
