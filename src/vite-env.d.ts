/// <reference types="vite/client" />

declare module "vite" {
  interface ImportMeta {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env: Record<string, any>;
  }
}
