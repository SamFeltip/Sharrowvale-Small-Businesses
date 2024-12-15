<template>
    <form action="/search" method="GET"
        class="flex flex-row items-center gap-2 mb-2 w-full border-b border-white max-w-md">


        <div class="flex flex-row items-center gap-2 w-full">
            <input name="search" type="text"
                class="bg-transparent text-white placeholder-white focus:outline-none font-lato font-light w-full text-xl"
                placeholder="Discover businesses and more..." />
        </div>
        <button>
            <label for="search">
                <faSearch />
            </label>
        </button>
    </form>

    <Section :float-in="true" v-if="searchResults.length > 0">
        <H3 color="coral">Businesses</h3>
        <SearchCarousel v-model:searchResults="searchResults" />
    </Section>

    <Section :float-in="true" v-if="articles.length > 0">
        <H3 color="coral">Articles</h3>
        <SearchResults v-model:searchResults="articles" :isGridLayout="true" :hiddenTags="hiddenTags" />
    </Section>

    <Section :float-in="true" v-if="searchResults.length > 0">
        <H3 color="coral">Tags</H3>
        <SearchResultTags v-model:tagNames="availableTags" />
    </Section>

</template>
<script setup lang="ts">
import faSearch from "@/components/icons/faSearch.vue";
import { ref, watchEffect } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import Section from "@/components/elements/Section.vue";
import SearchCarousel from "./SearchCarousel.vue";
import SearchResults from "./SearchResults.vue";
import SearchResultTags from "./SearchResultTags.vue";
import H3 from "@/components/elements/headers/H3.vue";

let searchResults = ref<PagefindSearchResult[]>([]);
let searchQuery = ref("");
let selectedTags = ref([]);
let availableTags = ref<string[]>([]);

let hiddenTags = ["directory"];

let articles: PagefindSearchResult[];

watchEffect(() => {
    articles = searchResults.value.filter(result => !result.filters.category.includes("Directory"));
})

</script>