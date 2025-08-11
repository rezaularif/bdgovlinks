import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://govbd.gov.bd"),
  title: {
    template: "%s | BdGovLinks - Bangladesh Government Website Directory",
    default: "BdGovLinks - Official Directory of Bangladesh Government Websites"
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
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
    url: "https://govbd.gov.bd", // Replace with your actual domain
    title: "BdGovLinks - Official Directory of Bangladesh Government Websites",
    description: "Find all official government websites of Bangladesh in one place. Access government services, information, and resources.",
    siteName: "BdGovLinks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BdGovLinks - Bangladesh Government Website Directory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "BdGovLinks - Bangladesh Government Website Directory",
    description: "Find all official government websites of Bangladesh in one place. Access government services, information, and resources.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "https://govbd.gov.bd", // Replace with your actual domain
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}