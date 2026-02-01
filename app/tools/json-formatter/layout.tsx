import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter | DevUtils",
  description: "Format, minify, and validate JSON with error highlighting. Copy formatted output with one click.",
  keywords: ["JSON", "formatter", "validator", "minify", "prettify", "developer tools"],
  openGraph: {
    title: "JSON Formatter | DevUtils",
    description: "Format, minify, and validate JSON with error highlighting",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
