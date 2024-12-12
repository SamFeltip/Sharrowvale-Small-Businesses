<template>
    <CarouselWrapper :items="carouselItems" />
</template>

<script setup lang="ts">

import { inject, reactive, ref } from "vue";
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import type { PlaceCard } from "../placeCards/PlaceCard";

import CarouselWrapper from "@/components/index/Content/CarouselWrapper.vue";

let searchResults = inject("searchResults", reactive<PagefindSearchResult[]>([]));

console.log(searchResults);

let carouselItems = reactive<PlaceCard[]>([]);

carouselItems = searchResults.map((result) => ({
    title: result.meta?.title || "",
    image: result.meta?.image || "",
    content: result.meta?.content || "",
    href: result.url || "",
}));

</script>