<template>
    <ul class="flex flex-row justify-center flex-wrap gap-3">
        <li class="hover:scale-110 transition-all" v-for="tag in props.tags">
            <Button size="lg" :href="`/${tag.type}/${tag.collectionEntry.slug}`">
                {{ tag.collectionEntry.data.name }}
            </Button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { PlaceCardRef } from "../placeCards/PlaceCardRef";
import Button from "../elements/Button.vue";

const props = defineProps<{
    tags: PlaceCardRef[]
}>();

</script>