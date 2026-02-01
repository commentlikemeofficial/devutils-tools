import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Character Counter | DevUtils",
  description: "Count characters, words, and preview your LinkedIn posts, comments, and headlines. Stay within platform limits.",
  keywords: ["LinkedIn", "character counter", "social media", "post limit", "LinkedIn tool"],
  openGraph: {
    title: "LinkedIn Character Counter | DevUtils",
    description: "Count characters, words, and preview your LinkedIn posts",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
