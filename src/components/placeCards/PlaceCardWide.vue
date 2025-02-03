<template>
    <HoverArticle :href="href">
        <div class="search-result-wide w-full grid rounded-lg text-ellipsis">
            <img v-if="image" :src="image" :alt="title" class="w-full object-cover rounded-lg h-52" />
            <div class="search-result-body w-full overflow-hidden flex flex-col text-ellipsis">
                <div class="tag-list">
                    <span v-for="(tag, index) in tags" :key="index"
                        class="text-coral text-sm font-merriweather font-bold">
                        {{ tag.name }}
                    </span>
                </div>
                <H3 weight="medium" :color="color">
                    {{ title }}
                </H3>
                <P class="py-1 font-normal">{{ content }}</P>
                <P weight="light" class="hidden md:block text-ellipsis text-sm">{{ croppedLightContent }}</P>
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

tags?.forEach(tag => {
    console.log(tag)
});

const croppedLightContent = lightContent && lightContent.slice(0, 180) + (lightContent.length > 180 ? "..." : "");

</script>

<style>
.search-result-wide {
    grid-template-columns: 1fr;

    & .tag-list {
        display: flex;
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

        & .search-result-body {
            padding-inline: 1rem;
            padding-block: 0;
        }
    }
}
</style>
