import type { PlaceCard } from "@/components/placeCards/PlaceCard";

/**
 * Sorts the place cards by the order of a list of ids
 */
export function sortByIndex(
    placeCards: PlaceCard[],
    idList: string[]
): PlaceCard[] {
    return placeCards.sort(
        (a, b) => idList.indexOf(a.id ?? "") - idList.indexOf(b.id ?? "")
    );
}

/**
 * Sorts the place cards by the order of a list of ids
 */
export function sortByDateTime(placeCards: PlaceCard[]): PlaceCard[] {
    return placeCards
        .filter((a) => a.publishDate !== undefined)
        .sort(
            (a, b) =>
                (b.publishDate ?? new Date()).getTime() -
                (a.publishDate ?? new Date()).getTime()
        );
}
