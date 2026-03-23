// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sae401dev.mathis-guellati.fr',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/apis'),
    }),
  ],
  security: {
    checkOrigin: false
  },
  vite: {
    plugins: [tailwindcss()]
  }
});