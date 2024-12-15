export type PagefindSearchResult = {
    meta: { content: string; title: string; image: string };
    url: string;
    excerpt: string;
    filters: { tags: string[]; category: string[] };
};

export type PagefindSearchOutput = {
    results: { data: () => PagefindSearchResult }[];
    filters: PagefindSearchOptions["filters"];
};
