import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

// images is an array of image paths
export function InteractiveCarousel({
    promotions,
}: {
    promotions: {
        title: string;
        body: string;
        image: string;
        textPosition?: string | undefined;
        location?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        background?: string | undefined;
        business?: string | undefined;
    }[];
}) {
    promotions = promotions.filter((promotion) => {
        if (!promotion.startDate || !promotion.endDate) return true;

        let startDate = new Date(promotion.startDate);
        let endDate = new Date(promotion.endDate);
        let currentDate = new Date();

        return currentDate >= startDate && currentDate <= endDate;
    });

    let cardTextStyles: string[] = promotions
        .map((promotion) => {
            if (promotion.textPosition === "top-left") {
                return "top-0 justify-start items-start top-0 left-0";
            } else if (promotion.textPosition === "top-right") {
                return "top-0 justify-start items-end text-end";
            } else if (promotion.textPosition === "bottom-left") {
                return "top-0 justify-end items-start";
            } else if (promotion.textPosition === "bottom-right") {
                return "top-0 justify-end items-end text-end";
            } else if (promotion.textPosition === "center") {
                return "top-0 justify-end align-center pb-3 text-center";
            }
        })
        .map((style) => {
            return (style +=
                " " + "absolute p-5 text-white h-full w-full flex flex-col");
        });

    return (
        <div className="w-full flex justify-center max-w-[1400px] md:px-12">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className="w-full mt-3 rounded-xl overflow-hidden"
            >
                <CarouselContent>
                    {promotions.map((promotion, index) => {
                        return (
                            <CarouselItem key={index}>
                                <Card className="border-none rounded-xl overflow-hidden">
                                    <CardContent className="relative">
                                        <img
                                            className="object-cover h-[400px] w-full"
                                            src={promotion.image}
                                            alt="image"
                                        />
                                        <div
                                            id="card-text"
                                            className={cardTextStyles[index]}
                                            style={{
                                                background:
                                                    promotion.background,
                                            }}
                                        >
                                            <h1>{promotion.title}</h1>
                                            <p>{promotion.body}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
