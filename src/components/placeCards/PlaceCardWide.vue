<template>
    <HoverArticle :href="props.href">
        <div class="search-result-wide rounded-lg overflow-hidden">
            <img
                v-if="image"
                :src="image"
                :alt="title"
                class="w-full max-w-[300px] h-48 object-cover rounded-lg"
            />
            <div class="w-full p-4">
                <div class="flex gap-2">
                    <a
                        v-for="(category, index) in categories"
                        :key="index"
                        class="text-coral px-2 py-1 text-sm"
                    >
                        {{ category.name }}
                    </a>
                </div>
                <h3 class="text-lg font-semibold mb-2">
                    {{ title }}
                </h3>
                <p class="mb-4">{{ content }}</p>
            </div>
        </div>
    </HoverArticle>
</template>

<script setup lang="ts">
import HoverArticle from "../elements/articles/HoverArticle.vue";

const props = defineProps<{
    image: string;
    title: string;
    content: string;
    categories: { slug: string; name: string }[];
    href?: string;
}>();
</script>

<style>
.search-result-wide {
    display: grid;
    grid-template-columns: 200px 1fr;
}

@container (min-width: 550px) {
    .search-result-wide {
        grid-template-columns: 300px 1fr;
    }
}
</style>
