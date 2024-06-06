import { type Config, preset } from "@aqua/tailwind";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [preset],
};

export default config;
