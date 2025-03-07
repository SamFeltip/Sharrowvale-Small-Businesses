<template>
    <HoverSection :href="pricingPromotion?.data?.href">
        <div class="rounded-xl p-6 text-center flex flex-col gap-2" :class="styleStyle">
            <h4 class="font-merriweather text-2xl/normal">
                {{ pricingPromotion?.data?.description }}
            </h4>
            <p class="text-base/normal uppercase underline" :class="ctaStyle">
                {{ pricingPromotion?.data?.callToAction ?? "find out more" }}
            </p>
        </div>
    </HoverSection>
</template>
<script setup lang="ts">
import type { CollectionEntry } from 'astro:content';
import HoverSection from '../sections/HoverSection.vue';


const props = defineProps<{
    pricingPromotion: CollectionEntry<"prices">;
    style?: "primary" | "secondary";
}>();

const { pricingPromotion, style } = props;

let styleStyle: string;
let ctaStyle: string;

switch (style) {
    case "secondary":
        styleStyle = "border-coral border-2 text-coral";
        ctaStyle = "text-black";
        break;
    default:
        styleStyle = "bg-coral-light text-white"
        ctaStyle = "text-white";


}

</script>