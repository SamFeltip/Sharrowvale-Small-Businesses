<template>
    <HoverArticle :href="href" classList="relative w-full aspec-[3/2]">
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
            <H2 color="white" position="end">{name}</H2>
        </div>
    </HoverArticle>
</template>

<script lang="ts" setup>
import HoverArticle from '../elements/articles/HoverArticle.vue';
import type { PlaceCard } from './PlaceCard';


const props = defineProps<PlaceCard>();

const {image, title, content, href} = props;

</script>