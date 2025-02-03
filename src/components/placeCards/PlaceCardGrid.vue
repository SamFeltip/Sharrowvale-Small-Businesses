<template>
    <HoverSection :href="href">
        <div class="flex flex-col rounded-lg overflow-hidden">
            <img v-if="image" :src="image" :alt="title" class="w-full h-56 object-cover rounded-lg" />
            <div class="w-full pt-2">
                <H4 weight="medium" :color="color">
                    {{ title }}
                </H4>
                <P>{{ content }}</P>
            </div>
        </div>
    </HoverSection>
</template>


<script setup lang="ts">

import type { PlaceCard } from "./PlaceCard.d.ts";

import H4 from "../elements/headers/H4.vue";
import P from "../elements/body/P.vue";
import HoverSection from "@/components/elements/sections/HoverSection.vue";

const props = defineProps<PlaceCard>();

const { image, title, content, href, color = "black" } = props;

</script>
