<!-- SearchBox.vue -->
<template>
    <div class="mx-auto px-4 w-full flex flex-col items-center" id="search-box-wrapper">
        <div class="gap-4 mb-4 w-full" id="search-box">
            <div class="flex flex-row items-center gap-4 w-full">
                <div class="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                        class="ikonik-9adjq">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M14.3851 15.4457C11.7348 17.5684 7.85535 17.4013 5.39857 14.9445C2.76253 12.3085 2.76253 8.03464 5.39857 5.3986C8.03461 2.76256 12.3085 2.76256 14.9445 5.3986C17.4013 7.85538 17.5684 11.7348 15.4457 14.3851L20.6013 19.5407C20.8942 19.8336 20.8942 20.3085 20.6013 20.6014C20.3085 20.8943 19.8336 20.8943 19.5407 20.6014L14.3851 15.4457ZM6.45923 13.8839C4.40898 11.8336 4.40898 8.50951 6.45923 6.45926C8.50948 4.40901 11.8336 4.40901 13.8839 6.45926C15.9326 8.50801 15.9341 11.8287 13.8884 13.8794C13.8868 13.8809 13.8853 13.8823 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9341 8.50798 15.9326 6.45923 13.8839Z"
                            fill="currentColor" class="path-1b5n5"></path>
                    </svg>
                </div>
                <input v-model="localSearchQuery" type="text" placeholder="Search..."
                    class="flex-1 px-3 py-2 bg-transparent border-b border-gray-400 focus:outline-none text-lato font-light text-xl md:text-2xl w-full"
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

        <div v-if="showFilters" class="p-4 mt-4">
            <H3 v-if="availableTags.length > 0 && props.isGridLayout == false" color="coral">
                Filter by Category:
            </H3>
            <div class="flex flex-wrap justify-center">
                <label v-for="tag in availableTags" :key="tag"
                    class="font-merriweather cursor-pointer inline-block px-2 py-1 m-1 border border-gray-500 rounded-full text-base transition-all duration-200 hover:scale-105 group relative"
                    :class="{
                        'bg-coral border-coral text-white':
                            localSelectedTags.includes(tag),
                    }">
                    <input type="checkbox" :value="tag" v-model="localSelectedTags" @change="handleSearch"
                        class="absolute opacity-0 -z-10" />
                    <span>{{ tag }}</span>
                </label>
            </div>
        </div>
        <div v-if="props.isGridLayout == false" class="flex flex-col items-center px-4">
            <PromoBanner callToAction="Advertise on this site for only £20 a month" class="hidden lg:block" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons/faArrowUpWideShort"
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons/faArrowDownShortWide"
import PromoBanner from "@/components/elements/promos/PromoBanner.vue"

import H3 from "@/components/elements/headers/H3.vue";

import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter"

import { ref, inject, onMounted, watch } from "vue";
import Button from "../elements/Button.vue";
import type { PagefindSearchResult } from './src/PagefindSearchResult';

const props = defineProps<{
    requiredTag?: string,
    requiredCategories: string[],
    isGridLayout: boolean,
}>();

const searchResults = inject("searchResults", ref([] as PagefindSearchResult[]));
const searchQuery = inject("searchQuery", ref(""));
const selectedTags = inject("selectedTags", ref([] as string[]));
const availableTags = inject("availableTags", ref([] as string[]));
const pagefind = ref(null); //inject('pagefind', ref(null));

const localSearchQuery = ref("");
let localSelectedTags: string[] = [];
const showFilters = ref(true);
const sortAscending = ref(true);

type PagefindSearchOptions = {
    filters: {
        category?: {
            any: Record<string, any>
        };
        tags?: Record<string, any>;
    };
    sort?: {
        name: "asc" | "desc";
    };
};

onMounted(async () => {

    pagefind.value = await import(
        /* @vite-ignore */ window.location.origin + "/pagefind/pagefind.js"
    );

    const params = new URLSearchParams(document.location.search);
    let startingSearch = params.get("search");

    if (startingSearch !== null) {
        startingSearch = startingSearch.replaceAll("+", " ");
        startingSearch = startingSearch.replaceAll("%20", " ");
        localSearchQuery.value = startingSearch;
    }

    await handleSearch();
});

async function handleSearch() {


    searchQuery.value = localSearchQuery.value;

    let searchOptions = getSearchOptions();

    if (searchQuery.value == "") {
        await loadAllResults(searchOptions);
    } else {
        await updateSearch(searchOptions);
    }
}

function getSearchOptions(): PagefindSearchOptions {
    let searchOptions: PagefindSearchOptions = {
        filters: {
            tags: [],
            category: { any: [] },
        },
        sort: { name: sortAscending.value ? "asc" : "desc" },
    };

    if (props.requiredTag !== undefined) {
        searchOptions.filters.tags = [props.requiredTag];
    }

    if (props.requiredCategories !== undefined && searchOptions.filters.category !== undefined) {
        searchOptions.filters.category.any = props.requiredCategories;
    }

    if (localSelectedTags.length > 0) {
        searchOptions.filters.tags?.push(...localSelectedTags);
    }

    return searchOptions;
}

async function loadAllResults(searchOptions: PagefindSearchOptions) {
    //@ts-ignore
    const allResults = await pagefind.value.search(null, searchOptions);

    processResults(allResults);
}

async function updateSearch(searchOptions: PagefindSearchOptions) {
    if (pagefind.value === null) return;

    let searchQuery: string | null = null;

    if (localSearchQuery.value !== "") {
        searchQuery = localSearchQuery.value;
    }

    //@ts-ignore
    const results = await pagefind.value.search(searchQuery, searchOptions);

    processResults(results);
}

async function processResults(pagefindResults: {
    results: { data: () => PagefindSearchResult }[];
    filters: PagefindSearchOptions["filters"];
}) {
    const data = await Promise.all(
        pagefindResults.results.map((result) => result.data())
    );

    searchResults.value = data;

    let tags = pagefindResults.filters?.tags ?? {};

    let tagEntries = Object.entries(tags) as [string, number][];

    const validTags = tagEntries.filter(([key, value]) => localSelectedTags.includes(key) || value > 0 && value < data.length);

    const sortedTags = validTags.sort((a, b) => b[1] - a[1]);

    availableTags.value = sortedTags.map(([key, value]) => key).slice(0, 10);



}

function toggleSort() {
    sortAscending.value = !sortAscending.value;

    let searchOptions = getSearchOptions();

    updateSearch(searchOptions);
}

function toggleFilters() {
    showFilters.value = !showFilters.value;
}

watch(localSelectedTags, async () => {
    selectedTags.value = localSelectedTags;

    let searchOptions = getSearchOptions();

    await updateSearch(searchOptions);
});
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

@container (min-width: 500px) {
    #search-box {
        grid-template-columns: 1fr auto;
    }
}
</style>
