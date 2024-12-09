import { getCollection, type CollectionEntry } from "astro:content";
import { getImageHelper } from "@scripts/images/getImageHelper";
import { getTagPreviews } from "@scripts/tags/getPreview";
import type { PlaceCard } from "@/components/placeCards/PlaceCard";
import type { PlaceCardRef } from "@/components/placeCards/PlaceCardRef";

export async function getPlaceCardsFromArticles(
    articles: CollectionEntry<"articles">[],
    imgWidth: number = 600
): Promise<PlaceCard[]> {
    const collectionTags = await getCollection("tags");

    return await Promise.all(
        articles.map(async (item) => {
            let imageUrl = await getImageHelper(item.data.heroImage, imgWidth);

            const tagPreviews = getTagPreviews(collectionTags, item.data);

            return {
                title: item.data.name,
                image: imageUrl,
                tags: tagPreviews,
                lightContent: item.data.description,
                href: `/articles/${item.slug}`,
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

            const tagPreviews = getTagPreviews(collectionTags, item.data);

            return {
                title: item.data.name,
                image: imageUrl,
                tags: tagPreviews,
                content: item.data.description,
                href: `/businesses/${item.slug}`,
            };
        })
    );
}

/**
 * gets place cards for a given list of place card refs, including an imported image
 * @param imgWidth image width to import images for
 */
export async function getPlaceCardsFromItems(
    itemRefs: PlaceCardRef[],
    imgWidth: number = 600
): Promise<PlaceCard[]> {
    return await Promise.all(
        itemRefs.map(async (itemRef) => {
            let imageUrl = await getImageHelper(
                itemRef.item.heroImageMetaData,
                imgWidth
            );

            return {
                slug: itemRef.item.slug,
                image: imageUrl,
                title: itemRef.item.name,
                content: itemRef.item.description,
                href: `/${itemRef.type}/${itemRef.item.slug}`,
            } as PlaceCard;
        })
    );
}
