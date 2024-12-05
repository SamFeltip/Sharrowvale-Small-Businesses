export type PlaceCard = {
    image: string;
    title: string;
    content?: string;
    lightContent?: string;
    href?: string;
    tags?: { slug: string; name: string }[];
};
