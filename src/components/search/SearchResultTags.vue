<template>
    <TagList :tags="tagPlaceCards" :type="type" />
</template>

<script setup lang="ts">
import TagList from "@/components/promos/TagList.vue";
import { ref, watchEffect, type Ref } from "vue";
import type { GenericCollectionEntry, PlaceCardRef } from "../placeCards/PlaceCardRef";

import type { PagefindSearchResult } from "./src/PagefindSearchResult";

const tags = defineModel<PagefindSearchResult[]>("tags", { required: true });

const props = defineProps<{
    type?: "white-clear" | "yellow" | "clear";
}>();

const { type = "clear" } = props;

let tagPlaceCards: Ref<PlaceCardRef[]> = ref([]);

watchEffect(async () => {

    tagPlaceCards.value = tags.value.map((tag) => ({
        type: "tags",
        collectionEntry: {
            slug: tag.url.split("/")[2], // "/tags/pub/"
            data: {
                name: tag.meta.title,
            }
        } as GenericCollectionEntry,
    }));

    console.log(tags.value);

})

</script>