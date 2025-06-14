<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import NavSearchWrapper from '@/components/search/NavSearchWrapper.vue';

interface Props {
    useLightModeLogo?: boolean;
}

const props = defineProps<Props>();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY >= 700;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const showLightLogo = computed(() => {
    if (isMobileMenuOpen.value) return false;
    return !!props.useLightModeLogo;
});
</script>

<template>
    <!-- Static Navbar -->
    <nav class="w-full z-10">
        <div class="flex justify-between items-center py-4 px-6 lg:px-12 transition-all duration-300"
            :class="{ 'bg-cream sticky top-0 shadow-md': isScrolled }">
            <!-- Logo -->
            <img :src="showLightLogo ? '/logo-light.svg' : '/logo-dark.svg'" alt="Logo" class="h-8" />

            <!-- Desktop Nav Links -->
            <div class="hidden lg:flex items-center gap-6">
                <a href="/market" class="text-sm font-medium">The Market</a>
                <a href="/directory" class="text-sm font-medium">Directory</a>
                <a href="/news" class="text-sm font-medium">News & Updates</a>
                <a href="/about" class="text-sm font-medium">About</a>
                <form action="/search" method="GET" class="relative">
                    <input type="text" name="search" placeholder="Search..." class="border rounded px-3 py-1 text-sm" />
                </form>
            </div>

            <!-- Hamburger Button -->
            <button class="lg:hidden z-20" @click="isMobileMenuOpen = !isMobileMenuOpen">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>

        <!-- Mobile Fullscreen Menu -->
        <transition name="fade">
            <div v-if="isMobileMenuOpen"
                class="fixed inset-0 bg-black bg-opacity-90 text-white flex flex-col p-6 pt-20 z-10">
                <img :src="'/logo-dark.svg'" alt="Logo" class="h-8 mb-6" />

                <NavSearchWrapper class="mb-6" />

                <transition-group name="slide-fade" tag="div" class="flex flex-col gap-4">
                    <a href="/market" class="text-lg font-medium" key="market">The Market</a>
                    <a href="/directory" class="text-lg font-medium" key="directory">Directory</a>
                    <a href="/news" class="text-lg font-medium" key="news">News & Updates</a>
                    <a href="/about" class="text-lg font-medium" key="about">About</a>
                </transition-group>
            </div>
        </transition>
    </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.4s ease;
}

.slide-fade-enter-from {
    transform: translateX(-20px);
    opacity: 0;
}
</style>
