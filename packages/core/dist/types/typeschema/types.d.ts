import type { Bundle, ElementDefinitionBinding, Resource, ResourceType, StructureDefinition } from '@medplum/fhirtypes';
import type { DataTypesMap } from '../base-schema-utils';
import type { TypedValue } from '../types';
/**
 * Internal representation of a non-primitive FHIR type, suitable for use in resource validation
 */
export interface InternalTypeSchema {
    name: string;
    type: string;
    path: string;
    title?: string;
    url?: string;
    version?: string;
    kind?: string;
    description?: string;
    elements: Record<string, InternalSchemaElement>;
    constraints?: Constraint[];
    parentType?: InternalTypeSchema;
    innerTypes: InternalTypeSchema[];
    summaryProperties?: Set<string>;
    mandatoryProperties?: Set<string>;
}
export interface InternalSchemaElement {
    description: string;
    path: string;
    min: number;
    max: number;
    isArray?: boolean;
    constraints?: Constraint[];
    type: ElementType[];
    slicing?: SlicingRules;
    fixed?: TypedValue;
    pattern?: TypedValue;
    binding?: ElementDefinitionBinding;
}
export interface ElementType {
    code: string;
    targetProfile?: string[];
    profile?: string[];
}
export interface Constraint {
    key: string;
    severity: 'error' | 'warning';
    expression: string;
    description: string;
}
export interface SlicingRules {
    discriminator: SliceDiscriminator[];
    ordered: boolean;
    rule?: 'open' | 'closed' | 'openAtEnd';
    slices: SliceDefinition[];
}
export interface SliceDefinition extends Omit<InternalSchemaElement, 'slicing'> {
    name: string;
    definition?: string;
    elements: Record<string, InternalSchemaElement>;
}
export interface SliceDiscriminator {
    path: string;
    type: string;
}
/**
 * Parses a StructureDefinition resource into an internal schema better suited for
 * programmatic validation and usage in internal systems
 * @param sd - The StructureDefinition resource to parse
 * @returns The parsed schema for the given resource type
 * @experimental
 */
export declare function parseStructureDefinition(sd: StructureDefinition): InternalTypeSchema;
/**
 * Parses and indexes structure definitions
 * @param bundle - Bundle or array of structure definitions to be parsed and indexed
 */
export declare function indexStructureDefinitionBundle(bundle: StructureDefinition[] | Bundle): void;
export declare function loadDataType(sd: StructureDefinition): void;
export declare function getAllDataTypes(): DataTypesMap;
export declare function isDataTypeLoaded(type: string): boolean;
export declare function tryGetDataType(type: string, profileUrl?: string): InternalTypeSchema | undefined;
export declare function getDataType(type: string, profileUrl?: string): InternalTypeSchema;
/**
 * Returns true if the given string is a valid FHIR resource type.
 *
 * @example
 * ```ts
 * isResourceType('Patient'); // true
 * isResourceType('XYZ'); // false
 * ```
 *
 * @param resourceType - The candidate resource type string.
 * @returns True if the resource type is a valid FHIR resource type.
 */
export declare function isResourceType(resourceType: string): resourceType is ResourceType;
export declare function isProfileLoaded(profileUrl: string): boolean;
export declare function tryGetProfile(profileUrl: string): InternalTypeSchema | undefined;
/**
 * Construct the subset of a resource containing a minimum set of fields.  The returned resource is not guaranteed
 * to contain only the provided properties, and may contain others (e.g. `resourceType` and `id`)
 *
 * @param resource - The resource to subset
 * @param properties - The minimum properties to include in the subset
 * @returns The modified resource, containing the listed properties and possibly other mandatory ones
 */
export declare function subsetResource<T extends Resource>(resource: T | undefined, properties: string[]): T | undefined;
//# sourceMappingURL=types.d.ts.map