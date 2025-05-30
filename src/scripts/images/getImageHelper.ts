import { getImage } from "astro:assets";

export async function getImageHelper(
    heroImage: ImageMetadata,
    imageWidth: number = 800
) {
    let image = await getImage({
        src: heroImage,
        width: imageWidth,
        format: "avif",
    });
    return { src: image.src, width: imageWidth };
}
