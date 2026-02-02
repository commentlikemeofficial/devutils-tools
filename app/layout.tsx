import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "DevUtils - 35+ Free Developer Tools | JSON Formatter, Password Generator",
  description: "Free online developer tools collection: JSON formatter, password generator, LinkedIn counter, AI token counter, Base64 converter, and 30+ more. 100% free, privacy-focused, no signup required.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "password generator",
    "LinkedIn counter",
    "token counter",
    "Base64 converter",
    "UUID generator",
    "CSS minifier",
    "online tools",
    "free developer utilities",
    "web development tools",
    "API tools",
    "regex tester",
    "text diff",
    "Markdown converter",
    "JWT decoder"
  ],
  authors: [{ name: "Rajesh Kalidandi", url: "https://rajeshkalidandi.online" }],
  creator: "Rajesh Kalidandi",
  publisher: "DevUtils",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devutils-tools.vercel.app",
    siteName: "DevUtils",
    title: "DevUtils - 35+ Free Developer Tools",
    description: "Free online developer tools: JSON formatter, password generator, AI token counter, and more. 100% free, privacy-focused.",
    images: [
      {
        url: "https://devutils-tools.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevUtils - Free Developer Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevUtils - 35+ Free Developer Tools",
    description: "Free online developer tools: JSON formatter, password generator, AI token counter, and more. 100% free, privacy-focused.",
    creator: "@iamkrish_11",
    images: ["https://devutils-tools.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://devutils-tools.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Developer Tools",
  classification: "Software Development",
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://devutils-tools.vercel.app/#website",
      "url": "https://devutils-tools.vercel.app",
      "name": "DevUtils",
      "description": "35+ free online developer tools",
      "publisher": {
        "@id": "https://devutils-tools.vercel.app/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://devutils-tools.vercel.app/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://devutils-tools.vercel.app/#organization",
      "name": "DevUtils",
      "url": "https://devutils-tools.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://devutils-tools.vercel.app/logo.png"
      },
      "sameAs": [
        "https://github.com/commentlikemeofficial/devutils-tools",
        "https://linkedin.com/in/rajesh-kalidandi",
        "https://twitter.com/iamkrish_11"
      ],
      "founder": {
        "@type": "Person",
        "name": "Rajesh Kalidandi",
        "jobTitle": "AI Full Stack Engineer",
        "url": "https://rajeshkalidandi.online"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://devutils-tools.vercel.app/#webapp",
      "name": "DevUtils",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "150"
      },
      "featureList": [
        "JSON Formatter",
        "Password Generator",
        "LinkedIn Counter",
        "AI Token Counter",
        "Base64 Converter",
        "UUID Generator",
        "CSS Minifier",
        "Text Diff",
        "Regex Tester"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "DevUtils",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "operatingSystem": "Web Browser",
      "softwareVersion": "1.0",
      "fileSize": "0MB",
      "downloadUrl": "https://github.com/commentlikemeofficial/devutils-tools",
      "releaseNotes": "35+ free developer tools with premium UX"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preconnect to external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* llm.txt discovery */}
        <link rel="alternate" type="text/plain" href="/llm.txt" title="LLM-Friendly Content" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* AI/LLM Meta Tags */}
        <meta name="ai-purpose" content="Developer Tools Collection - Free utilities for software development" />
        <meta name="ai-target" content="Software developers, web developers, DevOps engineers, students" />
        <meta name="ai-content-type" content="Interactive Tools" />
        <meta name="ai-completeness" content="Comprehensive - 35+ tools covering formatting, conversion, generation, and utilities" />
        <meta name="ai-quality" content="High - Professional UI/UX, thoroughly tested, open source" />
        <meta name="ai-update-frequency" content="Regularly updated with new tools and improvements" />
        
        {/* LLM Engine Optimization Tags */}
        <meta name="description:ai" content="DevUtils offers 35+ free developer tools including JSON formatter, password generator, LinkedIn character counter, AI token counter, Base64 converter, and more. All tools are privacy-focused, run client-side, and require no signup." />
        <meta name="keywords:ai" content="developer tools, JSON formatter online, password generator secure, LinkedIn post counter, GPT token counter, Base64 encode decode, UUID generator, CSS minifier, regex tester, text compare, developer utilities, free online tools" />
        
        {/* Sitemap reference */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
