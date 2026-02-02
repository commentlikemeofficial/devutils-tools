import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, FileJson, Hash, ArrowRight, Zap, Shield, Sparkles,
  ArrowRightLeft, Code, Type, Lock, Key, Globe, FileCode, Palette,
  Layout, Box, ImageIcon, Database, Table, Clock, Search, Fingerprint,
  Binary, FileText, Shuffle, Settings, Eye, Smartphone, Quote, AlignLeft,
  RefreshCw, HashIcon, Terminal, Braces, Text, FileDigit
} from "lucide-react";
import { useState } from "react";

export const metadata: Metadata = {
  title: "DevUtils - 35+ Free Developer Tools",
  description: "A comprehensive collection of 35+ free online tools for developers. JSON formatter, password generator, token counter, and more.",
};

const categories = [
  { id: "all", name: "All Tools", count: 35 },
  { id: "converters", name: "Converters", count: 12 },
  { id: "generators", name: "Generators", count: 10 },
  { id: "formatters", name: "Formatters", count: 6 },
  { id: "utilities", name: "Utilities", count: 7 },
];

const tools = [
  // Converters
  {
    name: "URL Encoder/Decoder",
    href: "/tools/url-encoderdecoder",
    icon: Globe,
    category: "converters",
    description: "Encode and decode URLs for safe web transmission",
    color: "bg-blue-500",
  },
  {
    name: "Base64 Converter",
    href: "/tools/base64",
    icon: Binary,
    category: "converters",
    description: "Encode/decode Base64 text",
    color: "bg-purple-500",
  },
  {
    name: "Image to Base64",
    href: "/tools/image-to-base64-converter",
    icon: ImageIcon,
    category: "converters",
    description: "Convert images to Base64 strings",
    color: "bg-pink-500",
  },
  {
    name: "Base64 to Image",
    href: "/tools/base64-to-image-converter",
    icon: ImageIcon,
    category: "converters",
    description: "Decode Base64 back to images",
    color: "bg-rose-500",
  },
  {
    name: "CSV to JSON",
    href: "/tools/csv-to-json-converter",
    icon: Table,
    category: "converters",
    description: "Convert CSV data to JSON format",
    color: "bg-green-500",
  },
  {
    name: "JSON to CSV",
    href: "/tools/json-to-csv-converter",
    icon: Database,
    category: "converters",
    description: "Convert JSON to CSV format",
    color: "bg-emerald-500",
  },
  {
    name: "Markdown to HTML",
    href: "/tools/markdown-to-html-converter",
    icon: FileCode,
    category: "converters",
    description: "Convert Markdown to HTML",
    color: "bg-orange-500",
  },
  {
    name: "HTML to Markdown",
    href: "/tools/html-to-markdown",
    icon: FileText,
    category: "converters",
    description: "Convert HTML back to Markdown",
    color: "bg-amber-500",
  },
  {
    name: "HTML Entity Encoder",
    href: "/tools/html-entity-encoderdecoder",
    icon: Code,
    category: "converters",
    description: "Encode special HTML characters",
    color: "bg-cyan-500",
  },
  {
    name: "Text Case Converter",
    href: "/tools/text-case-converter",
    icon: Type,
    category: "converters",
    description: "Convert between cases: camel, snake, kebab",
    color: "bg-indigo-500",
  },
  {
    name: "Slug Generator",
    href: "/tools/slug-generator",
    icon: LinkIcon,
    category: "converters",
    description: "Create URL-friendly slugs",
    color: "bg-violet-500",
  },
  {
    name: "JWT Decoder",
    href: "/tools/jwt-decoder",
    icon: Key,
    category: "converters",
    description: "Decode JWT tokens to view payload",
    color: "bg-teal-500",
  },
  // Generators
  {
    name: "Password Generator",
    href: "/tools/password-generator",
    icon: Lock,
    category: "generators",
    description: "Generate secure random passwords",
    color: "bg-red-500",
  },
  {
    name: "UUID Generator",
    href: "/tools/uuid-generator",
    icon: Fingerprint,
    category: "generators",
    description: "Generate UUID v4 identifiers",
    color: "bg-blue-600",
  },
  {
    name: "Color Palette",
    href: "/tools/color-palette-generator",
    icon: Palette,
    category: "generators",
    description: "Generate beautiful color palettes",
    color: "bg-pink-600",
  },
  {
    name: "CSS Box Shadow",
    href: "/tools/css-box-shadow-generator",
    icon: Box,
    category: "generators",
    description: "Create CSS box-shadow styles",
    color: "bg-slate-500",
  },
  {
    name: "Flexbox Generator",
    href: "/tools/flexbox-generator",
    icon: Layout,
    category: "generators",
    description: "Generate CSS flexbox layouts",
    color: "bg-indigo-600",
  },
  {
    name: "Gradient Generator",
    href: "/tools/gradient-generator",
    icon: Sparkles,
    category: "generators",
    description: "Create CSS gradients",
    color: "bg-purple-600",
  },
  {
    name: "Lorem Ipsum",
    href: "/tools/lorem-ipsum-generator",
    icon: AlignLeft,
    category: "generators",
    description: "Generate placeholder text",
    color: "bg-gray-500",
  },
  {
    name: "Meta Tags",
    href: "/tools/meta-tag-generator",
    icon: Search,
    category: "generators",
    description: "Generate SEO meta tags",
    color: "bg-green-600",
  },
  {
    name: "robots.txt",
    href: "/tools/robots.txt-generator",
    icon: Settings,
    category: "generators",
    description: "Generate robots.txt files",
    color: "bg-stone-500",
  },
  {
    name: "Cron Expression",
    href: "/tools/cron-expression-parser",
    icon: Clock,
    category: "generators",
    description: "Parse and generate cron schedules",
    color: "bg-yellow-600",
  },
  // Formatters
  {
    name: "JSON Formatter",
    href: "/tools/json-formatter",
    icon: FileJson,
    category: "formatters",
    description: "Format and validate JSON",
    color: "bg-green-500",
  },
  {
    name: "CSS Minifier",
    href: "/tools/css-minifier",
    icon: Palette,
    category: "formatters",
    description: "Minify CSS code",
    color: "bg-blue-500",
  },
  {
    name: "JS Minifier",
    href: "/tools/javascript-minifier",
    icon: FileCode,
    category: "formatters",
    description: "Minify JavaScript code",
    color: "bg-yellow-500",
  },
  {
    name: "SQL Formatter",
    href: "/tools/sql-formatter",
    icon: Database,
    category: "formatters",
    description: "Format SQL queries",
    color: "bg-cyan-600",
  },
  {
    name: "Text Diff",
    href: "/tools/text-diff",
    icon: ArrowRightLeft,
    category: "formatters",
    description: "Compare text differences",
    color: "bg-orange-500",
  },
  {
    name: "Regex Tester",
    href: "/tools/regex-tester",
    icon: Search,
    category: "formatters",
    description: "Test regular expressions",
    color: "bg-violet-600",
  },
  // Utilities
  {
    name: "LinkedIn Counter",
    href: "/tools/linkedin-counter",
    icon: Linkedin,
    category: "utilities",
    description: "Count LinkedIn post characters",
    color: "bg-blue-700",
  },
  {
    name: "Token Counter",
    href: "/tools/token-counter",
    icon: Hash,
    category: "utilities",
    description: "Count AI tokens for GPT/Claude",
    color: "bg-purple-700",
  },
  {
    name: "Word Counter",
    href: "/tools/word-counter",
    icon: Text,
    category: "utilities",
    description: "Count words and characters",
    color: "bg-indigo-500",
  },
  {
    name: "Line Counter",
    href: "/tools/line-counter",
    icon: AlignLeft,
    category: "utilities",
    description: "Count lines in text",
    color: "bg-teal-600",
  },
  {
    name: "Character Frequency",
    href: "/tools/character-frequency-analyzer",
    icon: BarChartIcon,
    category: "utilities",
    description: "Analyze character usage",
    color: "bg-amber-600",
  },
  {
    name: "Screen Resolution",
    href: "/tools/screen-resolution-detector",
    icon: Smartphone,
    category: "utilities",
    description: "Detect your screen specs",
    color: "bg-red-600",
  },
  {
    name: "HTTP Status",
    href: "/tools/http-status-code-checker",
    icon: Globe,
    category: "utilities",
    description: "Check HTTP status codes",
    color: "bg-emerald-600",
  },
];

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function ClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                         tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            DevUtils
          </Link>
          <Badge variant="secondary">35 Tools</Badge>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Developer Tools
            <span className="text-primary block mt-2">That Just Work</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            35+ free, fast, and privacy-focused tools for developers. 
            No ads, no tracking, no signup required.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-70">({cat.id === "all" ? 35 : cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-muted group-hover:border-primary/20">
                  <CardHeader className="pb-3">
                    <div className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center mb-3 text-white shadow-sm`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-1">
                      {tool.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No tools found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" /> Fast
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" /> Private
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Free
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ClientPage;
