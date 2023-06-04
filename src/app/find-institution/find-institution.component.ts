import { Component, OnInit } from "@angular/core";
import { FindInstitutionViewModel } from "src/app/find-institution/find-institution.view-model";

@Component({
    selector: "app-find-institution",
    templateUrl: "./find-institution.component.html",
    styleUrls: ["./find-institution.component.less"],
})
export class FindInstitutionComponent implements OnInit {
    public constructor(public readonly viewModel: FindInstitutionViewModel) {}

    public ngOnInit(): void {
        this.viewModel.onInit();
    }
}
