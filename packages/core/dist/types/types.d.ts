import type { Bundle, ElementDefinition, Reference, Resource, ResourceType, SearchParameter, StructureDefinition } from '@medplum/fhirtypes';
import type { SearchParameterDetails } from './search/details';
import type { InternalSchemaElement, InternalTypeSchema } from './typeschema/types';
export type TypeName<T> = T extends string ? 'string' : T extends number ? 'number' : T extends boolean ? 'boolean' : T extends undefined ? 'undefined' : 'object';
export interface TypedValue {
    readonly type: string;
    readonly value: any;
}
/**
 * List of property types.
 * http://www.hl7.org/fhir/R4/valueset-defined-types.html
 * The list here includes additions found from StructureDefinition resources.
 */
export declare const PropertyType: {
    readonly Address: "Address";
    readonly Age: "Age";
    readonly Annotation: "Annotation";
    readonly Attachment: "Attachment";
    readonly BackboneElement: "BackboneElement";
    readonly CodeableConcept: "CodeableConcept";
    readonly Coding: "Coding";
    readonly ContactDetail: "ContactDetail";
    readonly ContactPoint: "ContactPoint";
    readonly Contributor: "Contributor";
    readonly Count: "Count";
    readonly DataRequirement: "DataRequirement";
    readonly Distance: "Distance";
    readonly Dosage: "Dosage";
    readonly Duration: "Duration";
    readonly Element: "Element";
    readonly ElementDefinition: "ElementDefinition";
    readonly Expression: "Expression";
    readonly Extension: "Extension";
    readonly HumanName: "HumanName";
    readonly Identifier: "Identifier";
    readonly MarketingStatus: "MarketingStatus";
    readonly Meta: "Meta";
    readonly Money: "Money";
    readonly MoneyQuantity: "MoneyQuantity";
    readonly Narrative: "Narrative";
    readonly ParameterDefinition: "ParameterDefinition";
    readonly Period: "Period";
    readonly Population: "Population";
    readonly ProdCharacteristic: "ProdCharacteristic";
    readonly ProductShelfLife: "ProductShelfLife";
    readonly Quantity: "Quantity";
    readonly Range: "Range";
    readonly Ratio: "Ratio";
    readonly Reference: "Reference";
    readonly RelatedArtifact: "RelatedArtifact";
    readonly SampledData: "SampledData";
    readonly Signature: "Signature";
    readonly SimpleQuantity: "SimpleQuantity";
    readonly SubstanceAmount: "SubstanceAmount";
    readonly SystemString: "http://hl7.org/fhirpath/System.String";
    readonly Timing: "Timing";
    readonly TriggerDefinition: "TriggerDefinition";
    readonly UsageContext: "UsageContext";
    readonly base64Binary: "base64Binary";
    readonly boolean: "boolean";
    readonly canonical: "canonical";
    readonly code: "code";
    readonly date: "date";
    readonly dateTime: "dateTime";
    readonly decimal: "decimal";
    readonly id: "id";
    readonly instant: "instant";
    readonly integer: "integer";
    readonly markdown: "markdown";
    readonly oid: "oid";
    readonly positiveInt: "positiveInt";
    readonly string: "string";
    readonly time: "time";
    readonly unsignedInt: "unsignedInt";
    readonly uri: "uri";
    readonly url: "url";
    readonly uuid: "uuid";
    readonly xhtml: "xhtml";
};
/**
 * An IndexedStructureDefinition is a lookup-optimized version of a StructureDefinition.
 *
 * StructureDefinition resources contain schema information for other resource types.
 * These schemas can be used to automatically generate user interface elements for
 * resources.
 *
 * However, a StructureDefinition resource is not optimized for realtime lookups.  All
 * resource types, sub types, and property definitions are stored in a flat array of
 * ElementDefinition objects.  Therefore, to lookup the schema for a property (i.e., "Patient.name")
 * requires a linear scan of all ElementDefinition objects
 *
 * A StructureDefinition resource contains information about one or more types.
 * For example, the "Patient" StructureDefinition includes "Patient", "Patient_Contact",
 * "Patient_Communication", and "Patient_Link".  This is inefficient.
 *
 * Instead, we create an indexed version of the StructureDefinition, called IndexedStructureDefinition.
 * In an IndexedStructureDefinition, retrieving a property definition is a hashtable lookup.
 *
 * The hierarchy is:
 *   IndexedStructureDefinition - top level for one resource type
 *   TypeSchema - one per resource type and all contained BackboneElements
 *   PropertySchema - one per property/field
 */
export interface IndexedStructureDefinition {
    types: Record<string, TypeInfo>;
}
/**
 * An indexed TypeSchema.
 *
 * Example:  The IndexedStructureDefinition for "Patient" would include the following TypeSchemas:
 *   1) Patient
 *   2) Patient_Contact
 *   3) Patient_Communication
 *   4) Patient_Link
 */
export interface TypeInfo {
    searchParams?: Record<string, SearchParameter>;
    searchParamsDetails?: Record<string, SearchParameterDetails>;
}
/**
 * Indexes a bundle of SearchParameter resources for faster lookup.
 * @param bundle - A FHIR bundle SearchParameter resources.
 * @see {@link IndexedStructureDefinition} for more details on indexed StructureDefinitions.
 */
export declare function indexSearchParameterBundle(bundle: Bundle<SearchParameter>): void;
export declare function indexDefaultSearchParameters(bundle: StructureDefinition[] | Bundle): void;
/**
 * Indexes a SearchParameter resource for fast lookup.
 * Indexes by SearchParameter.code, which is the query string parameter name.
 * @param searchParam - The SearchParameter resource.
 * @see {@link IndexedStructureDefinition} for more details on indexed StructureDefinitions.
 */
export declare function indexSearchParameter(searchParam: SearchParameter): void;
/**
 * Returns the type name for an ElementDefinition.
 * @param elementDefinition - The element definition.
 * @returns The Medplum type name.
 */
export declare function getElementDefinitionTypeName(elementDefinition: ElementDefinition): string;
export declare function buildTypeName(components: string[]): string;
/**
 * Returns true if the type schema is a non-abstract FHIR resource.
 * @param typeSchema - The type schema to check.
 * @returns True if the type schema is a non-abstract FHIR resource.
 */
export declare function isResourceTypeSchema(typeSchema: InternalTypeSchema): boolean;
/**
 * Returns an array of all resource types.
 * Note that this is based on globalSchema, and will only return resource types that are currently in memory.
 * @returns An array of all resource types.
 */
export declare function getResourceTypes(): ResourceType[];
/**
 * Returns the search parameters for the resource type indexed by search code.
 * @param resourceType - The resource type.
 * @returns The search parameters for the resource type indexed by search code.
 */
export declare function getSearchParameters(resourceType: string): Record<string, SearchParameter> | undefined;
/**
 * Returns a search parameter for a resource type by search code.
 * @param resourceType - The FHIR resource type.
 * @param code - The search parameter code.
 * @returns The search parameter if found, otherwise undefined.
 */
export declare function getSearchParameter(resourceType: string, code: string): SearchParameter | undefined;
/**
 * Returns a human friendly display name for a FHIR element definition path.
 * @param path - The FHIR element definition path.
 * @returns The best guess of the display name.
 */
export declare function getPathDisplayName(path: string): string;
/**
 * Returns a human friendly display name for a FHIR element property or slice name
 * @param propertyName - The FHIR element property or slice name
 * @returns The best guess of the display name.
 */
export declare function getPropertyDisplayName(propertyName: string): string;
/**
 * Returns an element definition by type and property name.
 * @param typeName - The type name.
 * @param propertyName - The property name.
 * @param profileUrl - (optional) The URL of the current resource profile
 * @returns The element definition if found.
 */
export declare function getElementDefinition(typeName: string, propertyName: string, profileUrl?: string): InternalSchemaElement | undefined;
/**
 * Returns an element definition from mapping of elements by property name.
 * @param elements  - A mapping of property names to element definitions
 * @param propertyName - The property name of interest
 * @returns The element definition if found.
 */
export declare function getElementDefinitionFromElements(elements: InternalTypeSchema['elements'], propertyName: string): InternalSchemaElement | undefined;
/**
 * Returns true if the value is a TypedValue.
 * @param value - The unknown value to check.
 * @returns True if the value is a TypedValue.
 */
export declare function isTypedValue(value: unknown): value is TypedValue;
/**
 * Type guard to validate that an object is a FHIR resource
 * @param value - The object to check
 * @param resourceType - Checks that the resource is of the given type
 * @returns True if the input is of type 'object' and contains property 'resourceType'
 */
export declare function isResource<T extends Resource>(value: unknown, resourceType?: T['resourceType']): value is T;
/**
 * Type guard to validate that an object is a FHIR reference
 * @param value - The object to check
 * @param resourceType - Checks that the reference is of the given type
 * @returns True if the input is of type 'object' and contains property 'reference'
 */
export declare function isReference<T extends Resource = Resource>(value: unknown, resourceType?: T['resourceType']): value is Reference<T> & {
    reference: string;
};
/**
 * Global schema singleton.
 */
export declare const globalSchema: IndexedStructureDefinition;
/**
 * Output the string representation of a value, suitable for use as part of a search query.
 * @param v - The value to format as a string
 * @returns The stringified value
 */
export declare function stringifyTypedValue(v: TypedValue): string;
//# sourceMappingURL=types.d.ts.map