"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileJson, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ lines: 0, size: 0 });

  const formatJSON = (minify = false) => {
    try {
      if (!input.trim()) {
        setError("");
        setOutput("");
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = minify 
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);
      
      setOutput(formatted);
      setError("");
      setStats({
        lines: formatted.split('\n').length,
        size: new Blob([formatted]).size
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setStats({ lines: 0, size: 0 });
  };

  const loadSample = () => {
    const sample = {
      "name": "DevUtils",
      "version": "1.0.0",
      "description": "A collection of developer tools",
      "tools": [
        { "name": "JSON Formatter", "category": "Formatter" },
        { "name": "Token Counter", "category": "Utility" },
        { "name": "Password Generator", "category": "Generator" }
      ],
      "features": {
        "free": true,
        "openSource": true,
        "privacyFirst": true
      }
    };
    setInput(JSON.stringify(sample));
    setOutput(JSON.stringify(sample, null, 2));
    setStats({ lines: 20, size: 450 });
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, minify, and validate JSON with error highlighting. Copy formatted output with one click. Perfect for debugging API responses."
      popular={true}
      instructions={[
        "Paste your JSON in the input area on the left",
        "Click 'Format' to prettify with proper indentation",
        "Or click 'Minify' to compress to a single line",
        "Check the validation status below the input",
        "Copy the formatted output when ready"
      ]}
      tips={[
        "Use 'Format' for readability when debugging",
        "Use 'Minify' before sending JSON over the network",
        "The tool validates JSON in real-time as you type",
        "Large JSON files (10MB+) may take a moment to process"
      ]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileJson className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Input JSON</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <Upload className="w-3.5 h-3.5 mr-1" />
                  Sample
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear} disabled={!input}>
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Clear
                </Button>
              </div>
            </div>

            <Textarea
              placeholder='{"example": "Paste your JSON here..."}'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.trim()) {
                  try {
                    JSON.parse(e.target.value);
                    setError("");
                  } catch (err) {
                    setError("Invalid JSON");
                  }
                } else {
                  setError("");
                }
              }}
              className={cn(
                "min-h-[300px] resize-none font-mono text-sm",
                error && input && "border-red-500 focus-visible:ring-red-500"
              )}
            />

            {/* Validation Status */}
            {input && (
              <div className={cn(
                "flex items-center gap-2 text-sm p-3 rounded-lg",
                error ? "bg-red-50 dark:bg-red-950/20 text-red-500" : "bg-green-50 dark:bg-green-950/20 text-green-600"
              )}>
                {error ? (
                  <>
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Valid JSON</span>
                  </>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={() => formatJSON(false)} 
                className="flex-1"
                disabled={!input || !!error}
              >
                <FileJson className="w-4 h-4 mr-2" />
                Format
              </Button>
              <Button 
                onClick={() => formatJSON(true)} 
                variant="outline"
                disabled={!input || !!error}
              >
                Minify
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Formatted Output</span>
              {output && (
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{stats.lines} lines</span>
                  <span>•</span>
                  <span>{(stats.size / 1024).toFixed(2)} KB</span>
                </div>
              )}
            </div>

            <Textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="min-h-[300px] resize-none font-mono text-sm bg-muted"
            />

            {output && (
              <CopyButton text={output} className="w-full" />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
