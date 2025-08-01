import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nitro from "@analogjs/vite-plugin-nitro";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nitro({
      ssr: false,
    }),
  ],
});
