<template>
    <HoverArticle :href="href">
        <div class="flex flex-col rounded-lg overflow-hidden">
            <img v-if="image" :src="image" :alt="title" class="w-full h-56 object-cover rounded-lg" />
            <div class="w-full pt-2">
                <H3>
                    {{ title }}
                </H3>
                <P>{{ content }}</P>
            </div>
        </div>
    </HoverArticle>
</template>


<script setup lang="ts">

import type { PlaceCard } from "./PlaceCard.d.ts";

import H3 from "../elements/headers/H3.vue";
import P from "../elements/body/P.vue";
import HoverArticle from "../elements/articles/HoverArticle.vue";

const props = defineProps<PlaceCard>();

const { image, title, content, href } = props;

</script>
