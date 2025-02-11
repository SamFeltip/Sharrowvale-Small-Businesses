<!-- SearchBox.vue -->
<template>
    <div class="mx-auto w-full flex flex-col items-center gap-4" id="search-box-wrapper">
        <div class="gap-4 mb-4 w-full max-w-[960px]" id="search-box">
            <div class="flex flex-row items-center w-full border-b border-gray-400 ">
                <div class="text-gray-600">
                    <faSearch />
                </div>
                <input v-model="searchQuery" type="text" placeholder="Search..."
                    class="flex-1 px-3 py-2 bg-transparent focus:outline-none text-lato font-light text-xl md:text-2xl w-full"
                    @input="handleSearch" />
            </div>

            <div class="flex justify-center gap-2">
                <Button title="sort" @click="toggleSort" class="w-full">
                    <span class="text-xl">
                        Sort</span>

                    <span v-if="sortAscending">
                        <FontAwesomeIcon :icon="faArrowUpWideShort" />
                    </span>
                    <span v-else>
                        <FontAwesomeIcon :icon="faArrowDownShortWide" />
                    </span>

                </Button>
                <Button title="filter" @click="toggleFilters" class=" w-full">
                    <span class="text-xl">
                        Filters
                    </span>
                    <span>
                        <FontAwesomeIcon :icon="faFilter" />
                    </span>
                </Button>
            </div>
        </div>

        <div v-if="showFilters && availableTags.length > 0" class="py-4 flex flex-col gap-2">
            <H4 v-if="availableTags.length > 0 && props.isGridLayout == false" color="coral" id="filter-header">
                Filter by Category
            </H4>
            <div id="filter-items-wrapper" class="flex flex-wrap">
                <label v-for="tag in availableTags" :key="tag"
                    class="font-merriweather cursor-pointer inline-block px-2 py-1 m-1 border border-gray-500 rounded-full text-base transition-all duration-200 hover:scale-105 group relative"
                    :class="{
                        'bg-coral border-coral text-white':
                            selectedTags.includes(tag),
                    }">
                    <input type="checkbox" :value="tag" v-model="selectedTags" @change="handleSearch"
                        class="absolute opacity-0 -z-10" />
                    <span>{{ tag }}</span>
                </label>
            </div>
        </div>
        <div v-if="props.isGridLayout == false" class="flex flex-col items-center px-4">
            <PromoBanner :pricingPromotion class="hidden lg:flex" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons/faArrowUpWideShort"
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons/faArrowDownShortWide"
import PromoBanner from "@/components/elements/promos/PromoBanner.vue"

import H4 from "@/components/elements/headers/H4.vue";

import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter"
import faSearch from "@/components/icons/faSearch.vue";

import { ref, onMounted, watch } from "vue";
import Button from "../elements/Button.vue";
import type { PagefindSearchResult } from './src/PagefindSearchResult';
import FaSearch from '../icons/faSearch.vue';
import { search } from '@/scripts/search/handleSearch';
import type { PagefindResource } from '@/scripts/search/PagefindResource';
import type { SearchOptionsConfig } from '@/scripts/search/PagefindSearchOptions';
import type { CollectionEntry } from 'astro:content';

const props = defineProps<{
    requiredTag?: string,
    requiredCategories: string[],
    isGridLayout: boolean,
    pricingPromotion: CollectionEntry<"prices">;
}>();

let searchResults = defineModel<PagefindSearchResult[]>("searchResults", { required: true });
let searchQuery = defineModel<string>("searchQuery", { required: true });
let loading = defineModel<boolean>("loading");

const params = new URLSearchParams(document.location.search);

let startingSearch = params.get("search");

if (startingSearch !== null) {
    startingSearch = startingSearch.replaceAll("+", " ");
    startingSearch = startingSearch.replaceAll("%20", " ");

    searchQuery.value = startingSearch;
}

let selectedTags = defineModel<string[]>("selectedTags", { required: true });
let availableTags = defineModel<string[]>("availableTags", { required: true });


let pagefind = ref<PagefindResource | null>(null); //inject('pagefind', ref(null));

const showFilters = ref(true);
const sortAscending = ref(true);

onMounted(async () => {
    loading.value = true;

    pagefind.value = await import(
        /* @vite-ignore */ window.location.origin + "/pagefind/pagefind.js"
    );

    await handleSearch();

    loading.value = false;
});

async function handleSearch() {

    const searchOptionsConfig = createSearchOptionsFromRefs();

    if (pagefind.value == null) {
        return;
    }

    console.log({ searchQuery: searchQuery.value, searchOptionsConfig })

    const searchResult = await search(searchQuery.value, searchOptionsConfig, pagefind.value);


    console.log(searchResult);

    const [d, t] = searchResult;

    searchResults.value = d;
    availableTags.value = t;
}

async function toggleSort() {
    sortAscending.value = !sortAscending.value;

    const searchOptionsConfig = createSearchOptionsFromRefs();

    if (pagefind.value == null) {
        return;
    }

    const searchResult = await search(searchQuery.value, searchOptionsConfig, pagefind.value);

    const [d, t] = searchResult;

    searchResults.value = d;
    availableTags.value = t;
}

watch(selectedTags, async () => {

    const searchOptionsConfig = createSearchOptionsFromRefs();

    if (pagefind.value == null) {
        return;
    }

    const searchResult = await search(searchQuery.value, searchOptionsConfig, pagefind.value);

    const [d, t] = searchResult;

    searchResults.value = d;
    availableTags.value = t;
});

/**
 * uses props and refs to create a config describing the search output
 * */
function createSearchOptionsFromRefs(): SearchOptionsConfig {
    return {
        sortAscending: sortAscending.value,
        selectedTags: selectedTags.value,
        requiredTag: props.requiredTag,
        requiredCategories: props.requiredCategories,
    }
}

function toggleFilters() {
    showFilters.value = !showFilters.value;
}
</script>

<style>
#search-box-wrapper {
    container-name: search-box-wrapper;
    container-type: inline-size;
}

#search-box {
    display: grid;
    grid-template-columns: 1fr;
}

#filter-header {
    text-align: center;
}

#filter-items-wrapper {
    justify-content: center;
}

/* 500px + side margins of the mobile view: 2 x 1.5rem */
/* container is small and screen is big */
@media screen and (min-width: 547px) {

    #search-box {
        grid-template-columns: 1fr;
    }


    #filter-items-wrapper {
        justify-content: start;
    }


    #filter-header {
        text-align: start;
    }

    /* large container in a large screen */
    @container (min-width: 500px) {

        #search-box {
            grid-template-columns: 1fr auto;
        }

        #filter-header {
            text-align: center;
        }

        #filter-items-wrapper {
            justify-content: center;
        }

    }
}
</style>
