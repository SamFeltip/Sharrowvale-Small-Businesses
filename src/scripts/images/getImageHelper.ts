import { getImage } from "astro:assets";

export async function getImageHelper(
    heroImage: ImageMetadata,
    imageWidth: number = 400
) {
    let image = await getImage({
        src: heroImage.src,
        width: imageWidth,
        format: "webp",
    });
    return image.src;
}
