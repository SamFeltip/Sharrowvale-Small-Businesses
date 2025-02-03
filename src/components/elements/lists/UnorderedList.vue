<script setup lang="ts">
type Props = {
    gap: number;
    mediumGap?: number;
    direction?: "row" | "column";
    id: string;
}

const props = withDefaults(defineProps<Props>(), {
    direction: "column"
});

const gapClasses = `gap-${props.gap} md:gap-${props.mediumGap ?? props.gap}`;
const directionClasses = props.direction === "row" ? "flex-row" : "flex-col";

</script>

<template>
    <ul :id="props.id" :class="['flex', gapClasses, directionClasses]">
        <slot />
    </ul>
</template>