"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Trash2, 
  FileJson,
  CheckCircle2,
  AlertCircle,
  Play,
  Minimize2,
  FileType,
  Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationError {
  message: string;
  line: number;
  column: number;
}

function formatJSON(json: string, indent: number = 2): string {
  const parsed = JSON.parse(json);
  return JSON.stringify(parsed, null, indent);
}

function minifyJSON(json: string): string {
  const parsed = JSON.parse(json);
  return JSON.stringify(parsed);
}

function validateJSON(json: string): { valid: boolean; error?: ValidationError } {
  try {
    JSON.parse(json);
    return { valid: true };
  } catch (e) {
    if (e instanceof SyntaxError) {
      const match = e.message.match(/position (\d+)/);
      const position = match ? parseInt(match[1]) : 0;
      
      // Calculate line and column
      const lines = json.substring(0, position).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      
      return {
        valid: false,
        error: {
          message: e.message,
          line,
          column,
        },
      };
    }
    return { valid: false };
  }
}

function getStats(json: string) {
  try {
    const parsed = JSON.parse(json);
    const str = JSON.stringify(parsed);
    
    const countKeys = (obj: any): number => {
      if (typeof obj !== 'object' || obj === null) return 0;
      if (Array.isArray(obj)) {
        return obj.reduce((acc, item) => acc + countKeys(item), 0);
      }
      return Object.keys(obj).length + Object.values(obj).reduce((acc: number, val) => acc + countKeys(val), 0);
    };
    
    const countArrays = (obj: any): number => {
      if (!Array.isArray(obj) && typeof obj !== 'object') return 0;
      let count = Array.isArray(obj) ? 1 : 0;
      if (typeof obj === 'object' && obj !== null) {
        for (const val of Object.values(obj)) {
          count += countArrays(val);
        }
      }
      return count;
    };
    
    return {
      size: new Blob([str]).size,
      keys: countKeys(parsed),
      arrays: countArrays(parsed),
      nesting: JSON.stringify(parsed).split('}').length - 1,
    };
  } catch {
    return null;
  }
}

export default function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<ValidationError | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('pretty');

  const handleFormat = (type: 'pretty' | 'minify') => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    const validation = validateJSON(input);
    if (!validation.valid) {
      setError(validation.error || null);
      setOutput('');
      return;
    }

    setError(null);
    try {
      if (type === 'pretty') {
        setOutput(formatJSON(input));
      } else {
        setOutput(minifyJSON(input));
      }
    } catch {
      setError({ message: 'Unknown error', line: 0, column: 0 });
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const stats = input ? getStats(input) : null;
  const validation = input ? validateJSON(input) : { valid: true };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileJson className="h-8 w-8 text-green-600" />
          JSON Formatter
        </h1>
        <p className="text-muted-foreground mt-2">
          Format, minify, and validate JSON. Copy formatted output with one click.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileType className="h-4 w-4" />
                Input
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  disabled={!input}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Clear</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder='Paste your JSON here...\nExample: {"name": "John", "age": 30}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                "min-h-[300px] font-mono text-sm resize-none",
                error && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            
            {input && (
              <div className="flex items-center gap-2">
                {validation.valid ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Valid JSON
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Invalid JSON
                  </Badge>
                )}
                {stats && (
                  <>
                    <Badge variant="secondary">{(stats.size / 1024).toFixed(2)} KB</Badge>
                    <Badge variant="secondary">{stats.keys} keys</Badge>
                  </>
                )}
              </div>
            )}

            {error && (
              <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">JSON Error</p>
                    <p className="text-red-400">{error.message}</p>
                    {error.line > 0 && (
                      <p className="text-red-400 mt-1">
                        Line {error.line}, Column {error.column}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={() => handleFormat('pretty')}
                disabled={!input}
                className="flex-1"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Prettify
              </Button>
              <Button 
                onClick={() => handleFormat('minify')}
                disabled={!input}
                variant="secondary"
                className="flex-1"
              >
                <Minimize2 className="h-4 w-4 mr-2" />
                Minify
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Play className="h-4 w-4" />
                Output
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-2 hidden sm:inline">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              placeholder="Formatted JSON will appear here..."
              value={output}
              className="min-h-[300px] font-mono text-sm resize-none bg-muted"
            />
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Use Prettify to make JSON readable with proper indentation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Use Minify to compress JSON for APIs and storage
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Error messages show exact line and column numbers
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              All processing happens in your browser - data is private
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
