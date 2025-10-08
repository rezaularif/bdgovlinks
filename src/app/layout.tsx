import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import PerformanceMonitorLoader from "@/components/PerformanceMonitorLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? "https://bdgovlinks.com" : "http://localhost:3000"),
  title: {
    template: "%s | BdGovLinks - Bangladesh Government Website Directory",
    default: "BdGovLinks - Unofficial Directory of Bangladesh Government Websites"
  },
  description: "Find all official government websites of Bangladesh in one place. Access government services, information, and resources. Unofficial directory for easy access to Bangladesh government portals.",
  keywords: [
    "Bangladesh government websites",
    "Bangladesh government directory",
    "Bangladesh official websites",
    "government services Bangladesh",
    "Bangladesh public services",
    "Bangladesh ministries",
    "Bangladesh government portal",
    "govbd",
    "bangladesh.gov.bd",
    "government website directory",
    "Bangladesh public administration"
  ],
  authors: [{ name: "Arif" }],
  creator: "Arif",
  publisher: "BdGovLinks",
  icons: {
    icon: [
      "/favicon.ico",
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/favicon-96x96.png", sizes: "180x180" }
    ],
    shortcut: [
      "/favicon.ico"
    ]
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bdgovlinks.com",
    title: "BdGovLinks - Unofficial Directory of Bangladesh Government Websites",
    description: "Find all official government websites of Bangladesh in one place. Access government services, information, and resources.",
    siteName: "BdGovLinks",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BdGovLinks - Bangladesh Government Website Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BdGovLinks - Unofficial Directory of Bangladesh Government Websites",
    description: "Find all official government websites of Bangladesh in one place. Access government services, information, and resources.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://bdgovlinks.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="fc54d9bb-b60c-4815-9bfd-a1a467cacb50"
        ></script>
      </head>
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <PerformanceMonitorLoader />
        </LanguageProvider>
      </body>
    </html>
  );
}
