import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevUtils - Essential Tools for Developers",
  description: "A collection of free online tools for developers including LinkedIn character counter, JSON formatter, and AI token counter.",
  keywords: ["developer tools", "JSON formatter", "LinkedIn counter", "token counter", "AI tools"],
  authors: [{ name: "DevUtils" }],
  openGraph: {
    title: "DevUtils - Essential Tools for Developers",
    description: "Free online tools to boost your productivity",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} DevUtils. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with Next.js + shadcn/ui
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
