<template>
    <HoverArticle :href="href">
        <div class="search-result-wide grid rounded-lg overflow-hidden">
            <img
                v-if="image"
                :src="image"
                :alt="title"
                class="w-full max-w-[300px] h-48 object-cover rounded-lg"
            />
            <div class="w-full p-4">
                <div class="flex gap-2 tag-list">
                    <a
                        v-for="(tag, index) in tags"
                        :key="index"
                        class="text-coral px-2 py-1 text-sm"
                    >
                        {{ tag.name }}
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
import type { PlaceCard } from "./PlaceCard";

const props = defineProps<PlaceCard>();

const { image, title, content, tags, href } = props;

</script>

<style>
.search-result-wide {
    grid-template-columns: 1fr;

    & .tag-list {
        display: none;
    }
}

@container (min-width: 550px) {
    .search-result-wide {
        grid-template-columns: 300px 1fr;

        & .tag-list {
            display: block;
        }
    }
}
</style>
