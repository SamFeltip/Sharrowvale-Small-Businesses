<template>
    <a v-if="href && disabled == false" :href="href" :class="[borderStyles, baseStyles]">
        <slot></slot>
    </a>
    <button v-else @click="$emit('click')" :aria-label="title" :title type="button" :class="[borderStyles, baseStyles]"
        :disabled=disabled>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    title?: string;
    href?: string;
    type?: "yellow" | "clear";
    size?: "sm" | "lg";
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click'): void; // Emits a 'click' event
}>();


const { title, href, type = "clear", size = "sm", disabled = false } = props;

let baseStyles = "flex flex-row gap-2 items-center justify-center px-3 py-1 text-base";

if (size == "lg") {
    baseStyles = "flex items-center justify-center text-base p-3 w-[48px]"
}

if (!disabled) {
    baseStyles += " cursor-pointer hover:scale-110 transition-all"
} else {
    baseStyles += " cursor-default"
}

let borderStyles = "rounded-full border border-gray-500 text-gray-800"

if (type == "yellow") {
    borderStyles = "rounded-full text-gray-800 bg-yellow-400"
}

if (disabled) {
    borderStyles = "rounded-full bg-gray-400"
}

</script>