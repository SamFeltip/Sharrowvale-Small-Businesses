/**
 * the result of awaiting pagefind's data() method on a single entry
 */
export type PagefindSearchResult = {
    meta: { content: string; title: string; image: string };
    url: string;
    excerpt: string;
    filters?: {
        tags: Record<number, string>;
        category: Record<number, string>;
    };
};

/**
 * output of pagefind.search
 */
export type PagefindSearchOutput = {
    results: { data: () => PagefindSearchResult }[];
    filters: PagefindSearchOptions["filters"];
};
