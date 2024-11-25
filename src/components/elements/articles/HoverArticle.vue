<template>
    <article
        :class="`${classList} hover:scale-[1.02] transition-transform duration-300`"
    >
        <slot />
    </article>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
    classList: {
        type: String,
        required: false,
    },
});
</script>
