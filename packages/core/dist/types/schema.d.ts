import type { OperationOutcomeIssue } from '@medplum/fhirtypes';
/**
 * Validates that the given string is a valid FHIR resource type.
 *
 * On success, silently returns void.
 * On failure, throws an OperationOutcomeError.
 *
 * @example
 * ```ts
 * validateResourceType('Patient'); // nothing
 * validateResourceType('XYZ'); // throws OperationOutcomeError
 * ```
 *
 * Note that this depends on globalSchema, which is populated by the StructureDefinition loader.
 *
 * @example
 * In a server context, you can load all schema definitions:
 *
 * ```ts
 * import { indexStructureDefinitionBundle } from '@medplum/core';
 * import { readJson } from '@medplum/definitions';
 * import { Bundle } from '@medplum/fhirtypes';
 *
 * indexStructureDefinitionBundle(readJson('fhir/r4/profiles-resources.json') as Bundle);
 * ```
 *
 * @example
 * In a client context, you can load the schema definitions using MedplumClient:
 *
 * ```ts
 * import { MedplumClient } from '@medplum/core';
 *
 * const medplum = new MedplumClient();
 * await medplum.requestSchema('Patient');
 * ```
 *
 * @param resourceType - The candidate resource type string.
 */
export declare function validateResourceType(resourceType: string): void;
/**
 * Recursively checks for null values in an object.
 *
 * Note that "null" is a special value in JSON that is not allowed in FHIR.
 * @param value - Input value of any type.
 * @param path - Path string to the value for OperationOutcome.
 * @param issues - Output list of issues.
 */
export declare function checkForNull(value: unknown, path: string, issues: OperationOutcomeIssue[]): void;
//# sourceMappingURL=schema.d.ts.map