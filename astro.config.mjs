// @ts-check
import { defineConfig } from 'astro/config';
import remarkBreaks from 'remark-breaks';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://azinmobiliarios-web.pages.dev',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkBreaks],
  },
});