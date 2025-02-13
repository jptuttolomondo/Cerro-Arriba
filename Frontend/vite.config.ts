import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
//import fs from 'fs'
//import path from "path";
// https://vite.dev/config/
//const certPath = path.resolve(__dirname, "../certs");
export default defineConfig({
  server: {
    // https: {
    //   key: fs.readFileSync(path.join(certPath, "serverLibre.key")),
    //   cert: fs.readFileSync(path.join(certPath, "serverLibre.crt")),
    // },
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,

    allowedHosts: [
      "localhost",
      "192.168.157.123",
    ],
  },
  plugins: [react()],
});