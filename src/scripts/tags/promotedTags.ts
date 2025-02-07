import { getCollection, type CollectionEntry } from "astro:content";

export async function getPromotedTagsFromBusiness(
    businesses: CollectionEntry<"businesses">[]
): Promise<CollectionEntry<"tags">[]> {
    const businessTags = businesses
        .map((business) => business.data.tags)
        .flat();

    const promotedTagids = Array.from(
        new Set(businessTags.map((tag) => tag.id))
    );

    const idCounts = getTagAppearanceCounts(businessTags);

    const promotedTags = await getCollection(
        "tags",
        (tag) => promotedTagids.includes(tag.id) && tag.data.isVisible
    );

    const output = promotedTags
        .sort((a, b) => idCounts[b.id] - idCounts[a.id])
        .filter((tag) => idCounts[tag.id] < businesses.length);

    console.log(businesses.length);

    return output;
}

function getTagAppearanceCounts(
    businessTags: { collection: "tags"; id: string }[]
): Record<string, number> {
    return businessTags.reduce(
        (acc, tag) => {
            acc[tag.id] = (acc[tag.id] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );
}
