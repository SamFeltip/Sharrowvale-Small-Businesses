<template>
    <CarouselWrapper :items="carouselItems" />
</template>

<script setup lang="ts">

import { inject, reactive, ref, watch } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import type { PlaceCard } from "../placeCards/PlaceCard";

import CarouselWrapper from "@/components/index/Content/CarouselWrapper.vue";

const props = defineProps<{
    searchResults: PagefindSearchResult[],
}>();

const { searchResults } = props;

console.log(searchResults);

let carouselItems = ref<PlaceCard[]>([]);

watch(searchResults, () => {
    console.log("search results changec");

    carouselItems.value = searchResults.map((result) => ({
        title: result.meta?.title || "",
        image: result.meta?.image || "",
        content: result.meta?.content || "",
        href: result.url || "",
    }));
})


</script>