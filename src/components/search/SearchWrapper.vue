<!-- SearchWrapper.vue -->
<template>
    <div class="w-full">
        <SearchBox :requiredCategory="requiredCategory" />
        <SearchResults />
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
