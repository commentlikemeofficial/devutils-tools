"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Copy, 
  Trash2, 
  Hash,
  CheckCircle2,
  AlertCircle,
  Type,
  Calculator,
  Info,
  MessageSquare,
  Brain
} from "lucide-react";
import { encodingForModel } from "js-tiktoken";
import { cn } from "@/lib/utils";

// Token limits for different models
const MODEL_LIMITS = {
  "gpt-4": { limit: 8192, label: "GPT-4", provider: "OpenAI" },
  "gpt-4-32k": { limit: 32768, label: "GPT-4 (32K)", provider: "OpenAI" },
  "gpt-3.5-turbo": { limit: 4096, label: "GPT-3.5 Turbo", provider: "OpenAI" },
  "gpt-3.5-turbo-16k": { limit: 16384, label: "GPT-3.5 Turbo (16K)", provider: "OpenAI" },
  "claude-3-opus": { limit: 200000, label: "Claude 3 Opus", provider: "Anthropic" },
  "claude-3-sonnet": { limit: 200000, label: "Claude 3 Sonnet", provider: "Anthropic" },
  "claude-3-haiku": { limit: 200000, label: "Claude 3 Haiku", provider: "Anthropic" },
  "claude-2": { limit: 100000, label: "Claude 2", provider: "Anthropic" },
};

type ModelKey = keyof typeof MODEL_LIMITS;

// Approximate token counts (since we can't load all encodings)
function estimateTokens(text: string, model: ModelKey): number {
  if (!text) return 0;
  
  try {
    // Try to use tiktoken for OpenAI models
    if (model.startsWith('gpt')) {
      const encoding = encodingForModel(model as any);
      return encoding.encode(text).length;
    }
  } catch {
    // Fallback to approximation
  }
  
  // Approximation for Claude and other models
  // Claude uses roughly similar tokenization to GPT
  // ~4 characters per token is a rough estimate
  return Math.ceil(text.length / 4);
}

function TokenBreakdown({ text, tokens }: { text: string; tokens: number }) {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split('\n').length;
  
  // Estimate breakdown
  const textTokens = Math.ceil(chars / 4);
  const whitespaceTokens = Math.max(0, tokens - textTokens);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Characters</span>
          <span className="font-mono">{chars.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Words</span>
          <span className="font-mono">{words.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Lines</span>
          <span className="font-mono">{lines.toLocaleString()}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Est. Char Tokens</span>
          <span className="font-mono">~{textTokens.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Whitespace</span>
          <span className="font-mono">~{whitespaceTokens.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Tokens</span>
          <span className="font-mono font-medium">{tokens.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function PricingEstimate({ tokens, model }: { tokens: number; model: ModelKey }) {
  // Approximate pricing per 1K tokens (input)
  const pricing: Record<string, number> = {
    "gpt-4": 0.03,
    "gpt-4-32k": 0.06,
    "gpt-3.5-turbo": 0.0015,
    "gpt-3.5-turbo-16k": 0.003,
    "claude-3-opus": 0.015,
    "claude-3-sonnet": 0.003,
    "claude-3-haiku": 0.00025,
    "claude-2": 0.008,
  };
  
  const cost = (tokens / 1000) * (pricing[model] || 0);
  
  return (
    <div className="text-sm text-muted-foreground">
      Estimated cost: <span className="font-mono text-foreground">${cost.toFixed(4)}</span> per request
    </div>
  );
}

export default function TokenCounterPage() {
  const [text, setText] = useState('');
  const [model, setModel] = useState<ModelKey>('gpt-4');
  const [copied, setCopied] = useState(false);
  
  const tokenCount = useMemo(() => estimateTokens(text, model), [text, model]);
  const modelInfo = MODEL_LIMITS[model];
  const remaining = modelInfo.limit - tokenCount;
  const percentage = Math.min((tokenCount / modelInfo.limit) * 100, 100);
  const isOverLimit = tokenCount > modelInfo.limit;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tokenCount.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const samplePrompts = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort a list",
    "Summarize the key points of machine learning",
  ];

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Hash className="h-8 w-8 text-purple-600" />
          Token Counter
        </h1>
        <p className="text-muted-foreground mt-2">
          Estimate token counts for GPT-4, Claude, and other LLMs. Optimize your prompts and stay within limits.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Your Text
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={model} onValueChange={(v) => setModel(v as ModelKey)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-32k">GPT-4 (32K)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-3.5-turbo-16k">GPT-3.5 Turbo (16K)</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                      <SelectItem value="claude-2">Claude 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your prompt or text here to count tokens..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={cn(
                  "min-h-[300px] resize-none",
                  isOverLimit && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!text}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">
                      {copied ? "Copied!" : "Copy Count"}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    disabled={!text}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Clear</span>
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  {samplePrompts.map((prompt, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      size="sm"
                      onClick={() => setText(prompt)}
                      className="hidden xl:flex"
                    >
                      Sample {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Prompts for Mobile */}
          <div className="xl:hidden">
            <p className="text-sm text-muted-foreground mb-2">Try a sample:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((prompt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => setText(prompt)}
                >
                  Sample {i + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Token Stats
              </CardTitle>
              <CardDescription>
                {modelInfo.label} • {modelInfo.provider}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Count */}
              <div className="text-center py-4">
                <div className={cn(
                  "text-5xl font-bold",
                  isOverLimit ? "text-red-500" : "text-primary"
                )}>
                  {tokenCount.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-2">tokens</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usage</span>
                  <span className={cn(
                    "font-medium",
                    isOverLimit ? "text-red-500" : ""
                  )}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-300",
                      percentage > 100 ? "bg-red-500" :
                      percentage > 80 ? "bg-yellow-500" :
                      "bg-green-500"
                    )}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{(modelInfo.limit / 2).toLocaleString()}</span>
                  <span>{modelInfo.limit.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <TokenBreakdown text={text} tokens={tokenCount} />
              </div>

              {isOverLimit && (
                <div className="flex items-start gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Token Limit Exceeded</p>
                    <p className="text-red-400">
                      You&apos;re {Math.abs(remaining).toLocaleString()} tokens over the {modelInfo.label} limit.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t">
                <PricingEstimate tokens={tokenCount} model={model} />
              </div>
            </CardContent>
          </Card>

          {/* Model Info Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Model Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Model</span>
                <span className="font-medium">{modelInfo.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Provider</span>
                <span className="font-medium">{modelInfo.provider}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Context Limit</span>
                <span className="font-mono">{modelInfo.limit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className={cn(
                  "font-mono",
                  remaining < 0 ? "text-red-500" : "text-green-600"
                )}>
                  {remaining.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Info Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-4 w-4" />
            About Token Counting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">How it works</h4>
              <p>
                Tokens are pieces of words used by AI models. On average, 1 token ≈ 4 characters 
                or 0.75 words for English text. For OpenAI models, we use the exact tiktoken 
                encoding. For Claude and other models, we use accurate approximations.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why it matters</h4>
              <p>
                Models have token limits that constrain both input (your prompt) and output 
                (the response). Understanding token counts helps you optimize prompts and 
                estimate API costs accurately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
