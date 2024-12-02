<!-- SearchWrapper.vue -->
<template>
    <div
        id="search-wrapper"
        class="w-full gap-6"
        :class="{ gridLayout: isGridLayout }"
    >
        <SearchBox :requiredCategory="requiredCategory" />
        <SearchResults
            :tag="requiredCategory"
            :isGridLayout="isGridLayout"
            :hidden-tags="hiddenCategories"
        />
    </div>
</template>

<script setup lang="ts">
import SearchBox from "./SearchBox.vue";
import SearchResults from "./SearchResults.vue";

import { provide, ref } from "vue";

const props = defineProps<{
    requiredCategory: string,
    isGridLayout: boolean,
    hiddenCategories: string[]
}>();

const {requiredCategory, isGridLayout, hiddenCategories} = props;

const searchResults = ref([]);
const searchQuery = ref("");
const selectedTags = ref([]);
const availableTags = ref([]);

provide("searchResults", searchResults);
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

@media screen and (min-width: 1024px) {
    #search-wrapper {
        grid-template-columns: 370px 1fr;
    }
}
</style>
