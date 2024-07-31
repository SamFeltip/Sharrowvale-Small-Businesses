// import { useCallback, useEffect, useRef, useState } from "react";
// import LightGallery from 'lightgallery/react';
// import lgZoom from 'lightgallery/plugins/zoom';

import * as React from "react";
import Lightbox, { type SlideImage, type ThumbnailsRef } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Button } from "@/components/ui/button";


import "yet-another-react-lightbox/styles.css";

export default function LightBox({ slides }: { slides: SlideImage[] }) {
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const thumbnailsRef = React.useRef<ThumbnailsRef>(null);

    const openOnIndex = (index: number) => () => {
        setIndex(index);
        setOpen(true)
    };

    return (
        <>
            <div id="lightbox-preview-grid" className="grid grid-cols-[1fr_150px] gap-4">
                <img
                    className="cursor-pointer rounded-3xl w-full h-[400px] object-cover"
                    src={slides[0].src}
                    alt=""
                    onClick={openOnIndex(0)}
                />
                <div className="flex flex-col gap-4 h-[400px] overflow-y-scroll">
                    {
                        slides.slice(1).map((slide, index) =>
                            <img
                                className="cursor-pointer object-cover rounded-3xl h-[100px]"
                                src={slide.src}
                                alt=""
                                key={index}
                                onClick={openOnIndex(index + 1)}
                            />
                        )
                    }
                </div>
            </div>

            <Lightbox
                index={index}

                on={{
                    click: () => {
                        (thumbnailsRef.current?.visible
                            ? thumbnailsRef.current?.hide
                            : thumbnailsRef.current?.show)?.();
                    },
                    view: ({ index: currentIndex }) => setIndex(currentIndex)
                }}
                open={open}
                close={() => { setOpen(false) }}
                slides={slides}
                carousel={{ preload: 2 }}
                plugins={[Thumbnails]}
                thumbnails={{
                    ref: thumbnailsRef,
                    position: "bottom",
                    width: 120,
                    height: 80,
                    border: 1,
                    borderRadius: 4,
                    padding: 4,
                    gap: 16,
                    showToggle: false,
                }}
            />
        </>
    );
}



// export default function LightBox() {
//     const lightGallery = useRef<any>(null);
//     const [items, setItems] = useState([
//         {
//             id: '1',
//             size: '1400-800',
//             src: 'https://images.unsplash.com/photo-1455541504462-57ebb2a9cec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80',
//             thumb: 'https://images.unsplash.com/photo-1455541504462-57ebb2a9cec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80',
//         },
//         {
//             id: '2',
//             size: '1400-800',
//             src: 'https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
//             thumb: 'https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
//         },
//     ]);

//     const onInit = useCallback((detail: { instance: any; }) => {
//         if (detail) {
//             lightGallery.current = detail.instance;
//         }
//     }, []);

//     const getItems = useCallback(() => {
//         return items.map((item) => {
//             return (
//                 <div
//                     key={item.id}
//                     data-lg-size={item.size}
//                     className="gallery-item"
//                     data-src={item.src}
//                 >
//                     <img alt="" className="img-responsive" src={item.thumb} />
//                 </div>
//             );
//         });
//     }, [items]);

//     useEffect(() => {
//         lightGallery.current.refresh();
//     }, [items]);

//     return (
//         <div className="App">
//             <LightGallery
//                 plugins={[lgZoom]}
//                 onInit={onInit}
//             >
//                 {getItems()}
//             </LightGallery>
//         </div>
//     );
// }