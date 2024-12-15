<template>
    <form action="/search" method="GET"
        class="flex flex-row items-center gap-2 mb-2 w-full border-b border-white max-w-md">


        <div class="flex flex-row items-center gap-2 w-full">
            <input name="search" type="text"
                class="bg-transparent text-white placeholder-white focus:outline-none font-lato font-light w-full text-xl"
                placeholder="Discover businesses and more..." />
        </div>
        <button>
            <label for="search">
                <faSearch />
            </label>
        </button>
    </form>
</template>
<script setup lang="ts">
import faSearch from "@/components/icons/faSearch.vue";
</script>