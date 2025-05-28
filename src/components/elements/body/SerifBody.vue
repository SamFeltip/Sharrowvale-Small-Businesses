<template>
    <p :id="id" :class="[
        'text-base font-merriweather font-light leading-[1.24] no-underline',
        `text-${color}`,
        `text-${position}`,
        classList
    ]">
        <slot />
    </p>
</template>

<script setup lang="ts">

// Define props with defaults
const props = withDefaults(
    defineProps<{
        classList?: string;
        position: "center" | "start" | "end";
        color?: "white" | "coral" | "black";
        id?: string;
    }>(),
    {
        color: "black",
        position: "start",
    }
);
</script>