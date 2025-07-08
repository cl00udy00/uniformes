import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://medora-pacientes.vercel.app",
  output: "server",
  server: { host: true, port: 4321 },
  adapter: vercel(),
  integrations: [tailwind(), solidJs()],
});
