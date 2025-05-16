import { defineCollection } from "astro:content";

import { businessSchema } from "@/schemas/businesses";
import { articleSchema } from "@/schemas/articles";
import { tagSchema } from "@/schemas/tag";
import { categorySchema } from "@/schemas/category";
import { pricingSchema } from "@/schemas/pricing";
import { contactSchema } from "@/schemas/contact";
import { faqSchema } from "@/schemas/faq";
import { file, glob } from "astro/loaders";

import { parse as parseCsv } from "csv-parse/sync";
import { eventSchema } from "@/schemas/events";

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

const eventCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "src/content/events",
    }),

    schema: eventSchema,
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

const pricingCollection = defineCollection({
    loader: file("src/content/pricing.csv", {
        parser: (text) => {
            return parseCsv(text, {
                cast: true,
                columns: true,
                skipEmptyLines: true,
            });
        },
    }),
    schema: pricingSchema,
});

const contactCollection = defineCollection({
    loader: file("src/content/contact.csv", {
        parser: (text) => {
            return parseCsv(text, {
                cast: true,
                columns: true,
                skipEmptyLines: true,
            });
        },
    }),
    schema: contactSchema,
});

const faqCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "src/content/pages/join/FAQs",
    }),

    schema: faqSchema,
});

export const collections = {
    prices: pricingCollection,
    businesses: businessCollection,
    tags: tagCollection,
    articles: articleCollection,
    events: eventCollection,
    categories: categoryCollection,
    contacts: contactCollection,
    faqs: faqCollection,
};
