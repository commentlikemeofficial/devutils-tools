"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Copy, Check, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TextDiffTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [copied, setCopied] = useState(false);

  const computeDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLines = Math.max(lines1.length, lines2.length);
    const diff: { type: "same" | "added" | "removed"; line: string; lineNum: number }[] = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";

      if (line1 === line2) {
        diff.push({ type: "same", line: line2, lineNum: i + 1 });
      } else if (!line1 && line2) {
        diff.push({ type: "added", line: line2, lineNum: i + 1 });
      } else if (line1 && !line2) {
        diff.push({ type: "removed", line: line1, lineNum: i + 1 });
      } else {
        diff.push({ type: "removed", line: line1, lineNum: i + 1 });
        diff.push({ type: "added", line: line2, lineNum: i + 1 });
      }
    }

    return diff;
  };

  const diff = computeDiff();
  const addedCount = diff.filter((d) => d.type === "added").length;
  const removedCount = diff.filter((d) => d.type === "removed").length;

  const clearAll = () => {
    setText1("");
    setText2("");
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Original Text</label>
            <span className="text-xs text-muted-foreground">{text1.length} chars</span>
          </div>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste original text here..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Modified Text</label>
            <span className="text-xs text-muted-foreground">{text2.length} chars</span>
          </div>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste modified text here..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
        <Badge variant="secondary" className="text-green-600">
          +{addedCount} added
        </Badge>
        <Badge variant="secondary" className="text-red-600">
          -{removedCount} removed
        </Badge>
        <Button variant="outline" size="sm" onClick={clearAll} className="ml-auto">
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Diff View</CardTitle>
        </CardHeader>
        <CardContent>
          {text1 || text2 ? (
            <div className="space-y-0.5 font-mono text-sm">
              {diff.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 px-2 py-1 rounded ${
                    item.type === "added"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : item.type === "removed"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      : ""
                  }`}
                >
                  <span className="text-muted-foreground w-8 text-right select-none">
                    {item.lineNum}
                  </span>
                  <span className="w-4 text-center">
                    {item.type === "added" ? "+" : item.type === "removed" ? "-" : " "}
                  </span>
                  <span className="break-all">{item.line || " "}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Enter text in both fields to see the diff
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
