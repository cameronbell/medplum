import type { OperationOutcome, Resource, SearchParameter } from '@medplum/fhirtypes';
import type { TypedValue } from '../types';
export declare const DEFAULT_SEARCH_COUNT = 20;
export declare const DEFAULT_MAX_SEARCH_COUNT = 1000;
export interface SearchRequest<T extends Resource = Resource> {
    readonly resourceType: T['resourceType'];
    filters?: Filter[];
    sortRules?: SortRule[];
    cursor?: string;
    offset?: number;
    count?: number;
    fields?: string[];
    name?: string;
    total?: 'none' | 'estimate' | 'accurate';
    include?: IncludeTarget[];
    revInclude?: IncludeTarget[];
    summary?: 'true' | 'text' | 'data';
    format?: string;
    pretty?: boolean;
    types?: T['resourceType'][];
}
export interface Filter {
    code: string;
    operator: Operator;
    value: string;
}
export interface SortRule {
    code: string;
    descending?: boolean;
}
export interface IncludeTarget {
    resourceType: string;
    searchParam: string;
    targetType?: string;
    modifier?: 'iterate';
}
/**
 * Search operators.
 * These operators represent "modifiers" and "prefixes" in FHIR search.
 * See: https://www.hl7.org/fhir/search.html
 */
export declare const Operator: {
    readonly EQUALS: "eq";
    readonly NOT_EQUALS: "ne";
    readonly GREATER_THAN: "gt";
    readonly LESS_THAN: "lt";
    readonly GREATER_THAN_OR_EQUALS: "ge";
    readonly LESS_THAN_OR_EQUALS: "le";
    readonly STARTS_AFTER: "sa";
    readonly ENDS_BEFORE: "eb";
    readonly APPROXIMATELY: "ap";
    readonly CONTAINS: "contains";
    readonly STARTS_WITH: "sw";
    readonly EXACT: "exact";
    readonly TEXT: "text";
    readonly NOT: "not";
    readonly ABOVE: "above";
    readonly BELOW: "below";
    readonly IN: "in";
    readonly NOT_IN: "not-in";
    readonly OF_TYPE: "of-type";
    readonly MISSING: "missing";
    readonly PRESENT: "present";
    readonly IDENTIFIER: "identifier";
    readonly ITERATE: "iterate";
};
export type Operator = (typeof Operator)[keyof typeof Operator];
/**
 * Parses a search URL into a search request.
 * @param url - The original search URL or the FHIR resource type.
 * @param query - Optional collection of additional query string parameters.
 * @returns A parsed SearchRequest.
 */
export declare function parseSearchRequest<T extends Resource = Resource>(url: URL | string, query?: Record<string, string[] | string | undefined>): SearchRequest<T>;
export declare function parseParameter(searchParam: SearchParameter, modifier: string, value: string): Filter;
/**
 * Parses an extended FHIR search criteria string (i.e. application/x-fhir-query).
 *
 * @example Evaluating a FHIRPath subexpression
 *
 * ```typescript
 * const query = 'Patient?name={{ %patient.name }}';
 * const variables = { patient: { name: 'John Doe' } };
 * const request = parseXFhirQuery(query, variables);
 * console.log(request.filters[0].value); // "John Doe"
 * ```
 *
 * @see https://hl7.org/fhir/fhir-xquery.html
 * @param query - The X-Fhir-Query string to parse
 * @param variables - Values to pass into embedded FHIRPath expressions
 * @returns The parsed search request
 */
export declare function parseXFhirQuery(query: string, variables: Record<string, TypedValue>): SearchRequest;
/**
 * Formats a search definition object into a query string.
 * Note: The return value does not include the resource type.
 * @param definition - The search definition.
 * @returns Formatted URL.
 */
export declare function formatSearchQuery(definition: SearchRequest): string;
/**
 * Splits a FHIR search value on commas.
 * Respects backslash escape.
 *
 * See: https://hl7.org/fhir/r4/search.html#escaping
 *
 * @param input - The FHIR search value to split.
 * @returns The individual search values.
 */
export declare function splitSearchOnComma(input: string): string[];
export declare function invalidSearchOperator(operator: Operator, searchParameterCodeOrId: string): OperationOutcome;
//# sourceMappingURL=search.d.ts.map