import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import { ThemeProvider } from "@/shared/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/shared/components/providers/SmoothScrollProvider";
import { GSAPProvider } from "@/shared/components/providers/GSAPProvider";
import { Preloader } from "@/shared/components/layout/Preloader";
import { Cursor } from "@/shared/components/layout/Cursor";
import { RouteProgress } from "@/shared/components/layout/RouteProgress";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { SITE } from "@/shared/constants/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Engineering Digital Excellence`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  generator: "Next.js",
  keywords: [
    "software engineering",
    "web development",
    "mobile apps",
    "cloud",
    "UI/UX design",
    "SOFZENIX",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Engineering Digital Excellence`,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/icon.svg" },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-text antialiased">
        <ThemeProvider>
          <GSAPProvider>
            <SmoothScrollProvider>
              <Suspense fallback={null}>
                <RouteProgress />
              </Suspense>
              <Preloader />
              <Cursor />
              <Navbar />
              <main className="relative">{children}</main>
              <Footer />
            </SmoothScrollProvider>
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}