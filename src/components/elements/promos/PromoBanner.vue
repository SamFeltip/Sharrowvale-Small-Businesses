<template>
    <div class="bg-coralLight rounded-xl p-2 text-center">
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
import { ref } from "vue";

const props = defineProps<{
    callToAction?: string;
}>();

const callToAction = props.callToAction;
</script>