import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";
import embeds from 'astro-embed/integration';


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [embeds(), mdx(), sitemap(), react(), tailwind(), pagefind()]
});