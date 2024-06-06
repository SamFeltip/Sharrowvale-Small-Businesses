import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"


export function InteractiveCarousel() {

    /*
    plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
    */

    return (
        <div className="w-full flex justify-center">

            <Carousel className="mt-3 w-5/6">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="">
                                        <img src={`/imgs/wide-${index + 1}.jpg`} alt="image" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )
}
