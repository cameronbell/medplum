import type { SearchParameter } from '@medplum/fhirtypes';
import type { Atom } from '../fhirlexer/parse';
import { FhirPathAtom } from '../fhirpath/atoms';
import type { InternalSchemaElement } from '../typeschema/types';
export declare const SearchParameterType: {
    readonly BOOLEAN: "BOOLEAN";
    readonly NUMBER: "NUMBER";
    readonly QUANTITY: "QUANTITY";
    readonly TEXT: "TEXT";
    readonly REFERENCE: "REFERENCE";
    readonly CANONICAL: "CANONICAL";
    readonly DATE: "DATE";
    readonly DATETIME: "DATETIME";
    readonly PERIOD: "PERIOD";
    readonly UUID: "UUID";
};
export type SearchParameterType = (typeof SearchParameterType)[keyof typeof SearchParameterType];
export interface SearchParameterDetails {
    readonly type: SearchParameterType;
    readonly elementDefinitions?: InternalSchemaElement[];
    readonly parsedExpression: FhirPathAtom;
    readonly array?: boolean;
}
/**
 * Returns the type details of a SearchParameter.
 *
 * The SearchParameter resource has a "type" parameter, but that is missing some critical information.
 *
 * For example:
 *   1) The "date" type includes "date", "datetime", and "period".
 *   2) The "token" type includes enums and booleans.
 *   3) Arrays/multiple values are not reflected at all.
 * @param resourceType - The root resource type.
 * @param searchParam - The search parameter.
 * @returns The search parameter type details.
 */
export declare function getSearchParameterDetails(resourceType: string, searchParam: SearchParameter): SearchParameterDetails;
export declare function getExpressionsForResourceType(resourceType: string, expression: string): Atom[];
export declare function getExpressionForResourceType(resourceType: string, expression: string): string | undefined;
export declare function getParsedExpressionForResourceType(resourceType: string, expression: string): FhirPathAtom;
//# sourceMappingURL=details.d.ts.map