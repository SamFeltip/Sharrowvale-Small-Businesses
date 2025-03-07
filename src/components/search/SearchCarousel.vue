<template>
    <CarouselWrapper :items="carouselItems" :type="type" :height="height" />
</template>

<script setup lang="ts">
import type { PagefindSearchResult } from "./src/PagefindSearchResult";
import type { PlaceCard } from "../placeCards/PlaceCard";

import CarouselWrapper from "@/components/index/Content/CarouselWrapper.vue";
import { watchEffect } from "vue";

const props = defineProps<{ searchResults: PagefindSearchResult[], type?: "white-clear" | "yellow" | "clear", height?: "sm" | "lg" }>();

const { type = "clear", height = "lg" } = props;

let carouselItems: PlaceCard[] = [];

watchEffect(() => {

    const businesses = props.searchResults.filter(searchResult => {
        const categories = searchResult.filters?.category;

        if (categories === undefined) return false;

        return Object.values(categories).includes("Directory");
    });

    carouselItems = businesses.map((result) => ({
        title: result.meta?.title || "",
        image: result.meta?.image || "",
        content: result.meta?.content || "",
        href: result.url || "",
    }));

})

</script>