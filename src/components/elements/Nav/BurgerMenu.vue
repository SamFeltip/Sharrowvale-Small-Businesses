<template>
    <div class="w-full pt-8 flex justify-between items-center relative">
        <!-- Logo -->
        <a href="/" class="z-50 relative">
            <img :src="LOGO_URL_DARK" alt="Sharrow Vale Logo" width="160" height="160" />
        </a>

        <!-- Mobile Hamburger Menu -->
        <div class="flex lg:hidden text-white">
            <!-- Replace with actual menu icon -->
            <button @click="toggleMenu" class="z-50 relative h-[20px] w-[20px] text-white">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"><!-- !Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                    <path fill="currentColor"
                        d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                </svg>
            </button>

            <!-- Mobile Menu Overlay -->
            <div id="mobile-menu-overlay"
                class="fixed inset-0 bg-black bg-opacity-95 z-40 overflow-hidden transition-all duration-500 ease-in-out"
                :class="{ 'h-0': !isMenuOpen, 'h-full': isMenuOpen }" @click="closeMenu">
                <nav class="flex flex-col items-end p-8 pt-24 h-full" @click.stop>
                    <div class="w-full">
                        <div v-for="(link, index) in menuLinks" :key="link.href"
                            class="transform transition-all duration-500 ease-in-out" :class="{
                                'translate-x-full opacity-0': !isMenuOpen,
                                'translate-x-0 opacity-100': isMenuOpen
                            }" :style="`transition-delay: ${index * 100}ms`">
                            <a :href="link.href" class="text-lato font-light block text-white text-2xl py-4 text-right"
                                @click="closeMenu">
                                {{ link.label }}
                            </a>
                        </div>

                        <div class="mt-8 flex justify-end">
                            <form action="/categories/directory" method="GET"
                                class="flex flex-row items-center gap-2 mb-2 w-full border-b border-white max-w-md">


                                <div class="flex flex-row items-center gap-2 w-full">
                                    <input name="search" type="text"
                                        class="bg-transparent text-white placeholder-white focus:outline-none font-lato font-light w-full text-xl"
                                        placeholder="Discover businesses and more..." />
                                </div>
                                <button>
                                    <label for="search">
                                        <svg xmlns="
                                                http:
                                                www.w3.org
                                                2000
                                                svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                                            class="ikonik-9adjq">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M14.3851 15.4457C11.7348 17.5684 7.85535 17.4013 5.39857 14.9445C2.76253 12.3085 2.76253 8.03464 5.39857 5.3986C8.03461 2.76256 12.3085 2.76256 14.9445 5.3986C17.4013 7.85538 17.5684 11.7348 15.4457 14.3851L20.6013 19.5407C20.8942 19.8336 20.8942 20.3085 20.6013 20.6014C20.3085 20.8943 19.8336 20.8943 19.5407 20.6014L14.3851 15.4457ZM6.45923 13.8839C4.40898 11.8336 4.40898 8.50951 6.45923 6.45926C8.50948 4.40901 11.8336 4.40901 13.8839 6.45926C15.9326 8.50801 15.9341 11.8287 13.8884 13.8794C13.8868 13.8809 13.8853 13.8823 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9341 8.50798 15.9326 6.45923 13.8839Z"
                                                fill="currentColor" class="path-1b5n5"></path>
                                        </svg>
                                    </label>
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Replace with your actual logo path

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
</script>

<style scoped></style>