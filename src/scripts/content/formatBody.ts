export default function formatBody(body: string): string {
    const bodySentences = body.split("\n");

    let lines = bodySentences.filter(
        (line) =>
            line.length > 0 &&
            line.indexOf("#") === -1 &&
            line.indexOf("import") === -1
    );

    lines = lines.map((line) => line.replaceAll("*", ""));

    return lines.slice(0, 3).join("\n");
}
