<template>
    <HoverArticle>
        <a :href="props.href">
            <div class="flex flex-col rounded-lg overflow-hidden">
                <img
                    v-if="image"
                    :src="image"
                    :alt="title"
                    class="w-full max-w-[300px] h-48 object-cover rounded-lg"
                />
                <div class="w-full py-4">
                    <h3 class="text-lg font-semibold mb-2">
                        {{ title }}
                    </h3>
                    <p>{{ content }}</p>
                </div>
            </div>
        </a>
    </HoverArticle>
</template>

<script setup lang="ts">
import HoverArticle from "../elements/articles/HoverArticle.vue";

const props = defineProps<{
    image: string;
    title: string;
    content: string;
    categories: { slug: string; name: string }[];
    href?: string;
}>();
</script>
