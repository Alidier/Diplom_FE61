import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'selectors': path.resolve(__dirname, 'src/selectors'),
      'reducers': path.resolve(__dirname, 'src/reducers'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'api': path.resolve(__dirname, 'src/api'),
      'shared': path.resolve(__dirname, 'src/shared'),
    }
  }
});
