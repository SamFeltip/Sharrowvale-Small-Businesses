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
                <faMenu v-if="!isMenuOpen" />
                <faCross v-else />
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
                                    class="text-lato font-light block text-white hover:text-coral text-2xl py-4 text-right"
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
import faCross from "@/components/icons/faCross.vue";
import faMenu from "@/components/icons/faMenu.vue";

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