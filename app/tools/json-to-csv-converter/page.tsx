"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw, Trash2 } from "lucide-react";

const instructions = [
  "Paste JSON array of objects",
  "Verify the field mapping",
  "Click 'Convert' to generate CSV",
  "Copy or download the result",
];

const tips = [
  "Input must be an array of objects",
  "All objects should have similar structure",
  "Nested objects are flattened",
  "Arrays become comma-separated",
];

export default function JsonToCsvConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const process = () => {
    // Tool logic here
    setOutput(input);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="JSON to CSV Converter"
      description="Convert JSON arrays to CSV format."
      instructions={instructions}
      tips={tips}
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Input</label>
            <Textarea
              placeholder="Enter your input here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={process} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Process
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Output */}
          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Result</label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
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
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[150px] bg-muted font-mono"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
