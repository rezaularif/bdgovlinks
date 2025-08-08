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
  title: {
    template: "%s | GovBD - Bangladesh Government Website Directory",
    default: "GovBD - Official Directory of Bangladesh Government Websites"
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
  publisher: "GovBD",
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
    title: "GovBD - Official Directory of Bangladesh Government Websites",
    description: "Find all official government websites of Bangladesh in one place. Access government services, information, and resources.",
    siteName: "GovBD",
  },
  twitter: {
    card: "summary_large_image",
    title: "GovBD - Bangladesh Government Website Directory",
    description: "Find all official government websites of Bangladesh in one place. Access government services, information, and resources.",
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