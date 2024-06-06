await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
