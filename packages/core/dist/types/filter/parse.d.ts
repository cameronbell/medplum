import type { FhirFilterExpression } from './types';
/**
 * Parses a FHIR _filter parameter expression into an AST.
 * @param input - The FHIR _filter parameter expression.
 * @returns The AST representing the filters.
 */
export declare function parseFilterParameter(input: string): FhirFilterExpression;
//# sourceMappingURL=parse.d.ts.map