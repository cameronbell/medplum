import type { Resource } from '@medplum/fhirtypes';
import type { InternalSchemaElement, InternalTypeSchema, SliceDefinition, SlicingRules } from './typeschema/types';
/**
 * Adds default values to `resource` based on the supplied `schema`. Default values includes all required fixed and pattern
 * values specified on elements in the schema. If an element has a fixed/pattern value but is optional, i.e.
 * `element.min === 0`, the default value is not added.
 *
 * @param resource - The resource to which default values should be added.
 * @param schema - The schema to use for adding default values.
 * @returns A clone of `resource` with default values added.
 */
export declare function applyDefaultValuesToResource(resource: Resource, schema: InternalTypeSchema): Resource;
/**
 * Adds default values to `existingValue` for the given `key` and its children. If `key` is undefined,
 * default values are added to all elements in `elements`. Default values consist of all fixed and pattern
 * values defined in the relevant elements.
 * @param existingValue - The
 * @param elements - The elements to which default values should be added.
 * @param key - (optional) The key of the element(s) for which default values should be added. Elements with nested
 * keys are also included. If undefined, default values for all elements are added.
 * @returns `existingValue` with default values added
 */
export declare function applyDefaultValuesToElement(existingValue: object, elements: Record<string, InternalSchemaElement>, key?: string): object;
export declare function getDefaultValuesForNewSliceEntry(key: string, slice: SliceDefinition, slicing: SlicingRules, schema: InternalTypeSchema): Resource;
export declare function applyFixedOrPatternValue(inputValue: any, key: string, element: InternalSchemaElement, elements: Record<string, InternalSchemaElement>): any;
//# sourceMappingURL=default-values.d.ts.map