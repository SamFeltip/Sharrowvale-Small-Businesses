import { reference, z, type ImageFunction } from "astro:content";

export const businessSchema = ({ image }: { image: ImageFunction }) =>
    z.object({
        name: z.string(),
        description: z.string(),
        preview: z.string(),

        type: z.string(),

        heroImage: image(),
        bannerImage: image(),
        additionalImages: z.array(image()),

        tags: z.array(reference("tags")),

        openHours: z.array(z.tuple([z.string(), z.string()])),

        businessContacts: z.array(z.tuple([z.string(), z.string()])),

        // Remaining fields
        streetAddress: z.string().nullable(), // Street address
        email: z.string().nullable(), // Email
        phoneNumber: z.string().nullable(), // Phone number
        instagramLink: z.string().url().nullable(), // Instagram link
        facebookLink: z.string().url().nullable(), // Facebook link
        websiteLink: z.string().url().nullable(), // Website link
        yearEstablished: z.string().nullable(), // Year established
        owner: z.string().nullable(), // Owner
        openDaysStatement: z.string().nullable(), // Open days statement
    });
