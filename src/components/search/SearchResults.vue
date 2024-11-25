<!-- SearchResults.vue -->
<template>
    <div class="w-full mx-auto px-4">
        <div
            v-if="searchResults.length === 0"
            class="text-center py-8 text-gray-500"
        >
            No results found
        </div>

        <div
            v-else
            class="gap-6"
            :class="{ gridLayout: isGridLayout }"
            id="search-results"
        >
            <PlaceCardGrid
                v-if="isGridLayout"
                v-for="result in searchResults"
                :key="`gridLayout-${result.url}`"
                :categories="getDisplayTags(result)"
                :image="result.meta.image"
                :content="result.meta.content"
                :title="result.meta.title"
                :href="result.url"
            />
            <PlaceCardWide
                v-else
                v-for="result in searchResults"
                :key="result.url"
                :categories="getDisplayTags(result)"
                :image="result.meta.image"
                :content="result.meta.content"
                :title="result.meta.title"
                :href="result.url"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import type { CustomRecord } from "pagefind";
import PlaceCardWide from "../placeCards/PlaceCardWide.vue";
import PlaceCardGrid from "../placeCards/PlaceCardGrid.vue";

const props = defineProps({
    category: {
        type: String,
        required: false,
    },
    isGridLayout: {
        type: Boolean,
        default: false,
    },
});

const searchResults = inject("searchResults", ref([] as CustomRecord[]));

console.log(searchResults.value);

function getDisplayTags(result): { slug: string; name: string }[] {
    let tags = result.filters?.category || [];

    tags = tags.filter((tag) => tag !== props.category).slice(0, 3);

    return tags.map((tag) => ({ slug: tag, name: tag }));
}
</script>

<style>
/* css container */
#search-results {
    container-name: search-results;
    container-type: inline-size;

    display: grid;
    grid-template-columns: 1fr;
}

#search-results.gridLayout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
</style>
