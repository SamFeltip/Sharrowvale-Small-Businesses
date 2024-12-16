<template>
    <div class="w-full h-full flex justify-center">
        <div :id="id" :class="[
            'w-full max-w-screen-xl mx-6 md:mx-16 flex flex-col',
            classList
        ]">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
    classList?: string;
    id?: string;
}>();
</script>