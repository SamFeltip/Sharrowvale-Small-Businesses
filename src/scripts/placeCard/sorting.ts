import type { PlaceCard } from "@/components/placeCards/PlaceCard";

/**
 * Sorts the place cards by the order of a list of slugs
 */
export function sortByIndex(
    placeCards: PlaceCard[],
    slugList: string[]
): PlaceCard[] {
    return placeCards.sort(
        (a, b) =>
            slugList.indexOf(a.slug ?? "") - slugList.indexOf(b.slug ?? "")
    );
}
