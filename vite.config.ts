// vite.config.js
import { defineConfig } from "vite";

export default ({ command, mode }) => {
  const basePath = mode === "production" ? "/FootScheduler/" : "/";

  return defineConfig({
    base: basePath,
  });
};
