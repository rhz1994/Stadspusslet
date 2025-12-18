import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "cypress/*"],
      extension: [".js", ".ts", ".jsx", ".tsx"],
      cypress: true,
      requireEnv: false,
      forceBuildInstrument: true,
    }),
  ],
  build: {
    sourcemap: true,
  },
});
