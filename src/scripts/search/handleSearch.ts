import type {
    PagefindSearchOutput,
    PagefindSearchResult,
} from "@/components/search/src/PagefindSearchResult";
import type { PagefindSearchOptions } from "./PagefindSearchOptions";
import type { SearchOptionsConfig } from "./searchOptionsConfig";
import { getAvailableTags } from "./getAvailableTags";
import type { PagefindResource } from "./PagefindResource";

export async function search(
    searchQuery: string,
    searchOptionsConfig: SearchOptionsConfig,
    pagefind: PagefindResource
): Promise<[PagefindSearchResult[], string[]]> {
    console.log("handling");

    let searchOptions = getSearchOptions(searchOptionsConfig);

    if (searchQuery == "") {
        return await loadAllResults(searchOptions, pagefind);
    } else {
        return await updateSearch(searchQuery, searchOptions, pagefind);
    }
}

export function getSearchOptions(
    config: SearchOptionsConfig
): PagefindSearchOptions {
    let searchOptions: PagefindSearchOptions = {
        filters: {
            tags: [],
            category: { any: [] },
        },
        sort: { name: config.sortAscending ? "asc" : "desc" },
    };

    if (config.requiredTag !== undefined) {
        searchOptions.filters.tags = [config.requiredTag];
    }

    if (
        config.requiredCategories !== undefined &&
        searchOptions.filters.category !== undefined
    ) {
        searchOptions.filters.category.any = config.requiredCategories;
    }

    if (config.selectedTags.length > 0) {
        console.log("adding filters");
        searchOptions.filters.tags?.push(...config.selectedTags);
    }

    return searchOptions;
}

async function loadAllResults(
    searchOptions: PagefindSearchOptions,
    pagefind: PagefindResource
): Promise<[PagefindSearchResult[], string[]]> {
    const allResults = await pagefind.search(null, searchOptions);

    let selectedTags: string[] = getSelectedTags(searchOptions);

    return processResults(allResults, selectedTags);
}

export async function updateSearch(
    searchQuery: string,
    searchOptions: PagefindSearchOptions,
    pagefind: PagefindResource
): Promise<[PagefindSearchResult[], string[]]> {
    const results = await pagefind.search(searchQuery, searchOptions);

    let selectedTags: string[] = getSelectedTags(searchOptions);

    return processResults(results, selectedTags);
}

function getSelectedTags(searchOptions: PagefindSearchOptions) {
    let selectedTags: string[] = [];

    if (searchOptions.filters.tags !== undefined) {
        selectedTags = searchOptions.filters.tags.map(
            (tag: Record<string, number>) => tag
        );
    }

    return selectedTags;
}

async function processResults(
    pagefindResults: PagefindSearchOutput,
    selectedTags: string[]
): Promise<[PagefindSearchResult[], string[]]> {
    const data = await Promise.all(
        pagefindResults.results.map((result) => result.data())
    );

    console.log(pagefindResults.filters);

    const tags = getAvailableTags(pagefindResults);

    console.log(tags);

    const recommendedTags = tags
        .filter((tag) => selectedTags.includes(tag) == false)
        .slice(0, 10);

    const availableTags = [...selectedTags, ...recommendedTags];

    return [data, availableTags];
}
