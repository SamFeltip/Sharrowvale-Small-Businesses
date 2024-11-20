
import { reference, z } from 'astro:content';

export const businessSchema = z.object({
    title: z.string(),
    description: z.string(),
    preview: z.string(),

    type: z.string(),
    
    heroImage: z.string(),
    bannerImage: z.string(),
    additionalImages: z.array(z.string()),

    categories: z.array(reference("category")),

    // Remaining fields
    streetAddress: z.string().nullable(),   // Street address
    email: z.string().nullable(),           // Email
    phoneNumber: z.string().nullable(),     // Phone number
    instagramLink: z.string().url().nullable(),   // Instagram link
    facebookLink: z.string().url().nullable(),    // Facebook link
    websiteLink: z.string().url().nullable(),     // Website link
    yearEstablished: z.string().nullable(), // Year established
    owner: z.string().nullable(),           // Owner
    openDaysStatement: z.string().nullable(), // Open days statement
    specialTag: z.string().nullable(),      // Special Tag
    tags: z.array(z.string()).optional(),  // Updated to an array of strings
});