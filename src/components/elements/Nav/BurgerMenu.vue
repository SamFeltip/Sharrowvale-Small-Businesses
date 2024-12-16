<template>
    <div class="w-full flex justify-between items-center relative">
        <div class="pt-8 px-6 w-full flex justify-between items-center z-50 top-0 transition-all"
            :class="{ 'bg-black ': isMenuOpen }">
            <!-- Logo -->
            <a href="/" class="relative">
                <img :src="LOGO_URL_DARK" alt="Sharrow Vale Logo" width="160" height="160" />
            </a>
            <!-- Replace with actual menu icon -->
            <button @click="toggleMenu" class="relative h-[20px] w-[20px] text-white">
                <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    viewBox="0 0 448
                    512"><!-- !Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                    <path fill="currentColor"
                        d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"><!-- !Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                    <path fill="currentColor"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            </button>
        </div>
        <!-- Mobile Hamburger Menu -->
        <div class="flex text-white">

            <!-- Mobile Menu Overlay -->
            <div id="mobile-menu-overlay"
                class="fixed inset-0 bg-black bg-opacity-95 z-40 overflow-hidden transition-all duration-500 ease-in-out"
                :class="{ 'h-0': !isMenuOpen, 'h-full': isMenuOpen }" @click="closeMenu">
                <div class="flex flex-col items-end pt-24 h-full overflow-y-scroll" @click.stop>
                    <div class="w-full">
                        <div class="mt-8 flex flex-col justify-end">
                            <NavSearchWrapper />
                        </div>

                        <ScreenWidth>
                            <div v-for="(link, index) in menuLinks" :key="link.href"
                                class="transform transition-all duration-500 ease-in-out" :class="{
                                    'translate-x-full opacity-0': !isMenuOpen,
                                    'translate-x-0 opacity-100': isMenuOpen
                                }" :style="`transition-delay: ${index * 100}ms`">
                                <a :href="link.href"
                                    class="text-lato font-light block text-white text-2xl py-4 text-right"
                                    @click="closeMenu">
                                    {{ link.label }}
                                </a>
                            </div>
                        </ScreenWidth>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import NavSearchWrapper from "@/components/search/NavSearchWrapper.vue";
import ScreenWidth from "@/components/elements/ScreenWidth.vue";
const props = defineProps<{
    logo: string
}>();

const LOGO_URL_DARK = props.logo

const isMenuOpen = ref(false)

const menuLinks = [
    { href: "/tags/sharrow-vale-market", label: "The Market" },
    { href: "/categories/directory", label: "Directory" },
    { href: "/articles", label: "News & Updates" },
    { href: "/join", label: "About" }
]

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

watch(isMenuOpen, (newValue) => {
    if (newValue) {
        document.body.classList.add("overflow-hidden");
    } else {
        document.body.classList.remove("overflow-hidden");
    }
});

</script>

<style scoped></style>