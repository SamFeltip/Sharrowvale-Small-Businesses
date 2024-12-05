export type PlaceCard = {
    slug?: string;
    image: string;
    title: string;
    content?: string;
    lightContent?: string;
    href?: string;
    tags?: { slug: string; name: string }[];
};
