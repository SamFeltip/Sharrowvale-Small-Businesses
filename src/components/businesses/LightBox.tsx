import * as React from "react";
import Lightbox, {
    type SlideImage,
    type ThumbnailsRef,
} from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import "yet-another-react-lightbox/styles.css";

export default function LightBox({ slides }: { slides: SlideImage[] }) {
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const thumbnailsRef = React.useRef<ThumbnailsRef>(null);

    const openOnIndex = (index: number) => () => {
        setIndex(index);
        setOpen(true);
    };

    return (
        <>
            <div
                id="lightbox-preview-grid"
                className="grid w-full grid-flow-dense gap-4 grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-2"
            >
                <div className="col-span-1 md:col-span-4 aspect-[4/2] md:aspect-square w-full hidden" />


                <div className="col-span-1 md:col-span-3 row-span-3 md:row-span-2 relative">
                    <img
                        className="w-full h-full object-cover absolute inset-0 cursor-pointer rounded-xl md:rounded-3xl"
                        src={slides[0].src}
                        alt=""
                        onClick={openOnIndex(0)}
                    />
                </div>
                <div className="col-span-1 md:col-start-4 row-span-1 md:row-span-2">
                    <div className="flex flex-row gap-4 overflow-y-scroll md:h-[400px] md:flex-col">
                        {slides.slice(1).map((slide, index) => (
                            <img
                                className=" aspect-[3/2] h-[100px] w-full cursor-pointer rounded-lg object-cover md:h-auto md:w-auto md:rounded-xl"
                                src={slide.src}
                                alt=""
                                key={index}
                                onClick={openOnIndex(index + 1)}
                            />
                        ))}
                    </div>
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
                    view: ({ index: currentIndex }) => setIndex(currentIndex),
                }}
                open={open}
                close={() => {
                    setOpen(false);
                }}
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
