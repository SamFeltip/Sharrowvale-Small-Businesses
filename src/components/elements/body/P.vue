<script setup lang="ts">
import { computed, defineProps } from "vue";

// Define props with types
type Props = {
    classList?: string;
    position?: "center" | "start" | "end";
    color?: "white" | "coral" | "black";
    id?: string;
};

// Props with default values
const props = defineProps<Props>();

const defaultProps = {
    color: "black",
    position: "start",
};

// Merge props with default values
const mergedProps = computed(() => ({
    ...defaultProps,
    ...props,
}));

// Compute the dynamic classes
const dynamicClasses = computed(() => [
    "font-lato font-light no-underline",
    `text-${mergedProps.value.color}`,
    `text-${mergedProps.value.position}`,
    mergedProps.value.classList,
]);
</script>

<template>
    <p :id="mergedProps.id" :class="dynamicClasses">
        <slot />
    </p>
</template>
