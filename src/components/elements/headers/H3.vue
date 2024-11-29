<template>
    <h3
      :id="id"
      :class="computedClasses"
      class="font-merriweather text-lg font-semibold mb-2"
    >
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
    position?: "start" | "center" | "end";
  }
  
  const props = withDefaults(defineProps<Props>(), {
    color: "black",
    position: "start",
    classList: "",
  });
  const {color, position, classList} = props;
  
  // Computed property for dynamic classes
  const computedClasses = computed(() => {
    const colorClasses: Record<string, string> = {
      white: "text-white",
      coral: "text-coral", // Adjust this class based on your Tailwind setup
      black: "text-black",
    };
  
    const positionClasses: Record<string, string> = {
      start: "text-left",
      center: "text-center",
      end: "text-right",
    };
  
    return `${colorClasses[color]} ${positionClasses[position]} ${classList}`;
  });
  </script>
  