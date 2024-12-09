import type {
    GenericCollectionEntry,
    PlaceCardRef,
} from "@/components/placeCards/PlaceCardRef";

export function getPlaceCardRefs(
    type: string,
    genericCollectionEntry: GenericCollectionEntry[]
): PlaceCardRef[] {
    return genericCollectionEntry.map((item) => {
        return {
            type: type,
            collectionEntry: item,
        };
    });
}
