<template>
    <HoverArticle :href="href">
        <div class="search-result-wide w-full grid rounded-lg overflow-hidden">
            <img v-if="image" :src="image" :alt="title" class="w-full h-48 object-cover rounded-lg" />
            <div class="w-full p-4">
                <div class="flex gap-2 tag-list">
                    <a v-for="(tag, index) in tags" :key="index" class="text-coral px-2 py-1 text-sm">
                        {{ tag.name }}
                    </a>
                </div>
                <H3 class="text-lg font-semibold">
                    {{ title }}
                </H3>
                <p class="py-1">{{ content }}</p>
                <p class="font-light hidden lg:block">{{ lightContent }}</p>
            </div>
        </div>
    </HoverArticle>
</template>

<script setup lang="ts">
import HoverArticle from "../elements/articles/HoverArticle.vue";
import H3 from "../elements/headers/H3.vue";
import type { PlaceCard } from "./PlaceCard";

const props = defineProps<PlaceCard>();

const { image, title, content, tags, href, lightContent } = props;

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
