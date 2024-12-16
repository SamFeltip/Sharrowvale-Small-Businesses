import type {
    PagefindSearchOutput,
    PagefindSearchResult,
} from "@/components/search/src/PagefindSearchResult";
import type {
    PagefindSearchOptions,
    SearchOptionsConfig,
} from "./PagefindSearchOptions";
import { getAvailableTags } from "./getAvailableTags";
import type { PagefindResource } from "./PagefindResource";

export async function search(
    searchQuery: string,
    searchOptionsConfig: SearchOptionsConfig,
    pagefind: PagefindResource
): Promise<[PagefindSearchResult[], string[]]> {
    const pagefindResults = await doSearch(
        searchQuery,
        searchOptionsConfig,
        pagefind
    );

    const results = await processResults(pagefindResults);

    console.log(results);

    const tags = getFilterTags(pagefindResults, searchOptionsConfig);

    return [results, tags];
}

async function doSearch(
    searchQuery: string,
    searchOptionsConfig: SearchOptionsConfig,
    pagefind: PagefindResource
): Promise<PagefindSearchOutput> {
    let searchOptions = getPagefindSearchOptions(searchOptionsConfig);

    let search: string | null = searchQuery;

    if (searchQuery == "") {
        search = null;
    }

    console.log(searchOptions);
    console.log(search);

    const res = await pagefind.search(search, searchOptions);
    return res;
}

export function getPagefindSearchOptions(
    config: SearchOptionsConfig
): PagefindSearchOptions {
    let searchOptions: PagefindSearchOptions = {
        filters: {
            tags: [],
            category: { any: [] },
        },
        sort: { title: config.sortAscending ? "asc" : "desc" },
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

async function processResults(
    pagefindResults: PagefindSearchOutput
): Promise<PagefindSearchResult[]> {
    const data = await Promise.all(
        pagefindResults.results.map((result) => result.data())
    );

    return Object.values(data);
}

function getFilterTags(
    pagefindResults: PagefindSearchOutput,
    searchOptionsConfig: SearchOptionsConfig
) {
    const availableTags = getAvailableTags(pagefindResults);

    const recommendedTags = availableTags
        .filter(
            (tag) => searchOptionsConfig.selectedTags.includes(tag) == false
        )
        .slice(0, 10);

    const tags = [...searchOptionsConfig.selectedTags, ...recommendedTags];
    return tags;
}
