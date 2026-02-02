"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tool-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  Trash2, 
  CheckCircle2,
  AlertCircle,
  Type,
  AlignLeft,
  RefreshCcw
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
    <div className="border rounded-xl p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
          YN
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Your Name</span>
            <span className="text-muted-foreground text-sm">• 1st</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {type === "headline" ? previewText : "Your Headline"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">2h • Edited • 🌐</p>
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

  const currentLimit = LIMITS[activeTab].limit;
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const remaining = currentLimit - charCount;
  const percentage = Math.min((charCount / currentLimit) * 100, 100);
  const isOverLimit = charCount > currentLimit;

  const handleClear = () => setText("");
  
  const handleSample = () => {
    const samples: Record<string, string> = {
      post: "Just shipped a new feature! 🚀\n\nAfter 3 weeks of coding, debugging, and way too much coffee, the new dashboard is live.\n\nKey highlights:\n✓ Real-time analytics\n✓ Dark mode support\n✓ 10x faster load times\n\nWhat features would you like to see next? Drop a comment below! 👇\n\n#buildinpublic #indiehackers #webdev",
      comment: "This is exactly what I needed! Thanks for sharing. The real-time analytics feature looks particularly useful for tracking user engagement.",
      headline: "Full Stack Developer | Building DevUtils | Helping developers ship faster",
      about: "Passionate developer building tools that make life easier. Currently working on DevUtils - a collection of 35+ free developer tools.\n\nPreviously: Senior dev at TechCorp\nEducation: Computer Science, MIT"
    };
    setText(samples[activeTab] || samples.post);
  };

  return (
    <ToolLayout
      title="LinkedIn Character Counter"
      description="Count characters, words, and preview your LinkedIn posts, comments, and headlines. Stay within platform limits and optimize your content."
      popular={true}
      instructions={[
        "Select your content type (Post, Comment, Headline, or About)",
        "Type or paste your text in the input area",
        "Watch the character count update in real-time",
        "Use the preview to see how it will look on LinkedIn",
        "Copy the text when you're ready to post"
      ]}
      tips={[
        "LinkedIn posts with 1,300-1,500 characters get the most engagement",
        "Headlines should be under 120 characters for optimal display",
        "Comments under 200 characters tend to get more replies",
        "Use the preview to check how your content will appear on mobile"
      ]}
    >
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as keyof typeof LIMITS)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {Object.entries(LIMITS).map(([key, { label }]) => (
            <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(LIMITS).map(([key, { limit, label }]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* Input Card */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Your {label}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleSample}>
                      <RefreshCcw className="w-3.5 h-3.5 mr-1" />
                      Sample
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleClear} disabled={!text}>
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Textarea */}
                <Textarea
                  placeholder={`Type your LinkedIn ${label.toLowerCase()} here...`}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={cn(
                    "min-h-[200px] resize-none text-base",
                    isOverLimit && "border-red-500 focus-visible:ring-red-500"
                  )}
                />

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Character Count</span>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-mono font-medium text-lg",
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
                      "bg-green-200 [&>div]:bg-green-500"
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Words</span>
                      <span className="font-mono">{wordCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
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
                    <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      You've exceeded the {label.toLowerCase()} limit by {Math.abs(remaining).toLocaleString()} characters.
                    </div>
                  )}
                </div>

                {/* Copy Button */}
                <div className="flex gap-2">
                  <CopyButton text={text} className="flex-1" />
                </div>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlignLeft className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Live Preview</span>
                </div>
                <LinkedInPreview text={text} type={key as keyof typeof LIMITS} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </ToolLayout>
  );
}
