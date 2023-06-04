import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InstitutionId } from "src/app/core/institution";
import { InstitutionViewModel } from "src/app/find-institution/institutions-list/institution.view-model";
import { ScreenBreakpoints as screenBreakpoints } from "src/app/screen-breakpoints";

import { HighlightType } from "./pipes/institution-highlight-match.pipe";

@Component({
    selector: "app-institutions-list",
    templateUrl: "./institutions-list.component.html",
    styleUrls: ["./institutions-list.component.less"],
})
export class InstitutionsListComponent {
    private readonly _numColumns: number = 3;
    private readonly _institutionsList: InstitutionViewModel[][] = [];
    private readonly _highlightStyle: HighlightType = "bad";
    private _highlightText: string = "";

    @Output()
    public readonly institutionSelected = new EventEmitter<InstitutionId>();

    public constructor(route: ActivatedRoute) {
        const width = window.innerWidth;

        if (width <= screenBreakpoints.width768px && width > screenBreakpoints.width375px) {
            this._numColumns = 2;
        }

        if (width <= screenBreakpoints.width375px) {
            this._numColumns = 1;
        }

        const highlightsQueryParamValue = route.snapshot.queryParamMap.get("highlights");
        this._highlightStyle = this.getFilteredInstitutionsStyle(highlightsQueryParamValue);
    }

    public get institutionList(): InstitutionViewModel[][] {
        return this._institutionsList;
    }

    public get highlightStyle(): HighlightType {
        return this._highlightStyle;
    }

    public get highlightText(): string {
        return this._highlightText;
    }

    @Input()
    public set highlightText(value: string) {
        this._highlightText = value;
    }

    @Input()
    public set institutions(value: ReadonlyArray<InstitutionViewModel>) {
        this.createColumnArray(value);
    }

    public onInstitutionSelected(institution: InstitutionViewModel): void {
        this.institutionSelected.emit(institution.institution.id);
    }

    public trackByInstitution(index: number, item: InstitutionViewModel): string {
        return item.institution.id.value;
    }

    public trackByColumnIdx(index: number, item: InstitutionViewModel[]): InstitutionViewModel[] {
        return item;
    }

    /**
     * Creates and assigns a 2 dimensional array representing the items in each column of the display.
     */
    private createColumnArray(institutions: ReadonlyArray<InstitutionViewModel>): void {
        this._institutionsList.splice(0, this._institutionsList.length);

        const columns = this.getColumns(institutions.length);

        let start = 0;
        columns.forEach((numberInColumn, index, array) => {
            if (index > 0) {
                start += array[index - 1];
            }

            const items = institutions.slice(start, start + numberInColumn);

            this._institutionsList.push(items);
        });
    }

    /**
     * Creates an array representing the columns displayed on the page.
     * Each value in the array represents how many items should appear in the corresponding column
     */
    private getColumns(resultsLength: number): number[] {
        const num = Math.floor(resultsLength / this._numColumns);
        const remainder = resultsLength % this._numColumns;
        const arr: number[] = new Array<number>(this._numColumns).fill(num);

        for (let i = 0; i < remainder; i++) {
            arr[i]++;
        }

        return arr;
    }

    // Temp code for a query string toggle should be removed once text highlights are finalised
    private getFilteredInstitutionsStyle(highlightsQueryParamValue: string | null): HighlightType {
        if (highlightsQueryParamValue === "1" || highlightsQueryParamValue === "good") {
            return "good";
        }

        return "bad";
    }
}
