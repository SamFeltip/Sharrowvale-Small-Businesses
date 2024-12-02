export type PlaceCard = {
    image: string;
    title: string;
    content?: string;
    href?: string;
    tags?: { slug: string; name: string }[];
};