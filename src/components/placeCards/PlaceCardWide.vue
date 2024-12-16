<template>
    <HoverArticle :href="href">
        <div class="search-result-wide w-full grid rounded-lg text-ellipsis">
            <img v-if="image" :src="image" :alt="title" class="w-full object-cover rounded-lg  h-48" />
            <div class="search-result-body w-full overflow-hidden flex flex-col text-ellipsis">
                <div class="tag-list">
                    <a v-for="(tag, index) in tags" :key="index" class="text-coral py-1 text-base">
                        {{ tag.name }}
                    </a>
                </div>
                <H3 class="md:text-2xl" weight="medium" :color="color">
                    {{ title }}
                </H3>
                <P class="py-1 font-normal">{{ content }}</P>
                <P weight="light" class="hidden lg:block text-ellipsis">{{ croppedLightContent }}</P>
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

const { image, title, content, tags, href, lightContent, color = "black" } = props;

const croppedLightContent = lightContent && lightContent.slice(0, 100) + (lightContent.length > 100 ? "..." : "");

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
        padding-inline: 0;
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
            padding-block: 0;
        }
    }
}
</style>
