import { cn } from "@aqua/tailwind";
import type { Metadata, Viewport } from "next";
import { fonts } from "~/config/fonts";
import { siteConfig } from "~/config/site";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  authors: {
    name: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    creator: "@fellipeutaka",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background font-sans text-foreground antialiased",
          fonts.sans.variable,
          fonts.mono.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
