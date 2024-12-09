export type PlaceCardRef = {
    type: string;
    item: {
        name: string;
        description?: string;
        heroImageMetaData: ImageMetadata;
        slug: string;
    };
};

export type GenericCollectionEntry = {
    slug: string;
    data: {
        name: string;
        description?: string;
        heroImage?: ImageMetadata;
    };
};
