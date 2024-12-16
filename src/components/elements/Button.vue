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
    type?: "yellow" | "clear" | "white-clear";
    size?: "sm" | "lg";
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click'): void; // Emits a 'click' event
}>();


const { title, href, type = "clear", size = "sm", disabled = false } = props;

let baseStyles = "capitalize flex flex-row gap-2 items-center justify-center px-3 py-1 text-base touch-manipulation";

if (size == "lg") {
    baseStyles = "capitalize flex items-center justify-center text-xl p-3 min-w-[50px] touch-manipulation"
}

if (!disabled) {
    baseStyles += " cursor-pointer hover:scale-110 transition-all"
} else {
    baseStyles += " cursor-default"
}

let borderStyles = "rounded-full border border-gray-500 text-gray-800"

if (type == "yellow") {
    borderStyles = "rounded-full text-gray-800 bg-yellow-400"
} else if (type == "white-clear") {
    borderStyles = "rounded-full border border-white text-white"
}

if (disabled) {
    borderStyles = "rounded-full bg-gray-400"
}

</script>