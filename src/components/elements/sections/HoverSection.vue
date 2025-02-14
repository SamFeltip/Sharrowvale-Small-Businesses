<template>
    <a :href :class=outerClassList>
        <section :class="`${classList} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`">
            <slot></slot>
        </section>
    </a>
</template>
<script setup lang="ts">

const props = defineProps<{
    outerClassList?: string;
    classList?: string;
    href?: string;
}>();

const { classList = "", outerClassList = "", href } = props;
</script>
