<template>
<Carousel
    ref="carouselRef"
    :opts="{
        align: 'start',
        loop: true,
    }"   
>
    <CarouselContent
    >
      <CarouselItem v-for="item in items" class="basis-1/3 lg:basis-1/5 h-[250px] xl:h-[380px]">
        <SmallPromotionalCard 
            :key="item.title" 
            position="start"
            :card="item"
        />
      </CarouselItem>
    </CarouselContent>

    <!-- Carousel Navigation Buttons below -->
    <div class="carousel-buttons flex justify-center gap-4 mt-4">
      <button @click="goToPrevious" class="rounded-full border border-gray-800 text-gray-800 p-3">
        <ArrowLeft/>
      </button>
      <button @click="goToNext" class="rounded-full border border-gray-800 text-gray-800 p-3">
        <ArrowRight/>
      </button>
      <a class="bg-coral rounded-full text-white py-3 px-5" href="/category/directory">
         See the full directory
      </a>
    </div>
</Carousel>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ref, type Ref } from "vue";
import PlaceCardGrid from '@/components/placeCards/PlaceCardGrid.vue';
import type { PlaceCard } from "../../placeCards/PlaceCard.d.ts";
import type {EmblaCarouselType} from 'embla-carousel';
import SmallPromotionalCard from '@/components/placeCards/SmallPromotionalCard.vue';

const props = defineProps<{items: PlaceCard[]}>();

const { items } = props;

// Managing carousel navigation
const carouselRef: Ref<EmblaCarouselType | null> = ref(null);

const goToPrevious = () => {
  carouselRef.value?.scrollPrev()
}

const goToNext = () => {
  carouselRef.value?.scrollNext()
}
</script>