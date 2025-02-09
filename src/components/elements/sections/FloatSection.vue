<template>
    <section :data-float="floatIn" :data-pagefind-ignore="pagefindIgnore" :id="id" :class="[
        'w-full flex align-items gap-6 md:gap-10',
        flexDirection,
        classList,
        animateClass ? 'animate-appear' : ' translate-y-[-50px] opacity-0']" ref="sectionRef">
        <slot />
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps<{
    direction?: 'column' | 'row';
    classList?: string;
    id?: string;
    pagefindIgnore?: boolean;
    floatIn?: boolean;
}>();

const { direction = "column", floatIn = true } = props;

const sectionRef = ref<HTMLElement | null>(null);

const flexDirection = computed(() =>
    direction === 'column' ? 'flex-col' : 'flex-col md:flex-row'
);

let animateClass = ref(false);

useIntersectionObserver(sectionRef, ([entry], observer) => {
    animateClass.value = entry.isIntersecting;
}, { root: null });
</script>
