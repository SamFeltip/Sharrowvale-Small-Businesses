const MAX_LENGTH_STRING = 20;

export function formatBreadcrumbName(name: string) {
    const lowerCasePreviewString = name
        .toLocaleLowerCase()
        .slice(0, MAX_LENGTH_STRING);

    return name.length < MAX_LENGTH_STRING
        ? lowerCasePreviewString
        : `${lowerCasePreviewString.slice(0, -3)}...`;
}
