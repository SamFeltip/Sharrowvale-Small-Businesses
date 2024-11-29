<template>
    <HoverArticle :href="href">
        <div class="flex flex-col rounded-lg overflow-hidden">
            <img
                v-if="image"
                :src="image"
                :alt="title"
                class="w-full h-48 object-cover rounded-lg"
            />
            <div class="w-full py-4">
                <H3>
                    {{ title }}
                </H3>
                <p>{{ content }}</p>
            </div>
        </div>
    </HoverArticle>
</template>


<script setup lang="ts">

import type { PlaceCard } from "./PlaceCard.d.ts";

import H3 from "../elements/headers/H3.vue";
import HoverArticle from "../elements/articles/HoverArticle.vue";

const props = defineProps<PlaceCard>();

const {image, title, content, href} = props;

console.log(props)
</script>
