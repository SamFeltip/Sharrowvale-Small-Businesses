import { defineCollection, getCollection, reference, z } from "astro:content";

import { businessSchema } from "@/schemas/businesses";
import { articleSchema } from "@/schemas/articles";
import { tagSchema } from "@/schemas/tag";
import { categorySchema } from "@/schemas/category";
import { pricingSchema } from "@/schemas/pricing";
import { file, glob } from "astro/loaders";

import { parse as parseCsv } from "csv-parse/sync";

const businessCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "src/content/businesses",
    }),

    schema: businessSchema,
});

const articleCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "src/content/articles",
    }),

    schema: articleSchema,
});

const categoryCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "src/content/categories",
    }),

    schema: categorySchema,
});

const tagCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "src/content/tags",
    }),

    // Type-check frontmatter using a schema
    schema: tagSchema,
});

const exampleData = [
    { id: "something", one: "wow" },
    { id: "else", two: "wowiee" },
];

const pricingCollection = defineCollection({
    loader: file("src/content/pricing.csv", {
        parser: (text) => {
            console.log(text);
            console.log("***");
            return parseCsv(text, {
                cast: true,
                columns: true,
                skipEmptyLines: true,
            });
        },
    }),
    schema: pricingSchema,
});

export const collections = {
    prices: pricingCollection,
    businesses: businessCollection,
    tags: tagCollection,
    articles: articleCollection,
    categories: categoryCollection,
};
