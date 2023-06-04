import { Injectable } from "@angular/core";
import institutionsJson from "src/assets/institutions.json";

import { Institution, InstitutionId } from "./institution";
import { institutionsSchema } from "./institution-schemas";
import { CacheInstitutions } from "./institutions-cache";

@Injectable({ providedIn: "root" })
export class InstitutionService {
    @CacheInstitutions()
    public getAllInstitutions(): ReadonlyArray<Institution> {
        return institutionsSchema
            .parse(institutionsJson)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    public getInstitution(institutionId: InstitutionId): Institution | undefined {
        return this.getAllInstitutions().find(x => x.id.value === institutionId.value);
    }
}
