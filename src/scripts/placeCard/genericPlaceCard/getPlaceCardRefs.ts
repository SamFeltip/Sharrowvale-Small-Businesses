import type { GenericCollectionEntry } from "@/components/placeCards/PlaceCardRef";

export function getPlaceCardRefs(
    type: string,
    genericCollectionEntry: GenericCollectionEntry[]
) {
    return genericCollectionEntry.map((item) => {
        if (item.data.heroImage == null) {
            throw new Error(
                "tags must include a hero images to be matched to a PlaceCardRef"
            );
        }

        return {
            type: type,
            item: {
                name: item.data.name,
                description: item.data.description,
                heroImageMetaData: item.data.heroImage,
                slug: item.slug,
            },
        };
    });
}
