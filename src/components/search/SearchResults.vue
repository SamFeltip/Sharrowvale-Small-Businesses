<!-- SearchResults.vue -->
<template>
    <div class="w-full mx-auto px-4">
        <div
            v-if="searchResults.length === 0"
            class="text-center py-8 text-gray-500"
        >
            No results found
        </div>

        <TransitionGroup
            name="list"
            tag="div"
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
                :image="result.meta?.image || ''"
                :content="result.meta?.content"
                :title="result.meta?.title  || ''"
                :href="result.url"
            />
            <PlaceCardWide
                v-else
                v-for="result in searchResults"
                :key="result.url"
                :categories="getDisplayTags(result)"
                :image="result.meta?.image || ''"
                :content="result.meta?.content"
                :title="result.meta?.title || ''"
                :href="result.url"
            />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import type { CustomRecord } from "pagefind";
import PlaceCardWide from "../placeCards/PlaceCardWide.vue";
import PlaceCardGrid from "../placeCards/PlaceCardGrid.vue";

const props = defineProps<{
    category?: string,
    isGridLayout: boolean,
    hiddenCategories: string[]
}>();

const searchResults = inject("searchResults", ref([] as CustomRecord[]));

console.log(searchResults.value);

function getDisplayTags(result: CustomRecord): { slug: string; name: string }[] {
    let tags = result.filters?.category || [];

    tags = tags.filter((tag: string) => tag !== props.category && !props.hiddenCategories?.includes(tag)).slice(0, 3);

    return tags.map((tag: string) => ({ slug: tag, name: tag }));
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
    grid-template-columns: 1fr 1fr;
}

@media screen and (min-width: 768px) {
    #search-results.gridLayout {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

.list-move, /* apply transition to moving elements */
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
