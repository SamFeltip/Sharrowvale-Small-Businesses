// import { useCallback, useEffect, useRef, useState } from "react";
// import LightGallery from 'lightgallery/react';
// import lgZoom from 'lightgallery/plugins/zoom';

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import { Button } from "@/components/ui/button";


import "yet-another-react-lightbox/styles.css";

export default function LightBox() {
    const [open, setOpen] = React.useState(false);
    const thumbnailsRef = React.useRef(null);

    return (
        <>
            <p>Thumbnails plugin adds thumbnails track.</p>

            <Lightbox
                on={{
                    click: () => {
                        (thumbnailsRef.current?.visible
                            ? thumbnailsRef.current?.hide
                            : thumbnailsRef.current?.show)?.();
                    },
                }}
                open={open}
                close={() => { setOpen(false) }}
                slides={[
                    { src: "https://cdn.prod.website-files.com/66637ca2fcf1b32b5acc349c/66673de73858e856c9b96e35_sfc%205.avif" },
                    { src: "https://cdn.prod.website-files.com/66637ca2fcf1b32b5acc349c/66673dc78ea18ad0812ed15b_sfc%204.avif" },
                    { src: "https://cdn.prod.website-files.com/66637ca2fcf1b32b5acc349c/66673de7156dc9acc931d5ff_sfc%203.avif" },
                    { src: "https://cdn.prod.website-files.com/66637ca2fcf1b32b5acc349c/66673dcdadd7d953c878265e_sfc%202.avif" },
                ]}
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

            <Button onClick={() => setOpen(true)} />
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