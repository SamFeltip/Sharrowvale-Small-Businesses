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

// images is an array of image paths
export function InteractiveCarousel({ promotions }: {
    promotions: {
        title: string,
        body: string,
        image: string,
        location?: string | undefined,
        startDate?: string | undefined,
        endDate?: string | undefined,
        business?: string | undefined,
    }[]
}) {

    return (
        <div className="w-full flex justify-center">

            <Carousel plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]} className="mt-3 w-5/6 rounded-xl overflow-hidden">
                <CarouselContent>
                    {promotions.map((promotion, index) => (
                        <CarouselItem key={index}>
                            <Card className="border-none rounded-xl overflow-hidden">
                                <CardContent className="relative">

                                    <img className="object-cover h-[400px] w-full" src={promotion.image} alt="image" />
                                    <div className="absolute bottom-0 right-0 p-5 text-white w-3/4 text-end">

                                        <h3 className="capitalize flex-none w-full mt-0 mb-0 font-merriweather text-[5.5rem] font-bold leading-[1.02] no-underline">
                                            {promotion.title}
                                        </h3>
                                        <p>{promotion.body}</p>
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
