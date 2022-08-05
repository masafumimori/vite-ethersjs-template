import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    open: true // Open browser automatically when running `yarn dev`
    /**
     * Use below if hot reload does not work
     **/
    // watch: {
    //   usePolling: true
    // }
  }
});
