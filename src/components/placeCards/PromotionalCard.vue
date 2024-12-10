<template>
    <HoverArticle :href="card.href" classList="relative w-full h-full">
        <img :src="card.image" :alt="card.title" class="absolute inset-0 w-full h-full object-cover rounded-2xl" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 rounded-2xl to-transparent">
        </div>

        <div class="absolute bottom-0 w-full p-3">
            <H4 color="white" :position>{{ card.title }}</H4>
        </div>
    </HoverArticle>
</template>

<script lang="ts" setup>
import HoverArticle from '../elements/articles/HoverArticle.vue';
import type { PlaceCard } from './PlaceCard';
import H4 from '../elements/headers/H4.vue';

const props = withDefaults(defineProps<{ position: "start" | "end", card: PlaceCard }>(), {
    position: "start"
});

const { position, card } = props;

</script>