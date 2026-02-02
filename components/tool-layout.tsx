"use client";

import Link from "next/link";
import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Zap, 
  Info, 
  Lightbulb, 
  Copy, 
  Check,
  ExternalLink,
  Github
} from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  instructions?: string[];
  tips?: string[];
  popular?: boolean;
}

export function ToolLayout({ 
  title, 
  description, 
  children, 
  instructions = [],
  tips = [],
  popular = false 
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold hidden sm:inline">DevUtils</span>
            </div>
          </div>
          <a href="https://github.com/commentlikemeofficial/devutils-tools" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="gap-2">
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </a>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tool Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
                  {popular && (
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg">{description}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr,320px] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              {children}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Instructions */}
              {instructions.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" />
                      How to Use
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-sm">
                      {instructions.map((step, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}

              {/* Tips */}
              {tips.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      Pro Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {tips.map((tip, i) => (
                        <li key={i} className="flex gap-2 text-muted-foreground">
                          <span className="text-amber-500">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Privacy Note */}
              <Card className="bg-muted/50 border-dashed">
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground text-center">
                    <Zap className="w-3 h-3 inline mr-1" />
                    All processing happens in your browser. 
                    Your data never leaves your device.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} DevUtils. Built by Rajesh Kalidandi.</p>
            <Link href="/" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Tools
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Hook for copy functionality
export function useCopy() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}

// Copy button component
interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copy(text)}
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-1" />
          Copy
        </>
      )}
    </Button>
  );
}
