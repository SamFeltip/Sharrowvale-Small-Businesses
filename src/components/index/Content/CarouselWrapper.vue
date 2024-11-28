<template>
<Carousel
    ref="carouselRef"
    :opts="{
        align: 'start',
        loop: true,
    }"   
>
    <CarouselContent>
      <CarouselItem class="basis-1/3">
        <Card class="border-0">
            <CardContent>
                <span>something</span>
            </CardContent>
        </Card>
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        <Card>
            <CardContent>
                <span>something</span>
            </CardContent>
        </Card>
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        <Card>
            <CardContent>
                <span>something</span>
            </CardContent>
        </Card>
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        <Card>
            <CardContent>
                <span>something</span>
            </CardContent>
        </Card>
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        <Card>
            <CardContent>
                <span>something</span>
            </CardContent>
        </Card>
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        <Card>
            <CardContent>
                <span>something</span>
            </CardContent>
        </Card>
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        <Card>
            <CardContent>
                <span>something</span>
            </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>

    <!-- Carousel Navigation Buttons below -->
    <div class="carousel-buttons flex justify-center mt-4">
      <button @click="goToPrevious" class="prev-button px-4 py-2 mr-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Previous</button>
      <button @click="goToNext" class="next-button px-4 py-2 ml-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Next</button>
    </div>
</Carousel>
</template>

<script setup>
import {Card, CardContent} from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ref } from "vue";

// Managing carousel navigation
const carouselRef = ref(null)

const goToPrevious = () => {
  carouselRef.value?.scrollPrev()
}

const goToNext = () => {
  carouselRef.value?.scrollNext()
}
</script>