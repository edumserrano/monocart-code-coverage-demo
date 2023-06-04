import { Pipe, PipeTransform } from "@angular/core";

export type HighlightType = "bad" | "good";

@Pipe({
    name: "highlight",
})
export class InstitutionHighlightMatchPipe implements PipeTransform {
    public transform(
        institutionName: string,
        textToHighlight: string,
        type: HighlightType,
    ): string {
        if (textToHighlight === "") {
            return institutionName;
        }

        let institutionNameWithHighlights;
        const matchRegex = new RegExp(textToHighlight, "igmu");
        if (type === "good") {
            institutionNameWithHighlights = institutionName.replace(
                matchRegex,
                '<span class="highlighted-text-good">$&</span>',
            );
        } else {
            institutionNameWithHighlights = institutionName.replace(
                matchRegex,
                '<span class="highlighted-text-bad">$&</span>',
            );
        }

        return institutionNameWithHighlights;
    }
}
