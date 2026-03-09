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
  title: "NextFramee | Immersive VR & 3D Visualization Studio India",
  description:
    "NextFramee creates interactive VR walkthroughs and real-time 3D visualizations for real estate developers and architects across Nashik, Mumbai, Vapi, and Ahmedabad. Explore your future space before it is built.",
  keywords: [
    "VR walkthrough",
    "3D visualization",
    "real estate VR",
    "architectural visualization",
    "immersive walkthrough",
    "pixel streaming",
    "plot streaming",
    "NextFramee",
    "Nashik",
    "Mumbai",
    "Vapi",
    "Ahmedabad",
  ],
  authors: [{ name: "NextFramee Studio" }],
  creator: "NextFramee Studio",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "NextFramee | Immersive VR & 3D Visualization Studio India",
    description:
      "Interactive VR walkthroughs and real-time 3D visualizations — explore your future space before it is built. Serving Nashik, Mumbai, Vapi & Ahmedabad.",
    siteName: "NextFramee",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextFramee | Immersive VR & 3D Visualization Studio India",
    description:
      "Interactive VR walkthroughs and real-time 3D visualizations — explore your future space before it is built.",
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
