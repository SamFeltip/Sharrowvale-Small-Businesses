<!-- SearchWrapper.vue -->
<template>
    <div class="w-full">
        <slot></slot>
    </div>
</template>

<script setup>
import { provide, ref } from "vue";

const searchResults = ref([]);
const searchQuery = ref("");
const selectedTags = ref([]);
const availableTags = ref([]);

provide("searchResults", searchResults);
provide("searchQuery", searchQuery);
provide("selectedTags", selectedTags);
provide("availableTags", availableTags);
</script>
