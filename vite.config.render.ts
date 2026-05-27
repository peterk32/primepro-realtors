// Parallel Vite config used ONLY for Render (Node SSR) deployment.
// The default `vite.config.ts` continues to build for Cloudflare Workers
// (used by Lovable Preview / Publish). This file is invoked by
// `npm run build:render` (see package.json) and produces a Node server
// bundle in `.output/` that Render runs with `node .output/server/index.mjs`.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
