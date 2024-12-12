<!-- SearchWrapper.vue -->
<template>
    <div id="search-wrapper" class="w-full gap-6" :class="{ gridLayout: isGridLayout }">
        <SearchBox :search-results="searchResults" :isGridLayout :requiredTag="requiredTag"
            :requiredCategories="requiredCategories" />
        <SearchResults :search-results="searchResults" :tag="requiredTag" :isGridLayout="isGridLayout"
            :hiddenTags="hiddenTags" />
    </div>
</template>

<script setup lang="ts">

import SearchBox from "./SearchBox.vue";
import SearchResults from "./SearchResults.vue";

import { provide, ref } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";

const props = defineProps<{
    requiredTag?: string,
    requiredCategories: string[],
    isGridLayout: boolean,
    hiddenTags?: string[]
}>();

const { requiredTag, isGridLayout, hiddenTags } = props;

const searchResults = ref<PagefindSearchResult[]>([]);
const searchQuery = ref("");
const selectedTags = ref([]);
const availableTags = ref([]);

provide("searchQuery", searchQuery);
provide("selectedTags", selectedTags);
provide("availableTags", availableTags);
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
