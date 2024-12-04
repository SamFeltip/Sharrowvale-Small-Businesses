<!-- SearchBox.vue -->
<template>
    <div class="mx-auto px-4 w-full" id="search-box-wrapper">
        <div id="search-box" class="gap-4 mb-4">
            <div class="flex flex-row items-center gap-4">
                <div class="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                        class="ikonik-9adjq">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M14.3851 15.4457C11.7348 17.5684 7.85535 17.4013 5.39857 14.9445C2.76253 12.3085 2.76253 8.03464 5.39857 5.3986C8.03461 2.76256 12.3085 2.76256 14.9445 5.3986C17.4013 7.85538 17.5684 11.7348 15.4457 14.3851L20.6013 19.5407C20.8942 19.8336 20.8942 20.3085 20.6013 20.6014C20.3085 20.8943 19.8336 20.8943 19.5407 20.6014L14.3851 15.4457ZM6.45923 13.8839C4.40898 11.8336 4.40898 8.50951 6.45923 6.45926C8.50948 4.40901 11.8336 4.40901 13.8839 6.45926C15.9326 8.50801 15.9341 11.8287 13.8884 13.8794C13.8868 13.8809 13.8853 13.8823 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9341 8.50798 15.9326 6.45923 13.8839Z"
                            fill="currentColor" class="path-1b5n5"></path>
                    </svg>
                </div>
                <input v-model="localSearchQuery" type="text" placeholder="Search..."
                    class="flex-1 px-3 py-2 bg-transparent border-b border-gray-400" @input="handleSearch" />
            </div>

            <div class="flex gap-2">
                <Button @click="toggleSort"
                    class="w-full px-4 flex flex-row justify-center items-center gap-2 border border-gray-400 rounded-2xl">
                    Sort <span>{{ sortAscending ? "↑" : "↓" }}</span>
                </Button>
                <Button @click="toggleFilters"
                    class="w-full px-4 flex flex-row justify-center items-center gap-2 border border-gray-400 rounded-2xl">
                    Filters <span>{{ showFilters ? "−" : "+" }}</span>
                </Button>
            </div>
        </div>

        <div v-if="showFilters" class="p-4 mt-4">
            <h3 class="text-lg font-semibold mb-3">Filter by Tags</h3>
            <div class="flex flex-wrap justify-center">
                <label v-for="tag in availableTags" :key="tag"
                    class="font-merriweather cursor-pointer inline-block px-2 py-1 m-1 border border-black rounded-full text-sm transition-all duration-200 hover:scale-105 group relative"
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
    </div>
</template>

<script setup lang="ts">
import type { CustomRecord } from "pagefind";
import { ref, inject, onMounted, watch } from "vue";
import Button from "../elements/Button.vue";

const props = defineProps<{
    requiredTag?: string,
    requiredCategories: string[],
}>();

const searchResults = inject("searchResults", ref([] as CustomRecord[]));
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
    results: { data: () => CustomRecord }[];
    filters: PagefindSearchOptions["filters"];
}) {
    const data = await Promise.all(
        pagefindResults.results.map((result) => result.data())
    );

    let tags = pagefindResults.filters?.tags ?? {};

    let tagEntries = Object.entries(tags) as [string, number][];

    const validTags = tagEntries.filter(([key, value]) => localSelectedTags.includes(key) || value > 0 && value < data.length);

    const sortedTags = validTags.sort((a, b) => b[1] - a[1]);

    availableTags.value = sortedTags.map(([key, value]) => key).slice(0, 10);



    searchResults.value = data;
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

@container (min-width: 400px) {
    #search-box {
        grid-template-columns: 1fr auto;
    }
}
</style>
