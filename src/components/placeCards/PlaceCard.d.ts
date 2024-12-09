export type PlaceCard = {
    slug?: string;
    image: string; // output of getImage image url
    title: string;
    content?: string;
    lightContent?: string;
    href?: string;
    tags?: { slug: string; name: string }[];
};
