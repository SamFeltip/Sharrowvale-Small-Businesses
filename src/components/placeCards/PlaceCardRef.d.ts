export type PlaceCardRef = {
    type: string;
    collectionEntry: GenericCollectionEntry;
};

export type GenericCollectionEntry = {
    slug: string;
    data: {
        name: string;
        description?: string;
        heroImage: ImageMetadata;
    };
};
