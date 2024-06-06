export const siteConfig = {
  name: "Acme",
  url: "https://next-trpc-monorepo.vercel.app",
  description: "Acme description",
  keywords: "Acme",
  links: {
    twitter: "https://twitter.com/fellipeutaka",
    github: "https://github.com/fellipeutaka/next-trpc-monorepo",
  },
};

export const navLinks = [
  { href: "/", label: "Server" },
  { href: "/client", label: "Client" },
] satisfies {
  href: string;
  label: string;
}[];
