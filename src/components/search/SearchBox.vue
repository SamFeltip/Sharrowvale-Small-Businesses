<!-- SearchBox.vue -->
<template>
    <div class="mx-auto px-4">
        <div class="flex flex-col gap-4 mb-4">
            <input
                v-model="localSearchQuery"
                type="text"
                placeholder="Search..."
                class="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="handleSearch"
            />

            <div class="flex gap-2">
                <button
                    @click="toggleSort"
                    class="w-full px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
                >
                    Sort {{ sortAscending ? "↑" : "↓" }}
                </button>
                <button
                    @click="toggleFilters"
                    class="w-full px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
                >
                    Filters {{ showFilters ? "−" : "+" }}
                </button>
            </div>
        </div>

        <div
            v-if="showFilters"
            class="p-4 border border-gray-200 rounded-md mt-4"
        >
            <h3 class="text-lg font-semibold mb-3">Filter by Tags</h3>
            <div class="flex flex-wrap gap-2">
                <label
                    v-for="tag in availableTags"
                    :key="tag"
                    class="flex items-center gap-1 cursor-pointer"
                >
                    <input
                        type="checkbox"
                        :value="tag"
                        v-model="localSelectedTags"
                        @change="handleSearch"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-sm">{{ tag }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CustomRecord } from "pagefind";
import { ref, inject, onMounted, watch } from "vue";

const props = defineProps({
    requiredCategory: {
        type: String,
        required: false,
    },
});

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
        category?: Record<string, any>;
        tags?: Record<string, any>;
    };
    sort?: {
        title: "asc" | "desc";
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
            category: [],
            tags: [],
        },
        sort: { title: sortAscending ? "asc" : "desc" },
    };

    if (props.requiredCategory !== undefined) {
        searchOptions.filters.category = [props.requiredCategory];
    }

    if (localSelectedTags.length > 0) {
        searchOptions.filters.tags = localSelectedTags;
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

    console.log(tags);
    availableTags.value = Object.keys(tags)
        .sort((a, b) => tags[b] - tags[a])
        .slice(0, 10);

    searchResults.value = data;
}

function getSortedResults(data: CustomRecord[]): CustomRecord[] {
    console.log("sorting", data);

    return [...data].sort((a, b) => {
        console.log(a, b);

        if (b === undefined || a === undefined) {
            return sortAscending.value ? 1 : -1;
        }

        const bTitle = b.meta?.title ?? "";
        const aTitle = a.meta?.title ?? "";

        if (sortAscending.value) {
            return aTitle > bTitle ? 1 : -1;
        } else {
            return bTitle > aTitle ? -1 : 1;
        }
    });
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
