import { siteConfig } from "~/config/site";

export function SiteFooter() {
  return (
    <footer className="container h-16">
      <p className="text-balance text-center text-muted-foreground text-sm leading-loose md:text-left">
        Built by{" "}
        <a
          href={siteConfig.author.url}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          fellipeutaka
        </a>
        . The source code is available on{" "}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
