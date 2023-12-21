// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProduction = mode === "production";
  const basePath = isProduction ? "/FootScheduler" : "http://localhost:3000";

  return defineConfig({
    base: basePath,
    plugins: [react()],
  });
};
