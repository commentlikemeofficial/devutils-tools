import { Metadata } from "next";
import ClientPage from "./client-page";

export const metadata: Metadata = {
  title: "DevUtils - 35+ Free Developer Tools",
  description: "A comprehensive collection of 35+ free online tools for developers. JSON formatter, password generator, token counter, and more.",
};

export default function Home() {
  return <ClientPage />;
}
