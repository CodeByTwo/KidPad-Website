import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kidpad.app";
const DESCRIPTION =
  "KidPad is a playful learning app for young children — a screen of big, colourful apps to explore, from a pretend camera and phone to drawing, clocks, counting and more. Offline, private and parent-protected.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KidPad — Have Fun and Learn",
  description: DESCRIPTION,
  applicationName: "KidPad",
  keywords: [
    "KidPad",
    "kids app",
    "children's learning app",
    "toddler app",
    "educational app",
    "offline kids app",
  ],
  openGraph: {
    title: "KidPad — Have Fun and Learn",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "KidPad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KidPad — Have Fun and Learn",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff6e5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="page-bg">{children}</div>
      </body>
    </html>
  );
}
