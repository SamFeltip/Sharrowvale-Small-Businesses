export type Positions = "start" | "center" | "end";

export type Alignment = {
    default?: Positions;
    sm?: Positions;
    md?: Positions;
    lg?: Positions;
};

export const alignmentKeys: (keyof Alignment)[] = ["default", "sm", "md", "lg"];

export type PositionClassList = Record<Positions, string[]>;

export function buildString(
    position: Alignment,
    positionClasses: PositionClassList
) {
    let positionClass = "";

    alignmentKeys.forEach((key) => {
        const positionKey = position[key];

        if (positionKey == undefined) {
            console.log(`position ${key} not found`);
            return;
        }

        let positionClassList = positionClasses[positionKey];

        let keyClass = "";

        ("text-start");
        ("text-end");
        ("text-center");

        ("sm:text-start");
        ("sm:text-end");
        ("sm:text-center");

        ("md:text-start");
        ("md:text-end");
        ("md:text-center");

        ("lg:text-start");
        ("lg:text-end");
        ("lg:text-center");

        switch (key) {
            case "sm":
        }

        if (key != "default") {
            keyClass = `${key}:`;
        }

        positionClassList.forEach((positionKeyword) => {
            positionClass += ` ${keyClass}${positionKeyword}`;
        });
    });

    console.log(positionClass);

    return positionClass;
}
