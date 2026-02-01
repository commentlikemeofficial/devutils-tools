"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, 
  FileJson, 
  Hash, 
  Menu, 
  X,
  Wrench
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tools = [
  {
    name: "LinkedIn Counter",
    href: "/tools/linkedin-counter",
    icon: Linkedin,
    description: "Character counter for LinkedIn",
  },
  {
    name: "JSON Formatter",
    href: "/tools/json-formatter",
    icon: FileJson,
    description: "Format and validate JSON",
  },
  {
    name: "Token Counter",
    href: "/tools/token-counter",
    icon: Hash,
    description: "Count AI tokens",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <span className="font-bold">DevUtils</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-2">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Button
                variant={pathname === tool.href ? "secondary" : "ghost"}
                size="sm"
                className="h-8"
              >
                <tool.icon className="mr-2 h-4 w-4" />
                {tool.name}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={pathname === tool.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <tool.icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>{tool.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {tool.description}
                    </span>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
