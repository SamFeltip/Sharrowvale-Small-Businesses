import type { CollectionEntry } from "astro:content";
import type { TagPreview } from "./preview";

type TaggedEntity = {
    tags: {
        slug: CollectionEntry<"tags">["slug"];
    }[];
    name: string;
};

/**
 * given a collection,
 * @param tags all tags in the collection
 * @param itemTagReferences reference tags given from some article
 * @returns tag slugs and names
 */
export function getTagPreviews(
    entity: CollectionEntry<"tags">[],
    itemTagReferences: TaggedEntity
): TagPreview[] {
    const itemTagNames = itemTagReferences.tags.map((tag) => tag.slug);

    const articleTags = entity.filter((tag) => itemTagNames.includes(tag.slug));

    const tagPreviews = articleTags.map((tag) => {
        return { slug: tag.slug, name: tag.data.name };
    });
    return tagPreviews;
}
