import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/tailwind-config/tailwind.config";
import { withUt } from "uploadthing/tw";

const config: Pick<Config, "presets"> = {
  presets: [sharedConfig],
};

export default withUt({
  config,
  content: ["./src/**/*.{ts,tsx,mdx}"],
});
