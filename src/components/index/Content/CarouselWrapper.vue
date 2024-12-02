<template>
<Carousel
    ref="carouselRef"
    :opts="{
        align: 'center',
        loop: true,
        skipSnaps: true,
    }"   
>
    <CarouselContent
    >
      <CarouselItem v-for="item in items" class="basis-1/2 md:basis-1/4 h-[250px] xl:h-[380px]">
        <SmallPromotionalCard 
            :key="item.title" 
            position="end"
            :card="item"
        />
      </CarouselItem>
    </CarouselContent>

    <!-- Carousel Navigation Buttons below -->
    <div class="carousel-buttons flex justify-center gap-4 mt-4">
      <Button @click="goToPrevious" class="rounded-full border border-gray-800 text-gray-800 p-3">
        <ArrowLeft/>
      </Button>
      <Button @click="goToNext" class="rounded-full border border-gray-800 text-gray-800 p-3">
        <ArrowRight/>
      </Button>
      <a class="bg-coral rounded-full text-white py-3 px-5" href="/categories/directory">
         See the full directory
      </a>
    </div>
</Carousel>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ref, type Ref } from "vue";
import type { PlaceCard } from "../../placeCards/PlaceCard.d.ts";
import Button from "@/components/elements/Button.vue";
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