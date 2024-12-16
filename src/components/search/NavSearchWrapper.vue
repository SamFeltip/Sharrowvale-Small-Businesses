<template>
    <ScreenWidth class-list="items-center mb-4">
        <form method="GET" action="/search" id="search-form"
            class="flex flex-row items-center gap-2 mb-2 w-full border-b border-white max-w-md">

            <div class="flex flex-row items-center gap-2 w-full">
                <input v-model="searchQuery" @input="handleSearch" name="search" type="text"
                    class="bg-transparent text-white placeholder-white focus:outline-none font-lato font-light w-full text-xl"
                    placeholder="Discover businesses and more..." />
            </div>
            <button>
                <label for="search">
                    <faSearch />
                </label>
            </button>
        </form>
    </ScreenWidth>
    <div class="flex flex-col items-center gap-8">
        <Loader v-if="loading" />
        <Section :float-in="false" v-if="searchResults.length > 0">
            <ScreenWidth>
                <H3 color="white">Businesses</h3>
            </ScreenWidth>
            <SearchCarousel v-model:searchResults="searchResults" type="white-clear" height="sm" />
        </Section>

        <ScreenWidth>
            <Section :float-in="false" v-if="articles.length > 0">
                <H3 color="white">Articles</h3>
                <SearchResults v-model:searchResults="articles" :isGridLayout="true" :hiddenTags="hiddenTags"
                    color="white" />
            </Section>
        </ScreenWidth>

        <ScreenWidth class-list="gap-4">
            <Section :float-in="false" v-if="searchResults.length > 0">
                <H3 color="white">Tags</H3>
                <SearchResultTags v-model:tags="tags" type="white-clear" />
            </Section>
            <button form="search-form" type="submit" v-if="searchQuery != ''" href="/search"
                class="text-center underline text-white text-xl">See more</button>
        </ScreenWidth>
    </div>

</template>
<script setup lang="ts">
import faSearch from "@/components/icons/faSearch.vue";
import { onMounted, ref, watchEffect, type Ref } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import Section from "@/components/elements/Section.vue";
import SearchCarousel from "./SearchCarousel.vue";
import SearchResults from "./SearchResults.vue";
import SearchResultTags from "./SearchResultTags.vue";
import H3 from "@/components/elements/headers/H3.vue";
import type { PagefindResource } from "@/scripts/search/PagefindResource";
import type { SearchOptionsConfig } from "@/scripts/search/PagefindSearchOptions";
import { search } from "@/scripts/search/handleSearch";
import ScreenWidth from "@/components/elements/ScreenWidth.vue";
import { getArticlesFromSearchResults, getTagsFromSearchResults } from "@/scripts/search/getFromSearchResults";

import Loader from "@/components/elements/Loader.vue";

let searchResults = ref<PagefindSearchResult[]>([]);
let searchQuery = ref("");
let selectedTags = ref([]);
let availableTags = ref<string[]>([]);

let hiddenTags = ["directory"];

let articles: Ref<PagefindSearchResult[]> = ref([]);
let tags: PagefindSearchResult[];

let pagefind = ref<PagefindResource | null>(null); //inject('pagefind', ref(null));

let loading = ref(false);

watchEffect(() => {
    articles.value = getArticlesFromSearchResults(searchResults.value);
})

watchEffect(() => {
    tags = getTagsFromSearchResults(searchResults.value);
})

onMounted(async () => {

    pagefind.value = await import(
    /* @vite-ignore */ window.location.origin + "/pagefind/pagefind.js"
    );
});

async function handleSearch() {

    loading.value = true;

    const searchOptionsConfig = createSearchOptionsFromRefs();

    if (pagefind.value == null) {
        loading.value = false;
        return;
    }

    if (searchQuery.value == "") {
        searchResults.value = [];
        availableTags.value = [];
        articles.value = [];
        loading.value = false;
        return;
    }

    const searchResult = await search(searchQuery.value, searchOptionsConfig, pagefind.value);

    const [d, t] = searchResult;

    searchResults.value = d;
    availableTags.value = t;


    loading.value = false;
}


/**
 * uses props and refs to create a config describing the search output
 * */
function createSearchOptionsFromRefs(): SearchOptionsConfig {
    return {
        sortAscending: true,
        selectedTags: [],
    }
}
</script>