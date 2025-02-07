<template>
    <HoverSection href="/join">
        <div class="bg-coral-light rounded-xl p-2 px-4 text-center flex flex-col gap-2">
            <h4 class="font-merriweather text-white text-2xl">
                {{ pricingPromotion?.data?.description }}
            </h4>
            <p class="text-base">
                FIND OUT MORE
            </p>
        </div>
    </HoverSection>
</template>
<script setup lang="ts">
import type { CollectionEntry } from 'astro:content';
import HoverSection from '../sections/HoverSection.vue';


const props = defineProps<{
    pricingPromotion: CollectionEntry<"prices">;
}>();

const pricingPromotion = props.pricingPromotion;

</script>