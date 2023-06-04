import { Injectable } from "@angular/core";
import { debounceTime, distinctUntilChanged, filter, merge, Subject } from "rxjs";
import { InstitutionId } from "src/app/core/institution";
import { InstitutionService } from "src/app/core/institution.service";
import { InstitutionViewModel } from "src/app/find-institution/institutions-list/institution.view-model";
import { RecentlyUsedInstitutionsService } from "src/app/find-institution/recently-used/recently-used-institutions.service";

@Injectable({ providedIn: "root" })
export class FindInstitutionViewModel {
    private readonly _delaySearchTimeMilliseconds: number = 0;
    private readonly _minSearchLength: number = 5;
    private readonly _lastSearchText: string = "";
    private readonly _filterTextSubject$ = new Subject<string>();
    private _institutions: ReadonlyArray<InstitutionViewModel> = [];
    private _recentlyUsedInstitutions: ReadonlyArray<InstitutionViewModel> = [];
    private _filteredInstitutions: ReadonlyArray<InstitutionViewModel> = [];
    private _filterText: string = "";
    private _showFilteredInstitutions: boolean = false;

    public constructor(
        private readonly _institutionService: InstitutionService,
        private readonly _recentlyUsedService: RecentlyUsedInstitutionsService,
    ) {
        this.subscribeToEvents();
    }

    public get filteredInstitutions(): ReadonlyArray<InstitutionViewModel> {
        return this._filteredInstitutions;
    }

    public get recentlyUsedInstitutions(): ReadonlyArray<InstitutionViewModel> {
        return this._recentlyUsedInstitutions;
    }

    public get showFilteredInstitutions(): boolean {
        return this._showFilteredInstitutions;
    }

    public get showRecentlyUsed(): boolean {
        return !this.showFilteredInstitutions && this._recentlyUsedInstitutions.length > 0;
    }

    public get filterText(): string {
        return this._filterText;
    }

    public set filterText(value: string) {
        this._filterText = value;
        this._filterTextSubject$.next(value);
    }

    public onInit(): void {
        this.loadInstitutions();
        this.loadRecentlyUsed();
    }

    public async onFilteredInstitutionSelectedAsync(id: InstitutionId): Promise<void> {
        await this.onRecentlyInstitutionSelectedAsync(id);
    }

    public async onRecentlyUsedInstitutionSelectedAsync(id: InstitutionId): Promise<void> {
        await this.onRecentlyInstitutionSelectedAsync(id);
    }

    public async onRecentlyInstitutionSelectedAsync(id: InstitutionId): Promise<void> {
        this._recentlyUsedService.addRecentlyUsedInstitution(id);
    }

    private loadInstitutions(): void {
        /*
         * Filtered results are reverse so results are z-a instead of a-z
         * This is because of the way flex boxes are being used to display the results
         * Not reversing this wil result in results being displayed in the wrong order
         */
        this._institutions = this._institutionService
            .getAllInstitutions()
            .map(x => new InstitutionViewModel(x));
    }

    private loadRecentlyUsed(): void {
        this._recentlyUsedInstitutions = this._recentlyUsedService
            .getRecentlyUsedInstitutions()
            .map(x => new InstitutionViewModel(x));
    }

    private subscribeToEvents(): void {
        const filterTextDebounce$ = this._filterTextSubject$.pipe(
            debounceTime(this._delaySearchTimeMilliseconds),
        );
        const filterTextEnoughCharacters$ = this._filterTextSubject$.pipe(
            filter((searchText: string) => this.hasTypedEnoughCharacters(searchText)),
        );
        // prettier-ignore
        const filterTextUpdated$ = merge(filterTextDebounce$, filterTextEnoughCharacters$)
            .pipe(distinctUntilChanged());
        filterTextUpdated$.subscribe(x => {
            this.onFilterTextUpdated(x);
        });
    }

    private onFilterTextUpdated(text: string): void {
        this._filteredInstitutions = this.filterInstitutions(text);
        this._showFilteredInstitutions = text.length > 0;
    }

    private filterInstitutions(filterText: string): ReadonlyArray<InstitutionViewModel> {
        if (filterText.length === 0) {
            return [];
        }

        const filterTextToMatch = filterText.trim().toLocaleLowerCase();
        return this._institutions.filter(institution =>
            institution.name.toLowerCase().includes(filterTextToMatch),
        );
    }

    private hasTypedEnoughCharacters(searchText: string): boolean {
        return Math.abs(searchText.length - this._lastSearchText.length) >= this._minSearchLength;
    }
}
