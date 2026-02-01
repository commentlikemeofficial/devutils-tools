import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Counter | DevUtils",
  description: "Estimate token counts for GPT-4, Claude, and other LLMs using tiktoken-style encoding. Optimize your prompts and stay within limits.",
  keywords: ["token counter", "GPT-4", "Claude", "OpenAI", "tiktoken", "AI", "LLM"],
  openGraph: {
    title: "Token Counter | DevUtils",
    description: "Estimate token counts for GPT-4, Claude, and other LLMs",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
