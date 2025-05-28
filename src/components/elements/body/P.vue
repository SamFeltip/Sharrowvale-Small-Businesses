<script setup lang="ts">
import { computed } from "vue";

// Define props with types
type Props = {
    classList?: string;
    position?: "center" | "start" | "end";
    weight?: "light" | "bold" | "normal";
    color?: "white" | "coral" | "black";
    size?: "xl" | "base";
    id?: string;
};

// Props with default values
const props = defineProps<Props>();

const defaultProps = {
    color: "black",
    position: "start",
    size: "base",
};

// Merge props with default values
const mergedProps = computed(() => ({
    ...defaultProps,
    ...props,
}));

const dynamicClasses = computed(() => [
    "font-lato no-underline leading-6 font-light",
    mergedProps.value.color && `text-${mergedProps.value.color}`,
    mergedProps.value.position && `text-${mergedProps.value.position}`,
    mergedProps.value.weight && `font-${mergedProps.value.weight}`,
    mergedProps.value.size && `text-${mergedProps.value.size}`,
    mergedProps.value.classList,
]);
</script>

<template>
    <p :id="mergedProps.id" :class="dynamicClasses">
        <slot />
    </p>
</template>
