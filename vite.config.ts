/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { vitePlugin as remix } from '@remix-run/dev'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [remix({ ssr: false }), tsconfigPaths(), VitePWA()],
  test: {
    environment: 'happy-dom',
    setupFiles: './src/setup-tests.ts',
  },
  server: {
    fs: {
      // Restrict files that could be served by Vite's dev server.  Accessing
      // files outside this directory list that aren't imported from an allowed
      // file will result in a 403.  Both directories and files can be provided.
      // If you're comfortable with Vite's dev server making any file within the
      // project root available, you can remove this option.  See more:
      // https://vitejs.dev/config/server-options.html#server-fs-allow
      allow: ['app'],
    },
  },
})
