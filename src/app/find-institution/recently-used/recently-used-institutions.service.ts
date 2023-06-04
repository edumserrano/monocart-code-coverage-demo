import { Injectable } from "@angular/core";
import { Institution, InstitutionId } from "src/app/core/institution";
import { InstitutionService } from "src/app/core/institution.service";

@Injectable({
    providedIn: "root",
})
export class RecentlyUsedInstitutionsService {
    private readonly _localStorageKey = "academic-sign-in:recently-used";
    private readonly _maxRecentlyUsed = 5;

    public constructor(private readonly _institutionService: InstitutionService) {}

    /*
     * Check with Dean about how to correctly use the local storage
     * Do we need an Injectable?
     */

    // TODO: Better implementation of storing recently used institutions
    public getRecentlyUsedInstitutions(): ReadonlyArray<Institution> {
        const json = localStorage.getItem(this._localStorageKey);
        if (json === null) {
            return [];
        }

        const recentlyUsedIds = this.jsonToRecentlyUsedIds(json);
        const validRecentlyUsedInstitutions = recentlyUsedIds
            .map(recentlyUsedId => this._institutionService.getInstitution(recentlyUsedId))
            .filter(
                recentlyUsedInstitution => typeof recentlyUsedInstitution !== "undefined",
            ) as ReadonlyArray<Institution>;
        if (validRecentlyUsedInstitutions.length !== recentlyUsedIds.length) {
            this.updateRecentlyUsedInstitutions(validRecentlyUsedInstitutions);
        }

        return validRecentlyUsedInstitutions;
    }

    public addRecentlyUsedInstitution(institutionId: InstitutionId): void {
        let recentlyUsedIds: string[] = this.getRecentlyUsedInstitutions().map(x => x.id.value);
        const recentlyUsedIndex = recentlyUsedIds.findIndex(
            recentlyUsedId => recentlyUsedId === institutionId.value,
        );
        const isInstitutionOnRecentlyUsed = recentlyUsedIndex !== -1;
        if (isInstitutionOnRecentlyUsed) {
            recentlyUsedIds = this.moveToFront(recentlyUsedIndex, recentlyUsedIds);
        } else {
            recentlyUsedIds.unshift(institutionId.value);
            if (recentlyUsedIds.length > this._maxRecentlyUsed) {
                recentlyUsedIds.pop();
            }
        }

        const json = JSON.stringify(recentlyUsedIds);
        localStorage.setItem(this._localStorageKey, json);
    }

    private moveToFront(index: number, recentlyUsedIds: string[]): string[] {
        const item = recentlyUsedIds[index];
        recentlyUsedIds.splice(index, 1);
        recentlyUsedIds.unshift(item);
        return recentlyUsedIds;
    }

    private updateRecentlyUsedInstitutions(institutions: ReadonlyArray<Institution>): void {
        const recentlyUsedIds = institutions.map(x => x.id.value);
        const json = JSON.stringify(recentlyUsedIds);
        localStorage.setItem(this._localStorageKey, json);
    }

    private jsonToRecentlyUsedIds(json: string): ReadonlyArray<InstitutionId> {
        const idList = JSON.parse(json) as string[];
        return idList.map(id => {
            const institutionId: InstitutionId = {
                value: id,
            };
            return institutionId;
        });
    }
}
