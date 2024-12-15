<!-- SearchWrapper.vue -->
<template>
    <div id="search-wrapper" class="w-full gap-6" :class="{ gridLayout: isGridLayout }">
        <SearchBox v-model:searchResults="searchResults" v-model:searchQuery="searchQuery"
            v-model:available-tags="availableTags" v-model:selectedTags="selectedTags" :isGridLayout
            :requiredTag="requiredTag" :requiredCategories="requiredCategories" />
        <Section :float-in="true" v-if="searchResults.length > 0">
            <H3 color="coral">Businesses</h3>
            <SearchCarousel v-model:searchResults="searchResults" />
        </Section>

        <Section :float-in="true" v-if="articles.length > 0">
            <H3 color="coral">Articles</h3>
            <SearchResults v-model:searchResults="articles" :tag="requiredTag" :isGridLayout="isGridLayout"
                :hiddenTags="hiddenTags" />
        </Section>


    </div>
</template>

<script setup lang="ts">
import H3 from "@/components/elements/headers/H3.vue"

import Section from "@/components/elements/Section.vue";
import SearchCarousel from "./SearchCarousel.vue";
import SearchBox from "./SearchBox.vue";
import SearchResults from "./SearchResults.vue";

import { ref, watchEffect } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";

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

let articles: PagefindSearchResult[];

watchEffect(() => {
    articles = searchResults.value.filter(result => !result.filters.category.includes("Directory"));
    console.log({ searchResults: searchResults.value });
    console.log("search results changed");
})

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
