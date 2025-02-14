<template>
    <ul :class="['flex flex-row flex-wrap gap-4', alignClass]">
        <li class="hover:scale-105 transition-all" v-for="tag in props.tags">
            <Button :size="size" :href="`/${tag.type}/${tag.collectionEntry.id}`" :type="type"
                :data-pagefind-filter="pagefindMetadata">
                {{ tag.collectionEntry.data.name }}
            </Button>
        </li>
    </ul>
</template>
<script setup lang="ts">
import type { PlaceCardRef } from "../placeCards/PlaceCardRef";
import Button from "../elements/Button.vue";

const props = defineProps<{
    tags: PlaceCardRef[],
    type?: "white-clear" | "yellow" | "clear";
    size?: "sm" | "lg";
    side?: "left" | "center" | "right";

    pagefindMetadata?: string;
}>();

const { side = "center", size = "lg", type = "clear" } = props;

const alignSides = {
    "left": "justify-center md:justify-start",
    "right": "justify-center md:justify-end",
    "center": "justify-center",
}

const alignClass = alignSides[side];

</script>