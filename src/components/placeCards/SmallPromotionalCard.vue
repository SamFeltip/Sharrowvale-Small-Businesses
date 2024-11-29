<template>
    <HoverArticle :href="href" classList="relative w-full aspec-[3/2] h-full">
        <img
            :src="image"
            :alt="title"
            class="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />
        <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 rounded-2xl to-transparent"
        >
        </div>

        <div class="absolute bottom-0 right-0 p-6 text-right">
            <H3 color="white" position="end">{{title}}</H3>
        </div>
    </HoverArticle>
</template>

<script lang="ts" setup>
import HoverArticle from '../elements/articles/HoverArticle.vue';
import type { PlaceCard } from './PlaceCard';
import H3 from '../elements/headers/H3.vue';


const props = defineProps<PlaceCard>();

const {image, title, href} = props;

</script>