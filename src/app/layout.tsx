import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://next-frame-3-d.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NextFrame | Immersive VR & 3D Visualization Studio India",
  description:
    "NextFrame creates interactive VR walkthroughs and real-time 3D visualizations for real estate developers and architects across Nashik, Mumbai, and Vapi. Explore your future space before it is built.",
  keywords: [
    "VR walkthrough",
    "3D visualization",
    "real estate VR",
    "architectural visualization",
    "immersive walkthrough",
    "pixel streaming",
    "plot streaming",
    "NextFrame",
    "Nashik",
    "Mumbai",
    "Vapi",
  ],
  authors: [{ name: "NextFrame Studio" }],
  creator: "NextFrame Studio",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "NextFrame | Immersive VR & 3D Visualization Studio India",
    description:
      "Interactive VR walkthroughs and real-time 3D visualizations — explore your future space before it is built. Serving Nashik, Mumbai & Vapi.",
    siteName: "NextFrame",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NextFrame — Experience Tomorrow Today | VR & 3D Visualization Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextFrame | Immersive VR & 3D Visualization Studio India",
    description:
      "Interactive VR walkthroughs and real-time 3D visualizations — explore your future space before it is built.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
