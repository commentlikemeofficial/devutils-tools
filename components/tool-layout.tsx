import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      <Card>
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </div>
  );
}
