// vite.config.js
import { defineConfig } from "vite";

export default ({ command, mode }) => {
  const basePath =
    mode === "production" ? "/FootScheduler/" : "https://localhost:3000";

  return defineConfig({
    base: basePath,
    define: {
      "import.meta.env.VITE_APP_BASE_PATH": JSON.stringify(basePath),
    },
  });
};
