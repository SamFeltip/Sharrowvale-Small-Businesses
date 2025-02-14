import { getCollection, type CollectionEntry } from "astro:content";
import { getImageHelper } from "@scripts/images/getImageHelper";
import { getTagPreviews } from "@scripts/tags/getPreview";
import type { PlaceCard } from "@/components/placeCards/PlaceCard";
import type { PlaceCardRef } from "@/components/placeCards/PlaceCardRef";
import formatBody from "@scripts/content/formatBody";
import type { TagPreview } from "../tags/preview";

export async function getPlaceCardsFromArticles(
    articles: CollectionEntry<"articles">[],
    imgWidth: number = 600
): Promise<PlaceCard[]> {
    const collectionTags = await getCollection("tags");

    return await Promise.all(
        articles.map(async (item) => {
            let imageUrl = await getImageHelper(item.data.heroImage, imgWidth);

            const tagPreviews = getTagPreviews(collectionTags, item.data);

            const itemBody = item.body ? formatBody(item.body) : undefined;

            return {
                title: item.data.name,
                image: imageUrl,
                tags: tagPreviews,
                content: item.data.description,
                lightContent: itemBody,
                href: `/articles/${item.id}`,
                datetime: item.data.dateTime
                    ? new Date(item.data.dateTime)
                    : null,
            };
        })
    );
}

export async function getPlaceCardsFromBusinesses(
    businesses: CollectionEntry<"businesses">[],
    imgWidth: number = 600
): Promise<PlaceCard[]> {
    const collectionTags = await getCollection("tags");

    return await Promise.all(
        businesses.map(async (item) => {
            let imageUrl = await getImageHelper(item.data.heroImage, imgWidth);

            const tagPreviews: TagPreview[] = getTagPreviews(
                collectionTags,
                item.data
            );

            return {
                title: item.data.name,
                image: imageUrl,
                tags: tagPreviews,
                content: item.data.preview,
                href: `/businesses/${item.id}`,
            };
        })
    );
}

/**
 * gets place cards for a given list of place card refs, including an imported image
 * @param imgWidth image width to import images for
 */
export async function getPlaceCards(
    itemRefs: PlaceCardRef[],
    imgWidth: number = 600
): Promise<PlaceCard[]> {
    return await Promise.all(
        itemRefs.map(async (itemRef) => {
            let imageUrl = await getImageHelper(
                itemRef.collectionEntry.data.heroImage,
                imgWidth
            );

            return {
                id: itemRef.collectionEntry.id,
                image: imageUrl,
                title: itemRef.collectionEntry.data.name,
                content: itemRef.collectionEntry.data.description,
                href: `/${itemRef.type}/${itemRef.collectionEntry.id}`,
            } as PlaceCard;
        })
    );
}
