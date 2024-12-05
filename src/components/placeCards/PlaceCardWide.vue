<template>
    <HoverArticle :href="href">
        <div class="search-result-wide w-full grid rounded-lg overflow-hidden">
            <img v-if="image" :src="image" :alt="title" class="w-full h-48 object-cover rounded-lg" />
            <div class="search-result-body w-full">
                <div class="tag-list">
                    <a v-for="(tag, index) in tags" :key="index" class="text-coral py-1 text-sm">
                        {{ tag.name }}
                    </a>
                </div>
                <H3 class="md:text-2xl">
                    {{ title }}
                </H3>
                <P class="py-1 md:font-bold">{{ content }}</P>
                <P weight="light" class=" hidden lg:block">{{ lightContent }}</P>
            </div>
        </div>
    </HoverArticle>
</template>

<script setup lang="ts">
import HoverArticle from "../elements/articles/HoverArticle.vue";
import P from "../elements/body/P.vue";
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
        gap: 0.75rem;
        padding-bottom: 0.5rem;
    }

    & .search-result-body {
        padding-block: 1rem;
    }
}

@container (min-width: 550px) {
    .search-result-wide {
        grid-template-columns: 300px 1fr;

        & .tag-list {
            display: flex;
        }


        & .search-result-body {
            padding-inline: 1rem;
        }
    }
}
</style>
