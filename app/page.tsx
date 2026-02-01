import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, 
  FileJson, 
  Hash, 
  ArrowRight,
  Zap,
  Shield,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "DevUtils - Essential Tools for Developers",
  description: "A collection of free online tools for developers including LinkedIn character counter, JSON formatter, and AI token counter.",
};

const tools = [
  {
    name: "LinkedIn Character Counter",
    href: "/tools/linkedin-counter",
    icon: Linkedin,
    description: "Count characters, words, and see a live preview of your LinkedIn posts, comments, and headlines. Stay within platform limits.",
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    name: "JSON Formatter",
    href: "/tools/json-formatter",
    icon: FileJson,
    description: "Format, minify, and validate JSON with error highlighting. Copy formatted output with one click. Perfect for debugging API responses.",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    name: "Token Counter",
    href: "/tools/token-counter",
    icon: Hash,
    description: "Estimate token counts for GPT-4, Claude, and other LLMs using tiktoken-style encoding. Optimize your prompts and stay within limits.",
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "All tools run client-side for instant results. No server delays.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data never leaves your browser. We don't store anything.",
  },
  {
    icon: Sparkles,
    title: "Beautiful UI",
    description: "Modern interface with dark mode support. Easy on the eyes.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Essential Tools for{" "}
            <span className="text-primary">Developers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A curated collection of free online tools to boost your productivity. 
            Fast, secure, and beautifully designed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/linkedin-counter">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4`}>
                      <tool.icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="p-0 h-auto gap-1 text-sm">
                      Try it now
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why DevUtils?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
