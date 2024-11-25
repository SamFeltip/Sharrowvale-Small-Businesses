<!-- SearchWrapper.vue -->
<template>
    <div id="search-wrapper" class="w-full gap-6">
        <SearchBox :requiredCategory="requiredCategory" />
        <SearchResults :category="requiredCategory" />
    </div>
</template>

<script setup>
import SearchBox from "./SearchBox.vue";
import SearchResults from "./SearchResults.vue";

import { provide, ref } from "vue";

defineProps({
    requiredCategory: {
        type: String,
        required: true,
    },
});

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
