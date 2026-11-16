import type { Metadata } from "next";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand.config";
import { AppProvider } from "@/context/AppContext";
import { AIModalProvider } from "@/context/AIModalContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
      <body className="min-h-screen bg-slate-50 dark:bg-[#0d0f14] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-950 dark:selection:text-indigo-200">
        <ThemeProvider>
          <AppProvider>
            <AIModalProvider>
              <AppShell>{children}</AppShell>
            </AIModalProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
