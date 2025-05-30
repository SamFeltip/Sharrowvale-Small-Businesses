<!-- SearchResults.vue -->
<template>
    <div class="w-full mx-auto">
        <div v-if="searchResults.length === 0" class="text-center py-8 text-gray-500">
            No results found
        </div>

        <TransitionGroup name="list" tag="div" v-else class="gap-6" :class="{ gridLayout: isGridLayout }"
            id="search-results">

            <PlaceCardGridItem v-if="isGridLayout" v-for="result in searchResults" :key="`gridLayout-${result.url}`"
                :tags="getDisplayTags(result)" :image="result.meta?.image || ''" :content="result.meta?.content"
                :title="result.meta?.title || ''" :href="result.url" :color="color" />

            <PlaceCardWide v-else v-for="result in searchResults" :key="result.url" :tags="getDisplayTags(result)"
                :image="result.meta?.image || ''" :content="result.meta?.content" :title="result.meta?.title || ''"
                :href="result.url" :lightContent="result.excerpt" :color="color" />

        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import PlaceCardWide from "../placeCards/PlaceCardWide.vue";
import PlaceCardGridItem from "../placeCards/PlaceCardGridItem.vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";

const props = defineProps<{
    tag?: string,
    isGridLayout: boolean,
    hiddenTags?: string[],
    color?: "white" | "black"
}>();

const { color = "black" } = props;
const searchResults = defineModel<PagefindSearchResult[]>("searchResults", { required: true });

function getDisplayTags(result: PagefindSearchResult): { id: string; name: string }[] {
    const tags = result.filters?.tags || [];

    const tagValues = Object.values(tags);

    const filteredTags = tagValues.filter((tag: string) => tag !== props.tag && !props.hiddenTags?.includes(tag)).slice(0, 3);

    return filteredTags.map((tag: string) => ({ id: tag, name: tag }));
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
    grid-template-columns: 1fr;
}

@media screen and (min-width: 640px) {
    #search-results.gridLayout {
        grid-template-columns: 1fr 1fr;
    }

}

@media screen and (min-width: 768px) {
    #search-results.gridLayout {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: transform 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>
