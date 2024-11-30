<template>
    <a :href="href">
        <article
            :class="`${classList} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`"
            >
            <slot />
        </article>
    </a>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    classList?: string;
    href?: string;
}>();

const {classList, href} = props;
</script>
