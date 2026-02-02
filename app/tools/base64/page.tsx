"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, ArrowRightLeft, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("encode");

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (e) {
      setOutput("Error: Invalid input for Base64 encoding");
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (e) {
      setOutput("Error: Invalid Base64 string");
    }
  };

  const handleProcess = () => {
    if (activeTab === "encode") {
      encode();
    } else {
      decode();
    }
  };

  const copyToClipboard = () => {
    if (output && !output.startsWith("Error")) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
          <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Text to Encode</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode..."
              className="min-h-[150px] font-mono"
            />
          </div>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Base64 to Decode</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Base64 string..."
              className="min-h-[150px] font-mono"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button onClick={handleProcess} className="flex-1">
          {activeTab === "encode" ? "Encode" : "Decode"}
        </Button>
        <Button variant="outline" onClick={handleSwap} disabled={!output}>
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Result</label>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  {output.length} chars
                </div>
              </div>
              <Textarea
                value={output}
                readOnly
                className={`min-h-[100px] font-mono ${
                  output.startsWith("Error") ? "border-red-500 text-red-600" : ""
                }`}
              />
            </div>

            {!output.startsWith("Error") && (
              <Button onClick={copyToClipboard} variant="secondary" className="w-full">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
