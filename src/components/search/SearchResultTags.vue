<template>
    <TagList :tags="tags" />
</template>

<script setup lang="ts">
import TagList from "@/components/promos/TagList.vue";
import { ref, watchEffect, type Ref } from "vue";
import type { PlaceCardRef } from "../placeCards/PlaceCardRef";
import type { CollectionEntry } from "astro:content";

import { getPromotedTagsFromTagNames } from "@/scripts/tags/promotedTags";

const tagNames = defineModel<string[]>("tagNames", { required: true });

console.log(tagNames.value);

let tags: Ref<PlaceCardRef[]> = ref([]);

watchEffect(async () => {

    const tagCollection: CollectionEntry<"tags">[] = await getPromotedTagsFromTagNames(tagNames.value);

    tags.value = tagCollection.map((tag) => ({
        type: "tags",
        collectionEntry: tag,
    }));

})

</script>