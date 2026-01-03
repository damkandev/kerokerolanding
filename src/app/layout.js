import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { PostHogProvider } from "@/components/PostHogProvider";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://keroke.ro";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KeroKero - Software Factory Automatizada",
    template: "%s | KeroKero",
  },
  description:
    "la primera software factory en Chile completamente automatizada. Desarrollo de software sin burocracia: MVPs, sistemas de control, asistentes IA, chatbots y más.",
  keywords: [
    "software factory",
    "desarrollo de software Chile",
    "software automatizado",
    "MVP startup",
    "chatbot IA",
    "asistente virtual empresas",
    "desarrollo web Chile",
    "automatización procesos",
    "KeroKero",
    "software a medida",
  ],
  authors: [{ name: "KeroKero", url: siteUrl }],
  creator: "KeroKero",
  publisher: "KeroKero",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "KeroKero",
    title: "KeroKero - Software Factory Automatizada",
    description:
      "La primera software factory en Chile completamente automatizada. Menos burocracia, más código.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "KeroKero - Software Factory Automatizada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KeroKero - Software Factory Automatizada",
    description:
      "La primera software factory en Chile completamente automatizada. Menos burocracia, más código.",
    images: ["/opengraph-image.png"],
    creator: "",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
      >
        <PostHogProvider>
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </PostHogProvider>
      </body>
    </html>
  );
}
