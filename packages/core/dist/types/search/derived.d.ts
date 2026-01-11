import type { SearchParameter } from '@medplum/fhirtypes';
import { FhirPathAtom } from '../fhirpath/atoms';
/**
 * Derives an "identifier" search parameter from a reference search parameter.
 *
 * FHIR references can have an "identifier" property.
 *
 * Any FHIR reference search parameter can be used to search for resources with an identifier.
 *
 * However, the FHIR specification does not define an "identifier" search parameter for every resource type.
 *
 * This function derives an "identifier" search parameter from a reference search parameter.
 * @param inputParam - The original reference search parameter.
 * @returns The derived "identifier" search parameter.
 */
export declare function deriveIdentifierSearchParameter(inputParam: SearchParameter): SearchParameter;
export declare function getInnerDerivedIdentifierExpression(expression: string): string | undefined;
export declare function getParsedDerivedIdentifierExpression(originalExpression: string, atom: FhirPathAtom): FhirPathAtom;
//# sourceMappingURL=derived.d.ts.map