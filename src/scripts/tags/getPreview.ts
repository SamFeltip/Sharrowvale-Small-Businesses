import type { CollectionEntry } from "astro:content";
import type { TagPreview } from "./preview";

type TaggedEntity = {
    tags: {
        id: CollectionEntry<"tags">["id"];
    }[];
    name: string;
};

/**
 * given a collection,
 * @param tags all tags in the collection
 * @param itemTagReferences reference tags given from some article
 * @returns tag ids and names
 */
export function getTagPreviews(
    entity: CollectionEntry<"tags">[],
    itemTagReferences: TaggedEntity
): TagPreview[] {
    const itemTagNames = itemTagReferences.tags.map((tag) => tag.id);

    const articleTags = itemTagNames
        .map((id) => entity.find((tag) => tag.id === id))
        .filter((tag) => tag !== undefined);

    const tagPreviews = articleTags.map((tag) => {
        return { id: tag.id, name: tag.data.name };
    });

    return tagPreviews;
}
