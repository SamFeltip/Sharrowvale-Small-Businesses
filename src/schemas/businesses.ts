import { reference, z, type ImageFunction } from "astro:content";

export const businessSchema = ({ image }: { image: ImageFunction }) =>
    z.object({
        name: z.string(),
        description: z.string(),
        preview: z.string(),

        type: z.string(),

        hidden: z.boolean().default(false),

        heroImage: image(),
        bannerImage: image(),
        shopWindowImage: image().optional(),
        additionalImages: z.array(image()),

        tags: z.array(reference("tags")),

        openHours: z.array(z.tuple([z.string(), z.string()])),
        businessContacts: z.array(z.tuple([z.string(), z.string()])),

        publishDate: z.date().optional(),

        // Remaining fields
        streetAddress: z.string().optional(), // Street address
        email: z.string().optional(), // Email
        phoneNumber: z.string().optional(), // Phone number
        instagramLink: z.string().url().optional(), // Instagram link
        facebookLink: z.string().url().optional(), // Facebook link
        websiteLink: z.string().url().optional(), // Website link
        yearEstablished: z.string().optional(), // Year established
        owner: z.string().optional(), // Owner
        openDaysStatement: z.string().optional(), // Open days statement
    });
