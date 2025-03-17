<template>
    <div class="w-full flex justify-between items-center relative">
        <div class="py-8 px-6 w-full flex justify-between items-center z-50 top-0 transition-all"
            :class="{ 'bg-black ': isMenuOpen }">
            <!-- Logo -->
            <a href="/">
                <img :src="LIGHTDARK_LOGO_URL" alt="Sharrow Vale Logo" width="160" height="48" />
            </a>
            <!-- Replace with actual menu icon -->
            <button @click="toggleMenu" class="relative h-[20px] w-[20px]"
                :class="{ 'text-white': color === 'primary' || isMenuOpen, 'text-black': color === 'secondary' && !isMenuOpen }">
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
                <div class="flex flex-col items-end pt-24 h-full overflow-y-auto" @click.stop>
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
import { computed, ref, watch } from 'vue'
import NavSearchWrapper from "@/components/search/NavSearchWrapper.vue";
import ScreenWidth from "@/components/elements/ScreenWidth.vue";
import faCross from "@/components/icons/faCross.vue";
import faMenu from "@/components/icons/faMenu.vue";

const props = withDefaults(defineProps<{
    logo: string,
    logoDark: string,
    color: "primary" | "secondary"
}>(), {
    color: "primary",
});

const LOGO_URL_DARK = props.logoDark
const LOGO_URL = props.logo


const isMenuOpen = ref(false)

const LIGHTDARK_LOGO_URL = computed(() => {
    const rex = isMenuOpen.value || props.color === 'primary' ? LOGO_URL_DARK : LOGO_URL;
    console.log(rex);
    return rex;
})

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