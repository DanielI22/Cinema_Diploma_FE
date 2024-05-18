import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

// Path to the SSL files
const certPath = path.resolve(__dirname, 'localhost.crt');
const keyPath = path.resolve(__dirname, 'localhost.key');

// Ensure the SSL files are read synchronously
const httpsOptions = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath)
};

export default defineConfig({
  plugins: [react()],
  server: {
    https: httpsOptions
  }
});