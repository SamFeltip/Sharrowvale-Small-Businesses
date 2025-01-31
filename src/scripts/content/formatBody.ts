export default function formatBody(body: string): string {
    const bodySentences = body.split("\n");

    const lines = bodySentences.filter(
        (line) => line.length > 0 && line.indexOf("#") === -1
    );

    return lines.slice(0, 3).join("\n");
}
