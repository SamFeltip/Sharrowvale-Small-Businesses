<script setup lang="ts">
import { Progress } from '@/components/ui/progress';
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(13); // Start progress at 13
let interval: ReturnType<typeof setInterval> | null = null;

// Function to update progress value
const updateProgress = () => {
    if (progress.value < 10) {
        progress.value += 2; // Linearly increment until 80
    } else {
        progress.value += (100 - progress.value) * 0.1; // Asymptotically approach 100
    }

    // Stop the interval if the increment becomes negligible
    if (100 - progress.value < 0.000001 && interval) {
        clearInterval(interval);
        interval = null;
    }
};

// Function to start or restart the progress logic
const startProgress = () => {
    // Clear any existing interval to avoid duplicates
    if (interval) clearInterval(interval);

    progress.value = 13; // Reset the progress value
    interval = setInterval(updateProgress, 10); // Restart the interval
};

// Reset functionality exposed for parent components
defineExpose({
    reset: startProgress,
});

// Start interval on mount
onMounted(() => {
    startProgress();
});

// Clear interval on unmount
onUnmounted(() => {
    if (interval) clearInterval(interval);
});

</script>

<template>
    <Progress v-model="progress" class="w-3/5" />
</template>
