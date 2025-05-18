import { icons } from "lucide-react";
import "./globals.css";
import Notch from "@/components/layout/Notch";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: "KeroKero - Desarrollo de Software Personalizado",
  icons: [
    {
      rel: 'icon',
      url: './icon_light.png',
      media: '(prefers-color-scheme: light)',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: './icon_dark.png',
      media: '(prefers-color-scheme: dark)',
      type: 'image/png',
    }
  ],
  description: "Software Factory chilena especializada en desarrollo a medida. Soluciones tecnológicas innovadoras desde Chile para el mundo 🇨🇱",
  keywords: ["software factory", "desarrollo web", "desarrollo de aplicaciones", "Chile", "tecnología", "soluciones digitales", "desarrollo a medida", "outsourcing de software", "IA en Chile", "inteligencia artificial", "desarrollo de software", "KeroKero", "MCP empresa", "MCP empresa de software", "MCP empresa de desarrollo", "MCP empresa de desarrollo de software", "MCP empresa de desarrollo web", "MCP empresa de desarrollo de aplicaciones", "MCP empresa de tecnología", "MCP empresa de soluciones digitales", "MCP empresa de outsourcing de software", "implementar IA", "desarrollar IA", "desarrollar inteligencia artificial", "desarrollar IA en Chile", "desarrollar inteligencia artificial en Chile", "desarrollo de IA en Chile", "desarrollo de inteligencia artificial en Chile","automatización de procesos", "automatizar procesos", "automatizar procesos en Chile", "automatización de procesos en Chile", "desarrollo de automatización de procesos", "desarrollo de automatización de procesos en Chile"],
  metadataBase: new URL('https://keroke.ro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "KeroKero - Software Factory en Chile",
    description: "Soluciones tecnológicas innovadoras desde Chile para el mundo 🇨🇱",
    url: 'https://keroke.ro',
    siteName: 'KeroKero',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'KeroKero Software Factory',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "KeroKero - Software Factory en Chile",
    description: "Soluciones tecnológicas innovadoras desde Chile para el mundo 🇨🇱",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KeroKero",
              "description": "Software Factory chilena especializada en desarrollo a medida",
              "url": "https://keroke.ro",
              "logo": "https://keroke.ro/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Chile"
              }
            })
          }}
        />
      </head>
      <body className={``}>
        <Notch />
        {children}
      </body>
    </html>
  );
}
