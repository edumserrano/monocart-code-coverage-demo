import { Institution } from "src/app/core/institution";

export class InstitutionViewModel {
    public constructor(public readonly institution: Institution) {}

    public get name(): string {
        return this.institution.name;
    }
}
