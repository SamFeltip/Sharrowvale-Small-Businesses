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
    redirects: {
        "/businesses": "/categories/directory",
        "/businesses/cornerstone-dyson-place": "/businesses/cornerstone",
        "/about": "/join",
        "/categories/tradespeople": "/coming-soon",
        "/businesses/woodys/": "/coming-soon",
    },
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
            changefreq: "monthly",
            lastmod: new Date(),
        }),
        react(),
        tailwind(),
        pagefind(),
        vue(),
    ],
});
