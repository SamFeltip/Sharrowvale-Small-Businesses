<!-- SearchResults.vue -->
<template>
    <div class="max-w-7xl mx-auto px-4">
        <div
            v-if="searchResults.length === 0"
            class="text-center py-8 text-gray-500"
        >
            No results found
        </div>

        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <div
                v-for="result in searchResults"
                :key="result.url"
                class="border border-gray-200 rounded-lg overflow-hidden"
            >
                <img
                    v-if="result.meta.image"
                    :src="result.meta.image"
                    :alt="result.meta.image_alt || result.meta.title"
                    class="w-full h-48 object-cover"
                />
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">
                        {{ result.meta.title }}
                    </h3>
                    <p class="mb-4">{{ result.excerpt }}</p>
                    <div class="flex gap-2">
                        <span
                            v-for="(tag, index) in getDisplayTags(result)"
                            :key="index"
                            class="bg-gray-100 px-2 py-1 rounded-md text-sm"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from "vue";

const searchResults = inject("searchResults", ref([]));

function getDisplayTags(result) {
    const tags = result.filters?.tag || [];
    return Array.isArray(tags) ? tags.slice(0, 2) : [tags];
}
</script>
