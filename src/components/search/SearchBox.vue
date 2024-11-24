<!-- SearchBox.vue -->
<template>
    <div class="max-w-3xl mx-auto px-4">
        <div class="flex gap-4 mb-4">
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
                    class="px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
                >
                    Sort {{ sortAscending ? "↑" : "↓" }}
                </button>
                <button
                    @click="toggleFilters"
                    class="px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors"
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
                        @change="updateSearch"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-sm">{{ tag }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
// SearchBox.vue script remains unchanged
import { ref, inject, onMounted, watch } from "vue";

const props = defineProps({
    defaultTag: {
        type: String,
        required: false,
    },
});


const searchResults = inject("searchResults", ref([]));
const searchQuery = inject("searchQuery", ref(""));
const selectedTags = inject("selectedTags", ref([]));
const availableTags = inject("availableTags", ref([]));

const localSearchQuery = ref("");
const localSelectedTags = ref([]);
const showFilters = ref(false);
const sortAscending = ref(true);

let pagefind;

onMounted(async () => {
    
    //@ts-ignore
    pagefind = await import("/pagefind/pagefind.js");

    if (props.defaultTag) {
        localSelectedTags.value = [props.defaultTag];
        await updateSearch();
    } else {
        await loadAllResults();
    }
});

async function loadAllResults() {
    const allResults = await pagefind.search("all");
    processResults(allResults);
}

async function handleSearch() {
    searchQuery.value = localSearchQuery.value;
    await updateSearch();
}

async function updateSearch() {
    if (!pagefind) return;

    let searchOptions = {};

    if (localSelectedTags.value.length > 0) {
        searchOptions.filters = {
            tag: localSelectedTags.value,
        };
    }

    const results = await pagefind.search(
        localSearchQuery.value,
        searchOptions
    );
    processResults(results);
}

function processResults(results) {
    const tags = new Set();
    results.results.forEach((result) => {
        if (result.filters?.tag) {
            if (Array.isArray(result.filters.tag)) {
                result.filters.tag.forEach((tag) => tags.add(tag));
            } else {
                tags.add(result.filters.tag);
            }
        }
    });

    availableTags.value = Array.from(tags);

    const sortedResults = [...results.results].sort((a, b) => {
        return sortAscending.value
            ? a.meta.title.localeCompare(b.meta.title)
            : b.meta.title.localeCompare(a.meta.title);
    });

    searchResults.value = sortedResults;
}

function toggleSort() {
    sortAscending.value = !sortAscending.value;
    updateSearch();
}

function toggleFilters() {
    showFilters.value = !showFilters.value;
}

watch(localSelectedTags, async () => {
    selectedTags.value = localSelectedTags.value;
    await updateSearch();
});
</script>
