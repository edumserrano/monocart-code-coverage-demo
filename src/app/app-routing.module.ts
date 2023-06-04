import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FindInstitutionComponent } from "./find-institution/find-institution.component";

const _routes: Routes = [
    { path: "find-institution", component: FindInstitutionComponent },
    { path: "**", redirectTo: "find-institution", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(_routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
