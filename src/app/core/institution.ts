export class Institution {
    public constructor(
        public readonly id: InstitutionId,
        public readonly name: string,
        public readonly onCampusSignInLink: string,
        public readonly offCampusSignInLink: string,
    ) {}
}

export interface InstitutionId {
    readonly value: string;
}
