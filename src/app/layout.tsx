import type { Metadata, Viewport } from "next";
import { Allerta_Stencil, Geist, Geist_Mono } from "next/font/google";
import { asset, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const stencil = Allerta_Stencil({
  variable: "--font-allerta-stencil",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.tagline}`,
  description:
    "MecDu.Dev, fondée en 2023 par Amaury MAIZY (ExostFlash) : développement backend, création front-end et hébergement de sites avec liens et adresses email.",
  icons: { icon: asset("/images/New.png") },
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    images: [asset("/images/New.png")],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${stencil.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
