import { ButtonStyles } from "@aqua/ui/button";
import { type IconComponent, Icons } from "@aqua/ui/icons";
import Link from "next/link";
import { siteConfig } from "~/config/site";
import { MainNav } from "./main-nav";

const socialLinks = [
  {
    title: "GitHub",
    href: siteConfig.links.github,
    icon: Icons.GitHub,
  },
  {
    title: "Twitter",
    href: siteConfig.links.twitter,
    icon: Icons.Twitter,
  },
] satisfies {
  title: string;
  href: string;
  icon: IconComponent;
}[];

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          {/* <Icons.Logo className="size-4" aria-hidden /> */}
          <span className="hidden font-bold md:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <MainNav />
        <nav className="flex flex-1 items-center md:justify-end">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              className={ButtonStyles({
                variant: "ghost",
                size: "icon",
                className: "size-8",
              })}
              aria-label={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon className="size-4" aria-hidden />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
