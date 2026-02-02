"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RefreshCw } from "lucide-react";

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random UUIDs (Universally Unique Identifiers) v4."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm">Count:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 rounded-md border bg-background"
          />
          <Button onClick={generate}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </div>

        {uuids.length > 0 && (
          <>
            <Textarea
              value={uuids.join("\n")}
              readOnly
              className="min-h-[200px] font-mono"
            />
            <Button onClick={copyAll} variant="outline" className="w-full">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Copy All
            </Button>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
