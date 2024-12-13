<!-- SearchWrapper.vue -->
<template>
    <div id="search-wrapper" class="w-full gap-6" :class="{ gridLayout: isGridLayout }">
        <SearchBox v-model:searchResults="searchResults" v-model:searchQuery="searchQuery"
            v-model:available-tags="availableTags" v-model:selectedTags="selectedTags" :isGridLayout
            :requiredTag="requiredTag" :requiredCategories="requiredCategories" />
        <SearchCarousel :search-results="searchResults" />
        <SearchResults v-model:searchResults="searchResults" :tag="requiredTag" :isGridLayout="isGridLayout"
            :hiddenTags="hiddenTags" />
    </div>
</template>

<script setup lang="ts">

import SearchCarousel from "./SearchCarousel.vue";
import SearchBox from "./SearchBox.vue";
import SearchResults from "./SearchResults.vue";

import { provide, reactive, ref, watch } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import Carousel from "../ui/carousel/Carousel.vue";
import type { PlaceCard } from "../placeCards/PlaceCard";

const props = defineProps<{
    requiredTag?: string,
    requiredCategories: string[],
    isGridLayout: boolean,
    hiddenTags?: string[]
}>();

const { requiredTag, isGridLayout, hiddenTags } = props;

let searchResults = reactive<PagefindSearchResult[]>([]);
let searchQuery = ref("");
let selectedTags = reactive([]);
let availableTags = reactive([]);

let carouselItems = reactive<PlaceCard[]>([]);

carouselItems = searchResults.map((result) => ({
    title: result.meta?.title || "",
    image: result.meta?.image || "",
    content: result.meta?.content || "",
    href: result.url || "",
}));

console.log(carouselItems);
console.log(searchResults);

</script>

<style>
#search-wrapper.gridLayout {
    display: flex;
    flex-direction: column;
}

#search-wrapper {
    display: grid;
    grid-template-columns: 1fr;
}

@media screen and (min-width: 1150px) {
    #search-wrapper {
        grid-template-columns: 370px 1fr;
    }
}
</style>
