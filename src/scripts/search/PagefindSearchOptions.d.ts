/**
 * Props and refs from a search wrapper vue component used to construct PAgefindSearchOptions
 */
export type SearchOptionsConfig = {
    sortAscending: boolean;
    selectedTags: string[];
    requiredTag?: string;
    requiredCategories?: string[];
};

/**
 * options passed into pagefind.search
 */
export type PagefindSearchOptions = {
    filters: {
        category?: {
            any: Record<string, any>;
        };
        tags?: Record<string, any>;
    };
    sort?: {
        title: "asc" | "desc";
    };
};
