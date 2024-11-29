<template>
    <a v-if="href" :href="href" class="hover:scale-110 transition-all rounded-full border border-gray-800 text-gray-800 p-3">
        <slot></slot>
    </a>
    <button v-else class="hover:scale-110 transition-all rounded-full border border-gray-800 text-gray-800 p-3">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    href?: string;
}>();

const {href} = props;

</script>