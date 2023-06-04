import { RefinementCtx, z } from "zod";

import { Institution, InstitutionId } from "./institution";

// prettier-ignore
const _institutionSchema = z.object({
    id: z.string().trim().regex(/^[a-z-]/u),
    name: z.string().trim().regex(/^[a-zA-Z0-9-]/u),
    onCampusSignInLink: z.string().url().nullable().optional(),
    offCampusSignInLink: z.string().url().nullable().optional(),
});

type InstitutionDto = z.infer<typeof _institutionSchema>;

export const institutionsSchema = z
    .array(_institutionSchema)
    .transform((institutions, ctx) => institutions.map(x => createInstitution(ctx, x)));

function createInstitution(ctx: RefinementCtx, institutionDto: InstitutionDto): Institution {
    if (!institutionContainsAtLeastOneSignInLink(institutionDto)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Institution ${institutionDto.name} must have at least one sign in URL.`,
        });
        return z.NEVER;
    }

    const institutionId: InstitutionId = {
        value: institutionDto.id,
    };
    const institution: Institution = {
        id: institutionId,
        name: institutionDto.name,
        onCampusSignInLink: institutionDto.onCampusSignInLink ?? "",
        offCampusSignInLink: institutionDto.offCampusSignInLink ?? "",
    };
    return institution;
}

function institutionContainsAtLeastOneSignInLink(institutionDto: InstitutionDto): boolean {
    const onCampusSignInLinkHasValue = signInLinkHasValue(institutionDto.onCampusSignInLink);
    const offCampusSignInLinkHasValue = signInLinkHasValue(institutionDto.offCampusSignInLink);
    return onCampusSignInLinkHasValue || offCampusSignInLinkHasValue;
}

function signInLinkHasValue(value: string | null | undefined): boolean {
    return value !== "" && value !== null && typeof value !== "undefined";
}
