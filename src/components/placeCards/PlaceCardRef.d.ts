export type PlaceCardRef = {
    type: string;
    item: {
        name: string;
        description?: string;
        heroImageMetaData: ImageMetadata;
        slug: string;
    };
};
