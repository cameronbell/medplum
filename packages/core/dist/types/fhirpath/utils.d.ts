import type { Period, Quantity } from '@medplum/fhirtypes';
import type { TypedValue } from '../types';
import type { InternalSchemaElement } from '../typeschema/types';
/**
 * Returns a single element array with a typed boolean value.
 * @param value - The primitive boolean value.
 * @returns Single element array with a typed boolean value.
 */
export declare function booleanToTypedValue(value: boolean): [TypedValue];
/**
 * Returns a "best guess" TypedValue for a given value.
 * @param value - The unknown value to check.
 * @returns A "best guess" TypedValue for the given value.
 */
export declare function toTypedValue(value: unknown): TypedValue;
/**
 * Converts unknown object into a JavaScript boolean.
 * Note that this is different than the FHIRPath "toBoolean",
 * which has particular semantics around arrays, empty arrays, and type conversions.
 * @param obj - Any value or array of values.
 * @returns The converted boolean value according to FHIRPath rules.
 */
export declare function toJsBoolean(obj: TypedValue[]): boolean;
export declare function singleton(collection: TypedValue[], type?: string): TypedValue | undefined;
export interface GetTypedPropertyValueOptions {
    /** (optional) URL of a resource profile for type resolution */
    profileUrl?: string;
}
/**
 * Returns the value of the property and the property type.
 * Some property definitions support multiple types.
 * For example, "Observation.value[x]" can be "valueString", "valueInteger", "valueQuantity", etc.
 * According to the spec, there can only be one property for a given element definition.
 * This function returns the value and the type.
 * @param input - The base context (FHIR resource or backbone element).
 * @param path - The property path.
 * @param options - (optional) Additional options
 * @returns The value of the property and the property type.
 */
export declare function getTypedPropertyValue(input: TypedValue, path: string, options?: GetTypedPropertyValueOptions): TypedValue[] | TypedValue | undefined;
/**
 * Returns the value of the property and the property type using a type schema.
 * @param typedValue - The base context (FHIR resource or backbone element).
 * @param path - The property path.
 * @param element - The property element definition.
 * @returns The value of the property and the property type.
 */
export declare function getTypedPropertyValueWithSchema(typedValue: TypedValue, path: string, element: InternalSchemaElement): TypedValue[] | TypedValue | undefined;
/**
 * Returns the value of the property and the property type using a type schema.
 * Note that because the type schema is not available, this function may be inaccurate.
 * In some cases, that is the desired behavior.
 * @param typedValue - The base context (FHIR resource or backbone element).
 * @param path - The property path.
 * @returns The value of the property and the property type.
 */
export declare function getTypedPropertyValueWithoutSchema(typedValue: TypedValue, path: string): TypedValue[] | TypedValue | undefined;
/**
 * Removes duplicates in array using FHIRPath equality rules.
 * @param arr - The input array.
 * @returns The result array with duplicates removed.
 */
export declare function removeDuplicates(arr: TypedValue[]): TypedValue[];
/**
 * Returns a negated FHIRPath boolean expression.
 * @param input - The input array.
 * @returns The negated type value array.
 */
export declare function fhirPathNot(input: TypedValue[]): TypedValue[];
/**
 * Determines if two arrays are equal according to FHIRPath equality rules.
 * @param x - The first array.
 * @param y - The second array.
 * @returns FHIRPath true if the arrays are equal.
 */
export declare function fhirPathArrayEquals(x: TypedValue[], y: TypedValue[]): TypedValue[];
/**
 * Determines if two arrays are not equal according to FHIRPath equality rules.
 * @param x - The first array.
 * @param y - The second array.
 * @returns FHIRPath true if the arrays are not equal.
 */
export declare function fhirPathArrayNotEquals(x: TypedValue[], y: TypedValue[]): TypedValue[];
/**
 * Determines if two values are equal according to FHIRPath equality rules.
 * @param x - The first value.
 * @param y - The second value.
 * @returns True if equal.
 */
export declare function fhirPathEquals(x: TypedValue, y: TypedValue): TypedValue[];
/**
 * Determines if two arrays are equivalent according to FHIRPath equality rules.
 * @param x - The first array.
 * @param y - The second array.
 * @returns FHIRPath true if the arrays are equivalent.
 */
export declare function fhirPathArrayEquivalent(x: TypedValue[], y: TypedValue[]): TypedValue[];
/**
 * Determines if two values are equivalent according to FHIRPath equality rules.
 * @param x - The first value.
 * @param y - The second value.
 * @returns True if equivalent.
 */
export declare function fhirPathEquivalent(x: TypedValue, y: TypedValue): TypedValue[];
/**
 * Determines if the typed value is the desired type.
 * @param typedValue - The typed value to check.
 * @param desiredType - The desired type name.
 * @returns True if the typed value is of the desired type.
 */
export declare function fhirPathIs(typedValue: TypedValue, desiredType: string): boolean;
/**
 * Returns true if the input value is a YYYY-MM-DD date string.
 * @param input - Unknown input value.
 * @returns True if the input is a date string.
 */
export declare function isDateString(input: unknown): input is string;
/**
 * Returns true if the input value is a YYYY-MM-DDThh:mm:ss.sssZ date/time string.
 * @param input - Unknown input value.
 * @returns True if the input is a date/time string.
 */
export declare function isDateTimeString(input: unknown): input is string;
/**
 * Determines if the input is a Period object.
 * This is heuristic based, as we do not have strong typing at runtime.
 * @param input - The input value.
 * @returns True if the input is a period.
 */
export declare function isPeriod(input: unknown): input is Period;
/**
 * Tries to convert an unknown input value to a Period object.
 * @param input - Unknown input value.
 * @returns A Period object or undefined.
 */
export declare function toPeriod(input: unknown): Period | undefined;
/**
 * Determines if the input is a Quantity object.
 * This is heuristic based, as we do not have strong typing at runtime.
 * @param input - The input value.
 * @returns True if the input is a quantity.
 */
export declare function isQuantity(input: unknown): input is Quantity;
export declare function isQuantityEquivalent(x: Quantity, y: Quantity): boolean;
//# sourceMappingURL=utils.d.ts.map