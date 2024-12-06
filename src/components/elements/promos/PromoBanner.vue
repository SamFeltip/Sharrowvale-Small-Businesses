<template>
    <div class="bg-coralLight rounded-xl p-2 px-4 text-center flex flex-col gap-2">
        <h4 class="font-merriweather text-white text-2xl">
            {{ callToAction }}
        </h4>
        <p class="text-base">
            <a href="/join">
                FIND OUT MORE
            </a>
        </p>
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    callToAction?: string;
}>();

const callToAction = props.callToAction;
</script>