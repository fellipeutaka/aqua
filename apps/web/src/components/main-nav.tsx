"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "~/config/site";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center gap-6 text-sm">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          data-active={pathname.includes(link.href)}
          className="text-foreground/60 transition-colors data-[active=true]:text-foreground hover:text-foreground"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
