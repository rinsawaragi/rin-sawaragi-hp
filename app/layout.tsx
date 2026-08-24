import type { Metadata } from "next";
import { Manrope, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { siteData } from "./site-data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.siteUrl),
  title: "Rin Sawaragi | Composer / Arranger",
  description:
    "作曲・編曲・作詞からMIX・マスタリングまで、オリジナル楽曲制作を一気通貫で承ります。Rin Sawaragiの作品、料金、制作フローをご案内します。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Rin Sawaragi | Composer / Arranger",
    description:
      "作曲・編曲・作詞からMIX・マスタリングまで、オリジナル楽曲制作を一気通貫で承ります。Rin Sawaragiの作品、料金、制作フローをご案内します。",
    images: [
      {
        url: siteData.assets.ogImage,
        width: 1200,
        height: 630,
        alt: "Rin Sawaragi | Composer / Arranger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rin Sawaragi | Composer / Arranger",
    description:
      "作曲・編曲・作詞からMIX・マスタリングまで、オリジナル楽曲制作を一気通貫で承ります。Rin Sawaragiの作品、料金、制作フローをご案内します。",
    images: [siteData.assets.ogImage],
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/assets/rs-logo.png",
    shortcut: "/assets/rs-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${manrope.variable} ${notoSansJp.variable}`}>
        {children}
      </body>
    </html>
  );
}
