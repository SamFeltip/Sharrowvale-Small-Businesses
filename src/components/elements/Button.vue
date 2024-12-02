<template>
    <a v-if="href" :href="href" :class="[borderStyles, baseStyles]" >
        <slot></slot>
    </a>
    <button v-else :class="[borderStyles, baseStyles]" :disabled=disabled>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    href?: string;
    type?: "yellow" | "clear";
    disabled?: boolean;
}>();

const {href,type="clear", disabled=false} = props;

let baseStyles = "p-3";

if(!disabled)
{
    baseStyles += " cursor-pointer hover:scale-110 transition-all"
}else{
    baseStyles += " cursor-default"
}

let borderStyles = "rounded-full border border-gray-800 text-gray-800"

if(type == "yellow")
{
    borderStyles = "rounded-full text-gray-800 bg-yellow-400"
}

if(disabled)
{
    borderStyles="rounded-full bg-gray-400"
}

</script>