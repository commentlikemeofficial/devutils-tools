"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Copy, Check } from "lucide-react";


export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setOutput("Error: Invalid input");
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput("Error: Invalid URL encoding");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Encode and decode URLs. Convert special characters to URL-safe format and back."
    >
      <div className="space-y-4">
        <Textarea
          placeholder="Paste your text or URL here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[150px] font-mono"
        />
        
        <div className="flex gap-2">
          <Button onClick={encode} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Encode
          </Button>
          <Button onClick={decode} variant="outline" className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2 rotate-180" />
            Decode
          </Button>
        </div>

        {output && (
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] font-mono bg-muted"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
