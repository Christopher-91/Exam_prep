import type { Metadata } from "next";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand.config";
import { AppProvider } from "@/context/AppContext";
import { AIModalProvider } from "@/context/AIModalContext";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
  description: BRAND_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <AppProvider>
          <AIModalProvider>
            <AppShell>{children}</AppShell>
          </AIModalProvider>
        </AppProvider>
      </body>
    </html>
  );
}
