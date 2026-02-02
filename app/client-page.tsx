"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, FileJson, Hash, Zap, Shield, Sparkles, Github, Twitter,
  ArrowRightLeft, Code, Type, Lock, Key, Globe, FileCode, Palette,
  Layout, Box, ImageIcon, Database, Table, Clock, Search, Fingerprint,
  Binary, FileText, Settings, Smartphone, AlignLeft, ArrowRight,
  Text, BarChart3, Link2, Heart, Mail, ExternalLink, ChevronDown
} from "lucide-react";

const categories = [
  { id: "all", name: "All Tools", count: 35 },
  { id: "converters", name: "Converters", count: 12 },
  { id: "generators", name: "Generators", count: 10 },
  { id: "formatters", name: "Formatters", count: 6 },
  { id: "utilities", name: "Utilities", count: 7 },
];

const tools = [
  { name: "URL Encoder/Decoder", href: "/tools/url-encoderdecoder", icon: Globe, category: "converters", description: "Encode and decode URLs for safe web transmission", color: "bg-blue-500", popular: true },
  { name: "Base64 Converter", href: "/tools/base64", icon: Binary, category: "converters", description: "Encode/decode Base64 text", color: "bg-purple-500" },
  { name: "Image to Base64", href: "/tools/image-to-base64-converter", icon: ImageIcon, category: "converters", description: "Convert images to Base64 strings", color: "bg-pink-500" },
  { name: "Base64 to Image", href: "/tools/base64-to-image-converter", icon: ImageIcon, category: "converters", description: "Decode Base64 back to images", color: "bg-rose-500" },
  { name: "CSV to JSON", href: "/tools/csv-to-json-converter", icon: Table, category: "converters", description: "Convert CSV data to JSON format", color: "bg-green-500" },
  { name: "JSON to CSV", href: "/tools/json-to-csv-converter", icon: Database, category: "converters", description: "Convert JSON to CSV format", color: "bg-emerald-500" },
  { name: "Markdown to HTML", href: "/tools/markdown-to-html-converter", icon: FileCode, category: "converters", description: "Convert Markdown to HTML", color: "bg-orange-500" },
  { name: "HTML to Markdown", href: "/tools/html-to-markdown", icon: FileText, category: "converters", description: "Convert HTML back to Markdown", color: "bg-amber-500" },
  { name: "HTML Entity Encoder", href: "/tools/html-entity-encoderdecoder", icon: Code, category: "converters", description: "Encode special HTML characters", color: "bg-cyan-500" },
  { name: "Text Case Converter", href: "/tools/text-case-converter", icon: Type, category: "converters", description: "Convert between cases: camel, snake, kebab", color: "bg-indigo-500" },
  { name: "Slug Generator", href: "/tools/slug-generator", icon: Link2, category: "converters", description: "Create URL-friendly slugs", color: "bg-violet-500" },
  { name: "JWT Decoder", href: "/tools/jwt-decoder", icon: Key, category: "converters", description: "Decode JWT tokens to view payload", color: "bg-teal-500", popular: true },
  { name: "Password Generator", href: "/tools/password-generator", icon: Lock, category: "generators", description: "Generate secure random passwords", color: "bg-red-500", popular: true },
  { name: "UUID Generator", href: "/tools/uuid-generator", icon: Fingerprint, category: "generators", description: "Generate UUID v4 identifiers", color: "bg-blue-600" },
  { name: "Color Palette", href: "/tools/color-palette-generator", icon: Palette, category: "generators", description: "Generate beautiful color palettes", color: "bg-pink-600" },
  { name: "CSS Box Shadow", href: "/tools/css-box-shadow-generator", icon: Box, category: "generators", description: "Create CSS box-shadow styles", color: "bg-slate-500" },
  { name: "Flexbox Generator", href: "/tools/flexbox-generator", icon: Layout, category: "generators", description: "Generate CSS flexbox layouts", color: "bg-indigo-600" },
  { name: "Gradient Generator", href: "/tools/gradient-generator", icon: Sparkles, category: "generators", description: "Create CSS gradients", color: "bg-purple-600" },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum-generator", icon: AlignLeft, category: "generators", description: "Generate placeholder text", color: "bg-gray-500" },
  { name: "Meta Tags", href: "/tools/meta-tag-generator", icon: Search, category: "generators", description: "Generate SEO meta tags", color: "bg-green-600" },
  { name: "robots.txt", href: "/tools/robots.txt-generator", icon: Settings, category: "generators", description: "Generate robots.txt files", color: "bg-stone-500" },
  { name: "Cron Expression", href: "/tools/cron-expression-parser", icon: Clock, category: "generators", description: "Parse and generate cron schedules", color: "bg-yellow-600" },
  { name: "JSON Formatter", href: "/tools/json-formatter", icon: FileJson, category: "formatters", description: "Format and validate JSON", color: "bg-green-500", popular: true },
  { name: "CSS Minifier", href: "/tools/css-minifier", icon: Palette, category: "formatters", description: "Minify CSS code", color: "bg-blue-500" },
  { name: "JS Minifier", href: "/tools/javascript-minifier", icon: FileCode, category: "formatters", description: "Minify JavaScript code", color: "bg-yellow-500" },
  { name: "SQL Formatter", href: "/tools/sql-formatter", icon: Database, category: "formatters", description: "Format SQL queries", color: "bg-cyan-600" },
  { name: "Text Diff", href: "/tools/text-diff", icon: ArrowRightLeft, category: "formatters", description: "Compare text differences", color: "bg-orange-500" },
  { name: "Regex Tester", href: "/tools/regex-tester", icon: Search, category: "formatters", description: "Test regular expressions", color: "bg-violet-600" },
  { name: "LinkedIn Counter", href: "/tools/linkedin-counter", icon: Linkedin, category: "utilities", description: "Count LinkedIn post characters", color: "bg-blue-700", popular: true },
  { name: "Token Counter", href: "/tools/token-counter", icon: Hash, category: "utilities", description: "Count AI tokens for GPT/Claude", color: "bg-purple-700", popular: true },
  { name: "Word Counter", href: "/tools/word-counter", icon: Text, category: "utilities", description: "Count words and characters", color: "bg-indigo-500" },
  { name: "Line Counter", href: "/tools/line-counter", icon: AlignLeft, category: "utilities", description: "Count lines in text", color: "bg-teal-600" },
  { name: "Character Frequency", href: "/tools/character-frequency-analyzer", icon: BarChart3, category: "utilities", description: "Analyze character usage", color: "bg-amber-600" },
  { name: "Screen Resolution", href: "/tools/screen-resolution-detector", icon: Smartphone, category: "utilities", description: "Detect your screen specs", color: "bg-red-600" },
  { name: "HTTP Status", href: "/tools/http-status-code-checker", icon: Globe, category: "utilities", description: "Check HTTP status codes", color: "bg-emerald-600" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "All tools run client-side for instant results with zero server delays." },
  { icon: Shield, title: "Privacy First", description: "Your data never leaves your browser. No tracking, no cookies, no BS." },
  { icon: Sparkles, title: "Always Free", description: "100% free forever. No signup, no paywalls, no limits." },
];

const stats = [
  { value: "35+", label: "Developer Tools" },
  { value: "0", label: "Server Calls" },
  { value: "∞", label: "Free Forever" },
];

export default function ClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                         tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTools = tools.filter(t => t.popular);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">DevUtils</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              <Link href="#tools">
                <Button variant="ghost" size="sm">Tools</Button>
              </Link>
              <Link href="#features">
                <Button variant="ghost" size="sm">Features</Button>
              </Link>
              <a href="https://github.com/commentlikemeofficial/devutils-tools" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
            </nav>

            <Badge variant="secondary" className="hidden sm:inline-flex">35+ Tools</Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 animate-fade-in" variant="outline">
              <Sparkles className="w-3 h-3 mr-1" />
              Free Developer Tools Collection
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
              Tools That
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Just Work
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              35+ free, fast, and privacy-focused tools for developers. 
              No ads, no tracking, no signup required. Open source and always free.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 sm:gap-12 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#tools">
                <Button size="lg" className="gap-2 min-w-[200px]">
                  Explore Tools
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="https://github.com/commentlikemeofficial/devutils-tools" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 min-w-[200px]">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Button>
              </a>
            </div>

            <div className="mt-12 animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Most Popular Tools</h2>
            <p className="text-muted-foreground">Loved by developers worldwide</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {popularTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tool.description}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">All Developer Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our complete collection of free tools. Use the search or filter by category.
              </p>
            </div>
            
            {/* Search & Filter */}
            <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md p-4 rounded-2xl border shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search tools..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border-muted group-hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center mb-3 text-white shadow-sm group-hover:scale-105 transition-transform`}>
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {tool.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No tools found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Developers Love Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built by developers, for developers. We focus on what matters most.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-background border hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 sm:p-12 border">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Open Source & Free Forever</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              DevUtils is completely free and open source. Contribute on GitHub or use it in your projects without any restrictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/commentlikemeofficial/devutils-tools" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </Button>
              </a>
              <a href="https://twitter.com/intent/tweet?text=Check%20out%20DevUtils%20-%2035%2B%20free%20developer%20tools!" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2">
                  <Twitter className="w-5 h-5" />
                  Share on X
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">DevUtils</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                A collection of 35+ free online tools for developers. Built with Next.js and shadcn/ui.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/commentlikemeofficial/devutils-tools" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background border flex items-center justify-center hover:bg-muted transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background border flex items-center justify-center hover:bg-muted transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="mailto:kalidandiirajesh@gmail.com" className="w-9 h-9 rounded-lg bg-background border flex items-center justify-center hover:bg-muted transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/json-formatter" className="text-muted-foreground hover:text-foreground transition-colors">Formatters</Link></li>
                <li><Link href="/tools/url-encoderdecoder" className="text-muted-foreground hover:text-foreground transition-colors">Converters</Link></li>
                <li><Link href="/tools/password-generator" className="text-muted-foreground hover:text-foreground transition-colors">Generators</Link></li>
                <li><Link href="/tools/linkedin-counter" className="text-muted-foreground hover:text-foreground transition-colors">Utilities</Link></li>
              </ul>
            </div>

            {/* Popular */}
            <div>
              <h4 className="font-semibold mb-4">Popular Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/json-formatter" className="text-muted-foreground hover:text-foreground transition-colors">JSON Formatter</Link></li>
                <li><Link href="/tools/linkedin-counter" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn Counter</Link></li>
                <li><Link href="/tools/token-counter" className="text-muted-foreground hover:text-foreground transition-colors">Token Counter</Link></li>
                <li><Link href="/tools/password-generator" className="text-muted-foreground hover:text-foreground transition-colors">Password Generator</Link></li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/commentlikemeofficial/devutils-tools" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">GitHub <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://rajeshkalidandi.online" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">Portfolio <ExternalLink className="w-3 h-3" /></a></li>
                <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">All Tools</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevUtils. Built with <Heart className="w-3 h-3 inline text-red-500" /> by Rajesh Kalidandi.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" /> Fast
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Private
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Free
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
