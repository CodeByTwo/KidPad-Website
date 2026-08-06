import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import {
  DESCRIPTION,
  HOME_TITLE,
  PUBLISHER,
  PUBLISHER_URL,
  SITE_NAME,
  SITE_URL,
  TAGLINE,
} from "./lib/seo";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PUBLISHER, url: PUBLISHER_URL }],
  creator: PUBLISHER,
  publisher: PUBLISHER,
  category: "education",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "KidPad",
    "kids app",
    "children's learning app",
    "toddler app",
    "toddler learning app",
    "educational app for kids",
    "offline kids app",
    "safe app for children",
    "ad-free kids app",
    "pretend play app",
    "app for 2 year olds",
    "app for 3 year olds",
  ],
  openGraph: {
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
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
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff6e5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${baloo.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="page-bg">{children}</div>
      </body>
      <GoogleAnalytics gaId="G-755FYMV4EG" />
    </html>
  );
}
