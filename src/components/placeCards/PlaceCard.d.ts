export type PlaceCard = {
    id?: string;
    image: string; // output of getImage image url
    title: string;
    content?: string;
    lightContent?: string;
    href?: string;
    tags?: { id: string; name: string }[];
    color?: "white" | "black";
    dateTime?: Date;
};
