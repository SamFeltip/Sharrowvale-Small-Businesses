export type PagefindSearchResult = {
    meta: { content: string; title: string; image: string };
    url: string;
    excerpt: string;
    filters: { tags: string[] };
};
