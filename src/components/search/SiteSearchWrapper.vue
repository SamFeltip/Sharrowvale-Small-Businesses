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

        <Section :float-in="true" v-if="tags.length > 0">
            <H3 color="coral">Tags</H3>
            <SearchResultTags v-model:tags="tags" />
        </Section>
    </div>
</template>

<script setup lang="ts">
import H3 from "@/components/elements/headers/H3.vue"

import Section from "@/components/elements/Section.vue";
import SearchCarousel from "./SearchCarousel.vue";
import SearchBox from "./SearchBox.vue";
import SearchResults from "./SearchResults.vue";
import SearchResultTags from "./SearchResultTags.vue";

import { ref, watchEffect, type Ref } from "vue";
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
let availableTags = ref<string[]>([]);

let articles: PagefindSearchResult[];

let tags: PagefindSearchResult[];


watchEffect(() => {
    articles = getArticlesFromSearchResults(searchResults.value);

})

watchEffect(() => {
    tags = getTagsFromSearchResults(searchResults.value);
})

function getTagsFromSearchResults(searchResults: PagefindSearchResult[]) {

    return searchResults.filter(result => {

        let categories = result.filters?.category;
        console.log(categories);

        if (categories == null) return false;

        let categoryNames = Object.values(categories);
        console.log(categoryNames);

        return categoryNames.includes("Tag");

    })
}

function getArticlesFromSearchResults(searchResults: PagefindSearchResult[]) {

    return searchResults.filter(result => {

        let categories = result.filters?.category;
        console.log(categories);

        if (categories == null) return false;

        let categoryNames = Object.values(categories);
        console.log(categoryNames);

        console.log(categoryNames);

        return !categoryNames.includes("Directory") && !categoryNames.includes("Tag");

    })

}
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
