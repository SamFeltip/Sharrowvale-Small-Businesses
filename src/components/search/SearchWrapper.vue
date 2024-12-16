<!-- SearchWrapper.vue -->
<template>
    <div id="search-wrapper" class="w-full gap-6" :class="{ gridLayout: isGridLayout }">
        <Loader v-if="loading" />

        <SearchBox v-model:searchResults="searchResults" v-model:searchQuery="searchQuery"
            v-model:selectedTags="selectedTags" :availableTags :isGridLayout :requiredTag="requiredTag"
            :requiredCategories="requiredCategories" v-model:loading="loading" />
        <SearchResults v-model:searchResults="searchResults" :tag="requiredTag" :isGridLayout="isGridLayout"
            :hiddenTags="hiddenTags" />
    </div>
</template>

<script setup lang="ts">

import SearchBox from "./SearchBox.vue";
import SearchResults from "./SearchResults.vue";

import { ref } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import Loader from "@/components/elements/Loader.vue";

const props = defineProps<{
    requiredTag?: string,
    requiredCategories: string[],
    isGridLayout: boolean,
    hiddenTags?: string[]
}>();

const { requiredTag, isGridLayout, hiddenTags } = props;

let searchResults = ref<PagefindSearchResult[]>([]);

let searchQuery = ref("");

let selectedTags = ref([]);
let availableTags = ref([]);

let loading = ref(true);

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
