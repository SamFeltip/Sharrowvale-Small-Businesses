import { getCollection, type CollectionEntry } from "astro:content";

export async function getPromotedTags(
    businesses: CollectionEntry<"businesses">[]
) {
    const businessTags = businesses
        .map((business) => business.data.tags)
        .flat();

    const promotedTagSlugs = Array.from(
        new Set(businessTags.map((tag) => tag.slug))
    );

    const slugCounts = getTagAppearanceCounts(businessTags);

    const promotedTags = await getCollection(
        "tags",
        (tag) => promotedTagSlugs.includes(tag.slug) && tag.data.isVisible
    );

    return promotedTags
        .sort((a, b) => slugCounts[b.slug] - slugCounts[a.slug])
        .filter((tag) => slugCounts[tag.slug] < businesses.length - 1);
}

function getTagAppearanceCounts(
    businessTags: { collection: "tags"; slug: string }[]
): Record<string, number> {
    return businessTags.reduce((acc, tag) => {
        acc[tag.slug] = (acc[tag.slug] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
}