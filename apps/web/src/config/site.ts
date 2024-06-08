import packageJson from "../../package.json";

export const siteConfig = {
  name: "Aqua",
  description: packageJson.description,
  url: packageJson.homepage,
  keywords: packageJson.keywords,
  links: {
    twitter: "https://twitter.com/fellipeutaka",
    github: packageJson.repository.url.replace(".git", ""),
  },
  author: packageJson.author,
};

export const navLinks = [
  { href: "/events", title: "Events" },
  { href: "/attendees", title: "Attendees" },
] satisfies {
  href: string;
  title: string;
}[];
