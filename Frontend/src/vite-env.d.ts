/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND: string;
    readonly VITE_PRODUCTS_BACK: string;
    // Agrega aquí otras variables que necesites
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  