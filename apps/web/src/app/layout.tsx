import { cn } from "@aqua/tailwind";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
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
    name: siteConfig.author.name,
    url: siteConfig.author.url,
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

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "grid min-h-screen grid-rows-[auto,1fr,auto] bg-background font-sans text-foreground antialiased",
          fonts.sans.variable,
          fonts.mono.variable,
        )}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
