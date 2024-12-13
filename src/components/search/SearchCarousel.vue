<template>
    <CarouselWrapper :items="carouselItems" />
</template>

<script setup lang="ts">
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import type { PlaceCard } from "../placeCards/PlaceCard";

import CarouselWrapper from "@/components/index/Content/CarouselWrapper.vue";
import { watchEffect } from "vue";

const props = defineProps<{ searchResults: PagefindSearchResult[] }>();


let carouselItems: PlaceCard[] = [];

watchEffect(() => {

    const businesses = props.searchResults.filter(searchResult => searchResult.filters?.category?.includes("Directory"));

    carouselItems = businesses.map((result) => ({
        title: result.meta?.title || "",
        image: result.meta?.image || "",
        content: result.meta?.content || "",
        href: result.url || "",
    }));

    console.log(carouselItems.length);
})

</script>