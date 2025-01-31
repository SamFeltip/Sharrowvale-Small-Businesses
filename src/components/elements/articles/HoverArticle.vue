<template>
    <a :href :class=outerClassList>
        <article :class="`${classList} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`">
            <slot></slot>
        </article>
    </a>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    outerClassList?: string;
    classList?: string;
    href?: string;
}>();

const { classList = "", outerClassList = "", href } = props;
</script>
