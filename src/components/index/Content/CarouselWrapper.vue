<template>
  <Carousel ref="carouselRef" :opts="{
    align: 'center',
    loop: true,
    skipSnaps: true,
  }">
    <CarouselContent>
      <CarouselItem v-for="item in props.items"
        :class="`basis-2/3 md:basis-1/4 xl:basis-1/5 2xl:basis-1/6 ${heightStyle}`">
        <PromotionalCard :key="item.title" position="start" :card="item" />
      </CarouselItem>
    </CarouselContent>

    <!-- Carousel Navigation Buttons below -->
    <ScreenWidth>
      <div class="carousel-buttons flex justify-center gap-6 sm:gap-12 mt-4">
        <div class="hidden md:flex gap-4">
          <Button title="previous" @click="goToPrevious" shape="circle" :type="type">
            <FontAwesomeIcon :icon="faChevronLeft" width="20" height="20" font-size="20" />
          </Button>
          <Button title="next" @click="goToNext" shape="circle" :type="type">
            <FontAwesomeIcon :icon="faChevronRight" width="20" height="20" font-size="20" />
          </Button>
        </div>
        <Button href="/categories/directory" type="coral" size="lg">
          <span class="hidden sm:inline">
            See the full directory
          </span>
          <span class="inline sm:hidden">
            View directory
          </span>
        </Button>
      </div>
    </ScreenWidth>
  </Carousel>
</template>

<!-- 
    height={40}
    width={40}
    fontSize={40} -->

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ref, type Ref } from "vue";
import type { PlaceCard } from "../../placeCards/PlaceCard.d.ts";
import Button from "@/components/elements/Button.vue";
import type { EmblaCarouselType } from 'embla-carousel';
import PromotionalCard from '@/components/placeCards/PromotionalCard.vue';
import ScreenWidth from '@/components/elements/ScreenWidth.vue';

const props = defineProps<{
  items: PlaceCard[],
  type?: "white-clear" | "clear" | "yellow"
  height?: "sm" | "lg"
}>();

const { type = "clear", height = "lg" } = props;

let heightStyle = "h-[380px]";

if (height == "sm") {
  heightStyle = "h-[180px]"
}


// Managing carousel navigation
const carouselRef: Ref<EmblaCarouselType | null> = ref(null);

const goToPrevious = () => {
  carouselRef.value?.scrollPrev()
}

const goToNext = () => {
  carouselRef.value?.scrollNext()
}
</script>