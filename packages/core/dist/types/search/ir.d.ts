import type { Period, Quantity } from '@medplum/fhirtypes';
import type { TypedValue } from '../types';
export interface SearchableToken {
    readonly system: string | undefined;
    readonly value: string | undefined;
}
export declare function convertToSearchableNumbers(typedValues: TypedValue[]): [number | undefined, number | undefined][];
export declare function convertToSearchableDates(typedValues: TypedValue[]): Period[];
export declare function convertToSearchableStrings(typedValues: TypedValue[]): string[];
export declare function convertToSearchableReferences(typedValues: TypedValue[]): string[];
export declare function convertToSearchableQuantities(typedValues: TypedValue[]): Quantity[];
export declare function convertToSearchableUris(typedValues: TypedValue[]): string[];
export interface TokensContext {
    caseInsensitive?: boolean;
    textSearchSystem?: string;
}
export declare function convertToSearchableTokens(typedValues: TypedValue[], context?: TokensContext): SearchableToken[];
//# sourceMappingURL=ir.d.ts.map