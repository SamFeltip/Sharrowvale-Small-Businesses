import { getImage } from "astro:assets";

export async function getImageHelper(
    heroImage: ImageMetadata,
    imageWidth: number
) {
    let image = await getImage({
        src: heroImage,
        width: imageWidth,
        format: "webp",
    });
    return image.src;
}
