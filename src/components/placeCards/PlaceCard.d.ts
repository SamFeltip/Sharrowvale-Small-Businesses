export type PlaceCard = {
    image: string;
    title: string;
    content?: string;
    searchContent?: string;
    href?: string;
    tags?: { slug: string; name: string }[];
};
