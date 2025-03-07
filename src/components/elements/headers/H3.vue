<template>
  <h3 :id="id" :class="computedClasses" class="font-merriweather capitalize text-2xl/normal">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define props with TypeScript types
interface Props {
  id?: string;
  classList?: string;
  color?: "white" | "coral" | "black";

  weight?: "light" | "bold" | "semibold" | "normal" | "medium";
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
  classList: "",
  weight: "normal",
});
const { color, weight, classList } = props;

// Computed property for dynamic classes
const computedClasses = computed(() => {
  const colorClasses: Record<string, string> = {
    white: "text-white",
    coral: "text-coral", // Adjust this class based on your Tailwind setup
    black: "text-stone-800",
  };

  const weightClasses: Record<string, string> = {
    light: "font-light",
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
    medium: "font-medium",
  };

  return `${colorClasses[color]} ${weightClasses[weight]} ${classList}`;
});
</script>