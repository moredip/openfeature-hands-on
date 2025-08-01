import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nitro from "@analogjs/vite-plugin-nitro";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nitro({
      ssr: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
