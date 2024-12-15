export type PagefindSearchOptions = {
    filters: {
        category?: {
            any: Record<string, any>;
        };
        tags?: Record<string, any>;
    };
    sort?: {
        name: "asc" | "desc";
    };
};
