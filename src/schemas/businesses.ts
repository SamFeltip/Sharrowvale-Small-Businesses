
import { z } from 'astro:content';

export const businessSchema = z.object({
    title: z.string(),
    description: z.string(),
    preview: z.string(),

    type: z.string(),
    heroImage: z.string(),
    bannerImage: z.string(),
    longitude: z.number().nullable(),
    latitude: z.number().nullable(),
    additionalImages: z.array(z.string()),

    // Remaining fields
    streetAddress: z.string().nullable(),   // Street address
    email: z.string().nullable(),           // Email
    phoneNumber: z.string().nullable(),     // Phone number
    instagramLink: z.string().nullable(),   // Instagram link
    facebookLink: z.string().nullable(),    // Facebook link
    websiteLink: z.string().nullable(),     // Website link
    yearEstablished: z.string().nullable(), // Year established
    owner: z.string().nullable(),           // Owner
    openDaysStatement: z.string().nullable(), // Open days statement
    specialTag: z.string().nullable(),      // Special Tag
    tags: z.array(z.string()).optional(),  // Updated to an array of strings
    openingHoursDays: z.string().nullable(), // Opening hours (Days of the week)
    openingHoursTimes: z.string().nullable(), // Opening hours (Times of day)
});