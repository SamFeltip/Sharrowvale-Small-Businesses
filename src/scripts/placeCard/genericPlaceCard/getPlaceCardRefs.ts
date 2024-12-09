import type {
    GenericCollectionEntry,
    PlaceCardRef,
} from "@/components/placeCards/PlaceCardRef";

export function getPlaceCardRefs(
    type: string,
    genericCollectionEntry: GenericCollectionEntry[]
): PlaceCardRef[] {
    return genericCollectionEntry.map((item) => {
        if (item.data.heroImage == null) {
            throw new Error(
                "tags must include a hero images to be matched to a PlaceCardRef"
            );
        }

        console.log("***");
        console.log(item.data.heroImage);

        return {
            type: type,
            collectionEntry: item,
        };
    });
}
