"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw, Trash2 } from "lucide-react";

const instructions = [
  "Paste text in the input field",
  "Click 'Encode' for Base64 output",
  "Click 'Decode' to reverse the process",
  "Copy your result",
];

const tips = [
  "Base64 is used for binary data in text format",
  "Common in APIs and data URIs",
  "Not encryption - just encoding",
  "Used for embedding images in CSS/HTML",
];

export default function Base64Page() {
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
      title="Base64 Converter"
      description="Encode text to Base64 or decode Base64 back to text."
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
