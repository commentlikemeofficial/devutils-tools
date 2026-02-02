"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Hash, 
  Type, 
  AlertCircle,
  DollarSign,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

// Approximate tokens per character for different models
const TOKEN_RATES: Record<string, { input: number; output: number; charsPerToken: number }> = {
  "gpt-4": { input: 0.03, output: 0.06, charsPerToken: 4 },
  "gpt-4-turbo": { input: 0.01, output: 0.03, charsPerToken: 4 },
  "gpt-3.5": { input: 0.0015, output: 0.002, charsPerToken: 4 },
  "claude-3": { input: 0.008, output: 0.024, charsPerToken: 3.5 },
  "claude-instant": { input: 0.0008, output: 0.0024, charsPerToken: 3.5 },
};

export default function TokenCounterPage() {
  const [text, setText] = useState("");
  const [model, setModel] = useState("gpt-4");
  
  // Simple token estimation
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estimatedTokens = Math.ceil(charCount / TOKEN_RATES[model].charsPerToken);
  
  const inputCost = (estimatedTokens / 1000) * TOKEN_RATES[model].input;
  const outputCost = (estimatedTokens / 1000) * TOKEN_RATES[model].output;
  
  // GPT-4 context limit
  const maxTokens = 8192;
  const usagePercent = (estimatedTokens / maxTokens) * 100;

  const models = [
    { id: "gpt-4", name: "GPT-4", desc: "Most capable" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", desc: "Fast & cheaper" },
    { id: "gpt-3.5", name: "GPT-3.5", desc: "Fast & affordable" },
    { id: "claude-3", name: "Claude 3", desc: "Anthropic's best" },
    { id: "claude-instant", name: "Claude Instant", desc: "Fast responses" },
  ];

  return (
    <ToolLayout
      title="AI Token Counter"
      description="Count tokens for GPT-4, Claude, and other LLMs. Estimate API costs and optimize your prompts before sending to AI services."
      popular={true}
      instructions={[
        "Select the AI model you're using from the dropdown",
        "Paste your text or prompt into the input area",
        "View estimated token count in real-time",
        "Check the cost estimate for your usage",
        "Adjust your prompt to fit within token limits"
      ]}
      tips={[
        "GPT-4 averages ~4 characters per token",
        "Code uses more tokens than plain English",
        "Keep prompts under 75% of max for response room",
        "Longer context = higher costs but better results"
      ]}
    >
      <div className="grid lg:grid-cols-[1fr,300px] gap-6">
        {/* Main Input */}
        <div className="space-y-6">
          {/* Model Selector */}
          <Card>
            <CardContent className="pt-6">
              <label className="text-sm font-medium mb-3 block">Select AI Model</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModel(m.id)}
                    className={cn(
                      "p-3 rounded-lg border text-left transition-all",
                      model === m.id
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    )}
                  >
                    <div className="font-medium text-sm">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Text Input */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Your Text / Prompt</label>
                <Badge variant="outline">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {wordCount.toLocaleString()} words
                </Badge>
              </div>
              
              <Textarea
                placeholder="Paste your prompt or text here to count tokens..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[250px] resize-none"
              />

              {/* Character Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{charCount.toLocaleString()} characters</span>
                <span>•</span>
                <span>~{TOKEN_RATES[model].charsPerToken} chars/token</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          {/* Token Count */}
          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Hash className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl font-bold">{estimatedTokens.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">Estimated Tokens</div>
            </CardContent>
          </Card>

          {/* Usage Progress */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Context Usage</span>
                <span className={cn(
                  "font-medium",
                  usagePercent > 90 ? "text-red-500" : usagePercent > 70 ? "text-yellow-500" : "text-green-600"
                )}>
                  {usagePercent.toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={usagePercent} 
                className={cn(
                  "h-2",
                  usagePercent > 90 ? "bg-red-200 [&>div]:bg-red-500" :
                  usagePercent > 70 ? "bg-yellow-200 [&>div]:bg-yellow-500" :
                  "bg-green-200 [&>div]:bg-green-500"
                )}
              />
              <p className="text-xs text-muted-foreground">
                {maxTokens.toLocaleString()} token limit
              </p>
            </CardContent>
          </Card>

          {/* Cost Estimate */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Cost Estimate</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Input</span>
                  <span className="font-mono">${inputCost.toFixed(4)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Output (est.)</span>
                  <span className="font-mono">${outputCost.toFixed(4)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total (1K calls)</span>
                    <span className="font-mono">${((inputCost + outputCost) * 1000).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          {usagePercent > 90 && (
            <div className="flex items-start gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Warning: Near token limit. Consider reducing prompt length.</span>
            </div>
          )}

          {/* Pricing Info */}
          <Card className="bg-muted/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground text-center">
                Prices per 1K tokens.<br />
                Actual costs may vary.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
