"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Copy, 
  Trash2, 
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Type,
  AlignLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const LIMITS = {
  post: { limit: 3000, label: "Post" },
  comment: { limit: 1250, label: "Comment" },
  headline: { limit: 220, label: "Headline" },
  about: { limit: 2600, label: "About" },
};

function LinkedInPreview({ text, type }: { text: string; type: keyof typeof LIMITS }) {
  const truncateText = (str: string, maxLength: number) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  const previewText = type === "headline" ? text : truncateText(text, 150);

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-700 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Your Name</span>
            <span className="text-muted-foreground text-sm">• 1st</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {type === "headline" ? previewText : "Your Headline"}
          </p>
          <p className="text-sm text-muted-foreground">2h • Edited • 🌐</p>
          {type !== "headline" && (
            <p className="mt-2 text-sm whitespace-pre-wrap">{previewText || "Your post content will appear here..."}</p>
          )}
        </div>
      </div>
      {type !== "headline" && (
        <div className="mt-3 flex items-center gap-4 pt-3 border-t text-muted-foreground">
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Like
          </div>
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Comment
          </div>
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Repost
          </div>
        </div>
      )}
    </div>
  );
}

export default function LinkedInCounterPage() {
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState<keyof typeof LIMITS>("post");
  const [copied, setCopied] = useState(false);

  const currentLimit = LIMITS[activeTab].limit;
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const remaining = currentLimit - charCount;
  const percentage = Math.min((charCount / currentLimit) * 100, 100);
  const isOverLimit = charCount > currentLimit;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Linkedin className="h-8 w-8 text-blue-600" />
          LinkedIn Character Counter
        </h1>
        <p className="text-muted-foreground mt-2">
          Count characters, words, and preview your LinkedIn content. Stay within platform limits.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as keyof typeof LIMITS)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="comment">Comment</TabsTrigger>
          <TabsTrigger value="headline">Headline</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        {Object.entries(LIMITS).map(([key, { limit, label }]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Your {label}
                    </CardTitle>
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
                          {copied ? "Copied!" : "Copy"}
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
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder={`Type your LinkedIn ${label.toLowerCase()} here...`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={cn(
                      "min-h-[200px] resize-none",
                      isOverLimit && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  
                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Character Count</span>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-mono font-medium",
                          isOverLimit ? "text-red-500" : "text-green-600"
                        )}>
                          {charCount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-muted-foreground">{limit.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Progress 
                      value={percentage} 
                      className={cn(
                        "h-2",
                        percentage > 100 ? "bg-red-200 [&>div]:bg-red-500" :
                        percentage > 90 ? "bg-yellow-200 [&>div]:bg-yellow-500" :
                        ""
                      )}
                    />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Words</span>
                      <span className="font-mono">{wordCount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className={cn(
                        "font-mono font-medium",
                        remaining < 0 ? "text-red-500" : "text-green-600"
                      )}>
                        {remaining.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {isOverLimit && (
                    <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                      <AlertCircle className="h-4 w-4" />
                      You&apos;ve exceeded the {label.toLowerCase()} limit by {Math.abs(remaining).toLocaleString()} characters.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlignLeft className="h-4 w-4" />
                    Preview
                  </CardTitle>
                  <CardDescription>
                    See how your {label.toLowerCase()} will appear on LinkedIn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LinkedInPreview text={text} type={key as keyof typeof LIMITS} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
