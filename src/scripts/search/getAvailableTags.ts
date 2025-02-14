import type { PagefindSearchOutput } from "@/components/search/src/PagefindSearchResult";

export function getAvailableTags(
    pagefindResults: PagefindSearchOutput
): string[] {
    let tags = pagefindResults.filters?.tags ?? {};

    let tagEntries = Object.entries(tags) as [string, number][];

    const validTags = tagEntries.filter(
        ([_, value]) => value > 0 && value < pagefindResults.results.length
    );

    const sortedTags = validTags.sort((a, b) => b[1] - a[1]);

    return sortedTags.map(([key, _]) => key);
}
