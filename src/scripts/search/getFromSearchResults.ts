import type { PagefindSearchResult } from "@/components/search/src/PagefindSearchResult";

export function getTagsFromSearchResults(
    searchResults: PagefindSearchResult[]
): PagefindSearchResult[] {
    return searchResults.filter((result) => {
        let categories = result.filters?.category;

        if (categories == null) return false;

        let categoryNames = Object.values(categories);

        return categoryNames.includes("Tag");
    });
}

export function getArticlesFromSearchResults(
    searchResults: PagefindSearchResult[]
): PagefindSearchResult[] {
    const filteredResults = searchResults.filter((result) => {
        let categories = result.filters?.category;

        if (categories == null) return false;

        let categoryNames = Object.values(categories);

        const isArticle =
            !categoryNames.includes("Directory") &&
            !categoryNames.includes("Tag");

        return isArticle;
    });

    return Object.values(filteredResults);
}
