<template>
  <h4 :id="id" :class="computedClasses" class="font-merriweather text-2xl/normal capitalize">
    <slot />
  </h4>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define props with TypeScript types
interface Props {
  id?: string;
  classList?: string;
  color?: "white" | "coral" | "black";
  position?: "start" | "center" | "end";
  weight?: "light" | "bold" | "semibold" | "normal" | "medium";
}

const props = withDefaults(defineProps<Props>(), {
  color: "black",
  position: "start",
  classList: "",
  weight: "normal",
});
const { color, position, weight, classList } = props;

// Computed property for dynamic classes
const computedClasses = computed(() => {
  const colorClasses: Record<string, string> = {
    white: "text-white",
    coral: "text-coral",
    black: "text-stone-800",
  };

  const positionClasses: Record<string, string> = {
    start: "text-left",
    center: "text-center",
    end: "text-right",
  };

  const weightClasses: Record<string, string> = {
    light: "font-light",
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
    medium: "font-medium",
  };

  return `${colorClasses[color]} ${positionClasses[position]} ${weightClasses[weight]} ${classList}`;
});
</script>