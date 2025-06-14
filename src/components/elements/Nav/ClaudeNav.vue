<template>
    <div>
        <!-- Main Navigation Bar -->
        <nav :class="[
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out pt-6 pb-3',
            {
                'bg-transparent': !showStickyNav && !isMenuOpen,
                'bg-cream shadow-lg': showStickyNav && !isMenuOpen,
                'bg-black': isMenuOpen,
                'transform -translate-y-full': !showStickyNav && isScrolled,
                'transform translate-y-0': showStickyNav || !isScrolled,
                'pt-3 lg:pt-6': showStickyNav
            }
        ]">
            <ScreenWidth>
                <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <div class="flex-shrink-0">
                        <a href="/">
                            <img :src="lightLogo" :class="[{ 'hidden': !logoIsDark }]" alt="Sharrow Vale Logo"
                                width="160" height="48" />
                            <img :src="darkLogo" :class="[{ 'hidden': logoIsDark }]" alt="Sharrow Vale Logo" width="160"
                                height="48" />
                        </a>
                    </div>
                    <!-- Desktop Navigation -->
                    <div class="hidden lg:flex items-center space-x-8" :class="[
                        {
                            'text-white': !linkTextDark,
                            'text-black': linkTextDark
                        }
                    ]">
                        <!-- Navigation Links -->
                        <nav class="flex space-x-6">
                            <a v-for="link in menuLinks" :key="link.label" :href="link.href" :class="[
                                'font-lato text-xl font-light transition-colors duration-200 hover:opacity-70'
                            ]">
                                {{ link.label }}
                            </a>
                        </nav>
                        <!-- Desktop Search -->
                        <div class="relative border-b" :class="[{
                            'border-black': linkTextDark,
                            'border-white': !linkTextDark
                        }]">
                            <form action="/search" method="GET" class="mb-1 flex flex-row items-center gap-2">
                                <button id="nav-search" class="flex">
                                    <!-- magnifying glass -->
                                    <svg xmlns="
                                            http:
                                            www.w3.org
                                            2000
                                            svg" width="25" height="25" viewBox="0 0 24 24" fill="none"
                                        class="ikonik-9adjq">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M14.3851 15.4457C11.7348 17.5684 7.85535 17.4013 5.39857 14.9445C2.76253 12.3085 2.76253 8.03464 5.39857 5.3986C8.03461 2.76256 12.3085 2.76256 14.9445 5.3986C17.4013 7.85538 17.5684 11.7348 15.4457 14.3851L20.6013 19.5407C20.8942 19.8336 20.8942 20.3085 20.6013 20.6014C20.3085 20.8943 19.8336 20.8943 19.5407 20.6014L14.3851 15.4457ZM6.45923 13.8839C4.40898 11.8336 4.40898 8.50951 6.45923 6.45926C8.50948 4.40901 11.8336 4.40901 13.8839 6.45926C15.9326 8.50801 15.9341 11.8287 13.8884 13.8794C13.8868 13.8809 13.8853 13.8823 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9341 8.50798 15.9326 6.45923 13.8839Z"
                                            fill="currentColor" class="path-1b5n5"></path>
                                    </svg>
                                </button>
                                <input id="nav-search" name="search" type="text" :class="[
                                    'bg-transparent text-xl font-light focus:outline-none',
                                    {
                                        'text-white placeholder-white': !linkTextDark,
                                        'text-black placeholder-black': linkTextDark
                                    }
                                ]" placeholder="Search" />
                            </form>
                        </div>
                    </div>
                    <!-- Mobile Hamburger Button -->
                    <div class="lg:hidden">
                        <button @click="toggleMobileMenu" :class="[
                            'inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 focus:outline-none',
                            {
                                'text-black': linkTextDark, 'text-white': !linkTextDark
                            }]" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <!-- Hamburger Icon -->
                            <svg :class="[
                                'h-6 w-6 transition-transform duration-200',
                                { 'rotate-90': isMenuOpen }
                            ]" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <!-- burger icon -->
                                <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                                <!-- x icon -->
                                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- breadcrumbs -->
                <div class="font-lato text-sm lg:hidden" :class="{
                    'text-coral': linkTextDark,
                    'text-white': !linkTextDark,
                }" v-if="!isMenuOpen && breadcrumbs.length > 0">
                    <FontAwesomeIcon :icon="faChevronLeft" width="10" height="10" font-size="10" class="me-1" />

                    <span v-for="(breadcrumb, index) in breadcrumbs">
                        <a :href="breadcrumb.href" class="hover:underline">{{ breadcrumb.label }}</a>
                        <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
                    </span>
                </div>
            </ScreenWidth>
        </nav>
        <!-- Mobile Menu Overlay -->

        <div class="fixed inset-0 bg-black bg-opacity-95 z-40 overflow-hidden transition-all duration-500 ease-in-out lg:hidden"
            :class="{ 'h-0': !isMenuOpen, 'h-full': isMenuOpen }">
            <div class="flex flex-col h-full pt-24 px-6 overflow-scroll">
                <!-- Mobile Search Component -->
                <div class="my-8 flex flex-col justify-end">
                    <NavSearchWrapper />
                </div>

                <!-- Mobile Navigation Links -->
                <nav class="flex flex-col space-y-4 pb-8">
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
                </nav>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import NavSearchWrapper from '@/components/search/NavSearchWrapper.vue'
import ScreenWidth from "@/components/elements/ScreenWidth.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft"

export interface NavigationLink {
    label: string
    href: string
}

const {
    lightMode = false,
    lightLogo,
    darkLogo,
    breadcrumbs,
} = defineProps<{
    lightMode?: boolean
    lightLogo?: string
    darkLogo?: string
    breadcrumbs: NavigationLink[]
}>()

// Reactive state
const isScrolled = ref(false)
const showStickyNav = ref(false)
const isMenuOpen = ref(false)

// Navigation links
const menuLinks = [
    { href: "/tags/sharrow-vale-market", label: "The Market" },
    { href: "/categories/directory", label: "Directory" },
    { href: "/articles", label: "News & Updates" },
    { href: "/join", label: "About" }
]

// Computed properties
const logoIsDark = computed(() => {
    if (isMenuOpen.value) {
        return false
    }

    if (showStickyNav.value) {
        return true
    }

    return lightMode;
})

/**
 * decide if element color should be dark (black)
 */
const linkTextDark = computed(() => {
    return !isMenuOpen.value && (lightMode || showStickyNav.value)
})

// Methods
const handleScroll = () => {
    const scrollPosition = window.scrollY

    isScrolled.value = scrollPosition > 200

    if (scrollPosition > 700) {
        if (!showStickyNav.value) {
            showStickyNav.value = true
        }
    } else {
        showStickyNav.value = false
    }
}

const toggleMobileMenu = () => {
    isMenuOpen.value = !isMenuOpen.value

    // Prevent body scroll when menu is open
    if (isMenuOpen.value) {
        document.body.classList.add("overflow-hidden");
    } else {
        document.body.classList.remove("overflow-hidden");
    }
}

const closeMenu = () => {
    isMenuOpen.value = false
    document.body.style.overflow = ''
}

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial scroll position
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.body.style.overflow = '' // Cleanup body scroll lock
})

</script>