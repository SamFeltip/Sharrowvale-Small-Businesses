<template>
    <div>
        <!-- Main Navigation Bar -->
        <nav :class="[
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
            {
                'bg-transparent': !isScrolled,
                'bg-cream shadow-lg': isScrolled,
                'transform -translate-y-full': !showStickyNav && isScrolled,
                'transform translate-y-0': showStickyNav || !isScrolled
            }
        ]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <div class="flex-shrink-0">
                        <img :src="currentLogoSrc" alt="Company Logo" class="h-8 w-auto" />
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center space-x-8">
                        <!-- Navigation Links -->
                        <nav class="flex space-x-6">
                            <a v-for="link in navigationLinks" :key="link.name" :href="link.href" :class="[
                                'text-sm font-medium transition-colors duration-200 hover:opacity-70',
                                linkTextColor
                            ]">
                                {{ link.name }}
                            </a>
                        </nav>

                        <!-- Desktop Search -->
                        <div class="relative">
                            <form action="/search" class="relative">
                                <input name="search" type="text" placeholder="Search..." :class="[
                                    'w-64 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                                    searchInputClass
                                ]" />
                                <button type="submit"
                                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Mobile Hamburger Button -->
                    <div class="md:hidden">
                        <button @click="toggleMobileMenu" :class="[
                            'inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white',
                            hamburgerButtonClass
                        ]" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <!-- Hamburger Icon -->
                            <svg :class="[
                                'h-6 w-6 transition-transform duration-200',
                                { 'rotate-90': isMobileMenuOpen }
                            ]" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu Overlay -->
        <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-90 z-40 md:hidden">
                <div class="flex flex-col h-full pt-20 px-6">
                    <!-- Mobile Search Component -->
                    <div class="mb-8">
                        <NavSearchWrapper />
                    </div>

                    <!-- Mobile Navigation Links -->
                    <nav class="flex flex-col space-y-4">
                        <a v-for="(link, index) in navigationLinks" :key="link.name" :href="link.href" :class="[
                            'text-white text-xl font-medium py-3 transition-all duration-300 hover:text-gray-300 transform',
                            {
                                'translate-x-0 opacity-100': isMobileMenuOpen,
                                'translate-x-8 opacity-0': !isMobileMenuOpen
                            }
                        ]" :style="{
                            transitionDelay: `${index * 100}ms`
                        }" @click="closeMobileMenu">
                            {{ link.name }}
                        </a>
                    </nav>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavSearchWrapper from '@/components/search/NavSearchWrapper.vue'

interface NavigationLink {
    name: string
    href: string
}

interface SearchResult {
    title?: string
    name?: string
    url?: string
    [key: string]: any
}

interface Props {
    lightMode?: boolean
    lightLogo?: string
    darkLogo?: string
}

const props = withDefaults(defineProps<Props>(), {
    lightMode: false,
    lightLogo: '/logos/logo-light.svg',
    darkLogo: '/logos/logo-dark.svg'
})

// Reactive state
const isScrolled = ref(false)
const showStickyNav = ref(false)
const isMobileMenuOpen = ref(false)

// Navigation links
const navigationLinks: NavigationLink[] = [
    { name: 'The Market', href: '/market' },
    { name: 'Directory', href: '/directory' },
    { name: 'News & Updates', href: '/news' },
    { name: 'About', href: '/about' }
]

// Computed properties
const currentLogoSrc = computed(() => {
    if (props.lightMode) {
        return isMobileMenuOpen.value ? props.darkLogo : props.lightLogo
    }
    return props.darkLogo
})

const linkTextColor = computed(() => {
    if (props.lightMode) {
        return isScrolled.value ? 'text-gray-800' : 'text-gray-800'
    }
    return isScrolled.value ? 'text-gray-800' : 'text-white'
})

const hamburgerButtonClass = computed(() => {
    if (props.lightMode) {
        return 'text-gray-800 hover:text-gray-600'
    }
    return isScrolled.value ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-gray-300'
})

const searchInputClass = computed(() => {
    if (props.lightMode || isScrolled.value) {
        return 'bg-white text-gray-900'
    }
    return 'bg-white bg-opacity-20 text-white placeholder-gray-300 border-white border-opacity-30'
})

// Methods
const handleScroll = () => {
    const scrollPosition = window.scrollY
    const wasScrolled = isScrolled.value

    isScrolled.value = scrollPosition > 50

    if (scrollPosition > 700) {
        if (!showStickyNav.value) {
            showStickyNav.value = true
        }
    } else {
        showStickyNav.value = false
    }
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value

    // Prevent body scroll when menu is open
    if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
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

<style scoped>
/* Ensure smooth transitions */
* {
    transition-property: transform, opacity, background-color, color;
}
</style>