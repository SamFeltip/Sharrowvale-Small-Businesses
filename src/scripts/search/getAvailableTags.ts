import type { PagefindSearchOutput } from "@/components/search/src/PagefindSearchResult";
import type { PagefindSearchOptions } from "./PagefindSearchOptions";

export function getAvailableTags(
    pagefindResults: PagefindSearchOutput
): string[] {
    let tags = pagefindResults.filters?.tags ?? {};

    let tagEntries = Object.entries(tags) as [string, number][];

    const validTags = tagEntries.filter(
        ([key, value]) => value > 0 && value < pagefindResults.results.length
    );

    const sortedTags = validTags.sort((a, b) => b[1] - a[1]);

    return sortedTags.map(([key, value]) => key);
}