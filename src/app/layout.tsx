import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { I18nProvider } from "@/lib/i18n";

/* English primary font — Outfit (closest open alternative to Amsi Pro) */
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

/* Arabic primary font — Cairo */
const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Vega Gaming Arena — ساحة فيغا للألعاب",
  description:
    "Premium gaming arena in Baghdad featuring high-end gaming stations, specialty coffee, and esports events. ساحة ألعاب متميزة في بغداد.",
  icons: {
    icon: "/icon.webp",
    shortcut: "/favicon.ico",
    apple: "/icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070708] text-[#F8FAFC]">
        {/* Background Film Grain Overlay */}
        <div className="noise-overlay" />

        {/* Interactive Custom Cursor */}
        <CustomCursor />

        {/* Language Provider wraps everything */}
        <I18nProvider>
          {/* Smooth Scrolling Container */}
          <SmoothScroll>
            <div className="flex-grow flex flex-col relative z-10">
              {children}
            </div>
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
