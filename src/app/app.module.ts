import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./main/app.component";
import { FindInstitutionComponent } from "./find-institution/find-institution.component";
import { InstitutionsListComponent } from "./find-institution/institutions-list/institutions-list.component";
import { InstitutionHighlightMatchPipe } from "./find-institution/institutions-list/pipes/institution-highlight-match.pipe";
import { SafePipe } from "./pipes/safe.pipe";

@NgModule({
    declarations: [
        AppComponent,
        FindInstitutionComponent,
        InstitutionHighlightMatchPipe,
        InstitutionsListComponent,
        SafePipe,
    ],
    imports: [AppRoutingModule, BrowserModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
