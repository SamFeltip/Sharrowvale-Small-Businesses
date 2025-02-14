export type PlaceCardRef = {
    type: string;
    collectionEntry: GenericCollectionEntry;
};

export type GenericCollectionEntry = {
    id: string;
    data: {
        name: string;
        description?: string;
        heroImage: ImageMetadata;
    };
};
