import { Institution } from "./institution";

class InstitutionsCache {
    private static _instance?: InstitutionsCache;
    public cachedInstitutions: ReadonlyArray<Institution> = [];

    private constructor() {}

    public static get instance(): InstitutionsCache {
        if (!InstitutionsCache._instance) {
            InstitutionsCache._instance = new InstitutionsCache();
        }

        return InstitutionsCache._instance;
    }

    public get isCachePopulated(): boolean {
        return this.cachedInstitutions.length > 0;
    }
}

type InstitutionsFunction = () => ReadonlyArray<Institution>;

export function CacheInstitutions() {
    return (
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<InstitutionsFunction>,
    ): void => {
        const originalMethod = descriptor.value;
        const institutionsCache = InstitutionsCache.instance;

        descriptor.value = function value(this: InstitutionsFunction): ReadonlyArray<Institution> {
            if (institutionsCache.isCachePopulated) {
                return institutionsCache.cachedInstitutions;
            }

            const institutions = originalMethod?.apply(this) ?? [];
            institutionsCache.cachedInstitutions = institutions;
            return institutions;
        };
    };
}
