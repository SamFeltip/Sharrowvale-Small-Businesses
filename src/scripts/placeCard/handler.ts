import { getCollection, type CollectionEntry } from "astro:content";
import { getImageHelper } from "@scripts/images/getImageHelper";
import { getTagPreviews } from "@scripts/tags/getPreview";
import type { PlaceCard } from "@/components/placeCards/PlaceCard";

export async function getPlaceCardsFromArticles(
    articles: CollectionEntry<"articles">[],
    imgWidth: number = 400
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
                content: item.data.description,
                href: `/articles/${item.slug}`,
            };
        })
    );
}

export async function getPlaceCardsFromBusinesses(
    articles: CollectionEntry<"businesses">[],
    imgWidth: number = 400
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
                content: item.data.description,
                href: `/businesses/${item.slug}`,
            };
        })
    );
}
