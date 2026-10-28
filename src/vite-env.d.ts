/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the tw-ubn 統一編號 lookup service (no trailing slash). */
  readonly VITE_UBN_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
