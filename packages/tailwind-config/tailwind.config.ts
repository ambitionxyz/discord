import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: ["./**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  plugins: [],
};
export default config;
