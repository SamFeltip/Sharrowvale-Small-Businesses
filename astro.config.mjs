import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";
import embeds from "astro-embed/integration";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    experimental: {
        // contentCollectionCache: false,
        contentIntellisense: true,
        // contentLayer: true,
    },
    site: "https://www.sharrowvale.co.uk",
    integrations: [
        embeds(),
        mdx(),
        sitemap({
            changefreq: "weekly",
            lastmod: new Date("2024-11-04"),
        }),
        react(),
        tailwind(),
        pagefind(),
        vue(),
    ],
});
