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

    return (
        <div className="w-full flex justify-center">

            <Carousel plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]} className="mt-3 w-5/6">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="relative">

                                    <img className="" src={`/imgs/wide-${index + 1}.jpg`} alt="image" />
                                    <div className="absolute bottom-0 right-0 p-5 text-white">
                                        <h3>Sharrow Vale Market</h3>
                                        <p>10th - 12th July 2024</p>
                                    </div>

                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )
}
