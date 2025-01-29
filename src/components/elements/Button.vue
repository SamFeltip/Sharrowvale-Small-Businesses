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
    type?: "yellow" | "clear" | "white-clear" | "coral";
    shape?: "rounded" | "circle";
    size?: "sm" | "lg";
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click'): void; // Emits a 'click' event
}>();


const { title, href, type = "clear", size = "sm", disabled = false, shape = "rounded" } = props;

let baseStyles = "capitalize flex flex-row gap-2 items-center justify-center touch-manipulation";

if (size == "lg") {
    baseStyles += " text-xl "
} else {
    baseStyles += " text-base "
}

if (shape == "rounded") {
    if (size == "lg") {
        baseStyles += " py-3 px-5 "
    } else {
        baseStyles += " py-1 px-3 "
    }
}

if (shape == "circle") {
    baseStyles += " aspect-square "

    if (size == "lg") {
        baseStyles += " p-3 min-w-[30px] min-h-[30px]"
    } else {
        baseStyles += " p-4 min-w-[20px] min-h-[20px]"
    }
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
} else if (type == "coral") {
    borderStyles = "rounded-full bg-coral text-white"
}

if (disabled) {
    borderStyles = "rounded-full bg-gray-400"
}

</script>