import type { Bundle, CodeableConcept, Coding, Extension, ExtensionValue, Identifier, Meta, ObservationDefinition, ObservationDefinitionQualifiedInterval, Patient, Practitioner, QuestionnaireResponse, QuestionnaireResponseItemAnswer, Range, Reference, RelatedPerson, Resource } from '@medplum/fhirtypes';
/**
 * QueryTypes defines the different ways to specify FHIR search parameters.
 *
 * Can be any valid input to the URLSearchParams() constructor.
 *
 * TypeScript definitions for URLSearchParams do not match runtime behavior.
 * The official spec only accepts string values.
 * Web browsers and Node.js automatically coerce values to strings.
 * See: https://github.com/microsoft/TypeScript/issues/32951
 */
export type QueryTypes = URLSearchParams | string[][] | Record<string, string | number | boolean | undefined> | string | undefined;
export type ProfileResource = Patient | Practitioner | RelatedPerson;
/**
 * Allowed values for `code_challenge_method` in a PKCE exchange.
 */
export type CodeChallengeMethod = 'plain' | 'S256';
export interface Code {
    code?: CodeableConcept;
}
export type ResourceWithCode = Resource & Code;
export type WithId<T> = T & {
    id: string;
};
export declare function isResourceWithId<T extends Resource>(resource: unknown, resourceType?: T['resourceType']): resource is WithId<T>;
/**
 * Creates a reference resource.
 * @param resource - The FHIR resource.
 * @returns A reference resource.
 */
export declare function createReference<T extends Resource>(resource: T): Reference<T> & {
    reference: string;
};
/**
 * Returns a reference string for a resource.
 * @param input - The FHIR resource or reference.
 * @returns A reference string of the form resourceType/id.
 */
export declare function getReferenceString(input: (Reference & {
    reference: string;
}) | WithId<Resource>): string;
export declare function getReferenceString(input: Reference | Resource): string | undefined;
/**
 * Returns the ID portion of a reference.
 * @param input - A FHIR reference or resource.
 * @returns The ID portion of a reference.
 */
export declare function resolveId(input: Reference | Resource | undefined): string | undefined;
/**
 * Parses a reference and returns a tuple of [ResourceType, ID].
 * @param reference - A reference to a FHIR resource.
 * @returns A tuple containing the `ResourceType` and the ID of the resource.
 * @throws {@link OperationOutcomeError} If the reference cannot be parsed.
 */
export declare function parseReference<T extends Resource>(reference: Reference<T> | undefined): [T['resourceType'], string];
/**
 * Normalizes Medplum's `meta.account` and `meta.accounts` into a singular array of FHIR references.
 * @param meta - The `meta` object of a FHIR resource.
 * @returns An array of references, or `undefined` if none.
 */
export declare function extractAccountReferences(meta: Meta | undefined): Reference[] | undefined;
/**
 * Returns true if the resource is a "ProfileResource".
 * @param resource - The FHIR resource.
 * @returns True if the resource is a "ProfileResource".
 */
export declare function isProfileResource(resource: Resource): resource is ProfileResource;
/**
 * Returns a display string for the resource.
 * @param resource - The input resource.
 * @returns Human friendly display string.
 */
export declare function getDisplayString(resource: Resource): string;
/**
 * Returns an image URL for the resource, if one is available.
 * @param resource - The input resource.
 * @returns The image URL for the resource or undefined.
 */
export declare function getImageSrc(resource: Resource): string | undefined;
/**
 * Returns a Date property as a Date.
 * When working with JSON objects, Dates are often serialized as ISO-8601 strings.
 * When that happens, we need to safely convert to a proper Date object.
 * @param date - The date property value, which could be a string or a Date object.
 * @returns A Date object.
 */
export declare function getDateProperty(date: string | undefined): Date | undefined;
/**
 * Calculates the age in years from the birth date.
 * @param birthDateStr - The birth date or start date in ISO-8601 format YYYY-MM-DD.
 * @param endDateStr - Optional end date in ISO-8601 format YYYY-MM-DD. Default value is today.
 * @returns The age in years, months, and days.
 */
export declare function calculateAge(birthDateStr: string, endDateStr?: string): {
    years: number;
    months: number;
    days: number;
};
/**
 * Calculates the age string for display using the age appropriate units.
 * If the age is greater than or equal to 2 years, then the age is displayed in years.
 * If the age is greater than or equal to 1 month, then the age is displayed in months.
 * Otherwise, the age is displayed in days.
 * @param birthDateStr - The birth date or start date in ISO-8601 format YYYY-MM-DD.
 * @param endDateStr - Optional end date in ISO-8601 format YYYY-MM-DD. Default value is today.
 * @returns The age string.
 */
export declare function calculateAgeString(birthDateStr: string, endDateStr?: string): string | undefined;
/**
 * Returns all questionnaire answers as a map by link ID.
 * @param response - The questionnaire response resource.
 * @returns Questionnaire answers mapped by link ID.
 */
export declare function getQuestionnaireAnswers(response: QuestionnaireResponse): Record<string, QuestionnaireResponseItemAnswer>;
/**
 * Returns an array of  questionnaire answers as a map by link ID.
 * @param response - The questionnaire response resource.
 * @returns Questionnaire answer arrays mapped by link ID.
 */
export declare function getAllQuestionnaireAnswers(response: QuestionnaireResponse): Record<string, QuestionnaireResponseItemAnswer[]>;
/**
 * Returns the resource identifier for the given system.
 *
 * If multiple identifiers exist with the same system, the first one is returned.
 *
 * If the system is not found, then returns undefined.
 * @param resource - The resource to check.
 * @param system - The identifier system.
 * @returns The identifier value if found; otherwise undefined.
 */
export declare function getIdentifier(resource: Resource, system: string): string | undefined;
/**
 * Sets a resource identifier for the given system.
 *
 * Note that this method is only available on resources that have an "identifier" property,
 * and that property must be an array of Identifier objects,
 * which is not true for all FHIR resources.
 *
 * If the identifier already exists, then the value is updated.
 *
 * Otherwise a new identifier is added.
 *
 * @param resource - The resource to add the identifier to.
 * @param system - The identifier system.
 * @param value - The identifier value.
 */
export declare function setIdentifier(resource: Resource & {
    identifier?: Identifier[];
}, system: string, value: string): void;
/**
 * Returns an extension value by extension URLs.
 * @param resource - The base resource.
 * @param urls - Array of extension URLs.  Each entry represents a nested extension.
 * @returns The extension value if found; undefined otherwise.
 */
export declare function getExtensionValue(resource: any, ...urls: string[]): ExtensionValue | undefined;
/**
 * Returns an extension by extension URLs.
 * @param resource - The base resource.
 * @param urls - Array of extension URLs. Each entry represents a nested extension.
 * @returns The extension object if found; undefined otherwise.
 */
export declare function getExtension(resource: any, ...urls: string[]): Extension | undefined;
/**
 * Returns the FHIR JSON string representation of the input value.
 *
 * Removes properties with empty string values.
 * Removes objects with zero properties.
 *
 * Does not modify the input value.
 * If the input value does not contain any empty properties, then the original value is returned.
 * Otherwise, a new value is returned with the empty properties removed.
 *
 * See: https://www.hl7.org/fhir/json.html
 *
 * @param value - The input value.
 * @param pretty - Optional flag to pretty-print the JSON.
 * @returns The resulting JSON string.
 */
export declare function stringify(value: any, pretty?: boolean): string;
/**
 * Returns true if the value is empty (null, undefined, empty string, or empty object).
 * @param v - Any value.
 * @returns True if the value is an empty string or an empty object.
 */
export declare function isEmpty(v: unknown): boolean;
export type CanBePopulated = {
    length: number;
} | Record<string, any>;
/**
 * Returns true if the value is a non-empty string, an object with a length property greater than zero, or a non-empty object
 * @param arg - Any value
 * @returns True if the value is a non-empty string, an object with a length property greater than zero, or a non-empty object
 */
export declare function isPopulated<T extends {
    length: number;
} | Record<string, any>>(arg: CanBePopulated | undefined | null): arg is T;
/**
 * Returns an array with trailing empty elements removed.
 * For example, [1, 2, 3, null, undefined, ''] becomes [1, 2, 3].
 * This is useful for FHIR arrays, which by default must maintain the same length,
 * but while editing we may want to trim trailing empty elements.
 * @param arr - The input array.
 * @returns The array with trailing empty elements removed.
 */
export declare function trimTrailingEmptyElements<T>(arr: T[] | undefined): T[] | undefined;
/**
 * Resource equality.
 * Ignores meta.versionId and meta.lastUpdated.
 * @param object1 - The first object.
 * @param object2 - The second object.
 * @param path - Optional path string.
 * @returns True if the objects are equal.
 */
export declare function deepEquals(object1: unknown, object2: unknown, path?: string): boolean;
/**
 * Checks if value includes all fields and values of pattern.
 * It doesn't matter if value has extra fields, values, etc.
 * @param value - The object being tested against pattern.
 * @param pattern - The object pattern/shape checked to exist within value.
 * @returns True if value includes all fields and values of pattern.
 */
export declare function deepIncludes(value: any, pattern: any): boolean;
/**
 * Creates a deep clone of the input value.
 *
 * Limitations:
 *  - Only supports JSON primitives and arrays.
 *  - Does not support Functions, lambdas, etc.
 *  - Does not support circular references.
 *
 * See: https://web.dev/structured-clone/
 * See: https://stackoverflow.com/questions/40488190/how-is-structured-clone-algorithm-different-from-deep-copy
 * @param input - The input to clone.
 * @returns A deep clone of the input.
 */
export declare function deepClone<T>(input: T): T;
/**
 * Returns true if the input string is a UUID.
 * @param input - The input string.
 * @returns True if the input string matches the UUID format.
 */
export declare function isUUID(input: string): input is string;
/**
 * Returns true if the input is an object.
 * @param obj - The candidate object.
 * @returns True if the input is a non-null non-undefined object.
 */
export declare function isObject(obj: unknown): obj is Record<string, unknown>;
/**
 * Returns true if the input array is an array of strings.
 * @param arr - Input array.
 * @returns True if the input array is an array of strings.
 */
export declare function isStringArray(arr: any[]): arr is string[];
/**
 * Returns true if the input value is a string.
 * @param value - The candidate value.
 * @returns True if the input value is a string.
 */
export declare function isString(value: unknown): value is string;
/**
 * Returns true if the input value is a Coding object.
 * This is a heuristic check based on the presence of the "code" property.
 * @param value - The candidate value.
 * @returns True if the input value is a Coding.
 */
export declare function isCoding(value: unknown): value is Coding & {
    code: string;
};
/**
 * Returns true if the input value is a CodeableConcept object.
 * This is a heuristic check based on the presence of the "coding" property.
 * @param value - The candidate value.
 * @returns True if the input value is a CodeableConcept.
 */
export declare function isCodeableConcept(value: unknown): value is CodeableConcept & {
    coding: Coding[];
};
/**
 * Finds the code for a specific system in a list of CodeableConcepts.
 * @param categories - The list of CodeableConcepts to search.
 * @param system - The system to match.
 * @returns The code for the matching system, or undefined if not found.
 */
export declare function findCodeBySystem(categories: CodeableConcept[] | undefined, system: string): string | undefined;
/**
 * Returns true if the input value is an object with a string text property.
 * This is a heuristic check based on the presence of the "text" property.
 * @param value - The candidate value.
 * @returns True if the input value is a text object.
 */
export declare function isTextObject(value: unknown): value is {
    text: string;
};
/**
 * Converts an ArrayBuffer to hex string.
 * See: https://stackoverflow.com/a/55200387
 * @param arrayBuffer - The input array buffer.
 * @returns The resulting hex string.
 */
export declare function arrayBufferToHex(arrayBuffer: ArrayBufferLike | ArrayBufferView): string;
/**
 * Converts an ArrayBuffer to a base-64 encoded string.
 * @param arrayBuffer - The input array buffer.
 * @returns The base-64 encoded string.
 */
export declare function arrayBufferToBase64(arrayBuffer: ArrayBufferLike | ArrayBufferView): string;
/**
 * Normalizes an `ArrayBufferLike` (eg. an `ArrayBuffer`) to a raw `ArrayBufferLike` (without a view). If the passed buffer is a view, it gives the raw `ArrayBufferLike`.
 *
 * This is useful in cases where you need to operate on the raw bytes of an `ArrayBuffer` where a `TypedArray` (eg. `Uint32Array`) might be passed in.
 * This ensures that you will always operate on the raw bytes rather than accidentally truncating the input by operating on the elements of the view.
 *
 * @param typedArrayOrBuffer - The `ArrayBufferLike` (either `TypedArray` or raw `ArrayBuffer`) to normalize to raw `ArrayBuffer`.
 * @returns The raw `ArrayBuffer` without a view.
 */
export declare function normalizeArrayBufferView(typedArrayOrBuffer: ArrayBufferLike | ArrayBufferView): ArrayBufferLike;
export declare function capitalize(word: string): string;
export declare function isLowerCase(c: string): boolean;
export declare function isComplexTypeCode(code: string): boolean;
/**
 * Returns the difference between two paths which is often suitable to use as a key in a `Record<string, InternalSchemaElement>`
 * @param parentPath - The parent path that will be removed from `path`.
 * @param path - The element path that should be a child of `parentPath`.
 * @returns - The difference between `path` and `parentPath` or `undefined` if `path` is not a child of `parentPath`.
 */
export declare function getPathDifference(parentPath: string, path: string): string | undefined;
/**
 * Tries to find a code string for a given system within a given codeable concept.
 * @param concept - The codeable concept.
 * @param system - The system string.
 * @returns The code if found; otherwise undefined.
 */
export declare function getCodeBySystem(concept: CodeableConcept, system: string): string | undefined;
/**
 * Sets a code for a given system within a given codeable concept.
 * @param concept - The codeable concept.
 * @param system - The system string.
 * @param code - The code value.
 */
export declare function setCodeBySystem(concept: CodeableConcept, system: string, code: string): void;
/**
 * Tries to find an observation interval for the given patient and value.
 * @param definition - The observation definition.
 * @param patient - The patient.
 * @param value - The observation value.
 * @param category - Optional interval category restriction.
 * @returns The observation interval if found; otherwise undefined.
 */
export declare function findObservationInterval(definition: ObservationDefinition, patient: Patient, value: number, category?: 'reference' | 'critical' | 'absolute'): ObservationDefinitionQualifiedInterval | undefined;
/**
 * Tries to find an observation reference range for the given patient and condition names.
 * @param definition - The observation definition.
 * @param patient - The patient.
 * @param names - Optional condition names.
 * @returns The observation interval if found; otherwise undefined.
 */
export declare function findObservationReferenceRange(definition: ObservationDefinition, patient: Patient, names?: string[]): ObservationDefinitionQualifiedInterval | undefined;
/**
 * Returns all matching observation reference range for the given patient and condition names.
 * @param definition - The observation definition.
 * @param patient - The patient.
 * @param names - Optional condition names.
 * @returns The observation intervals if found; otherwise an empty array.
 */
export declare function findObservationReferenceRanges(definition: ObservationDefinition, patient: Patient, names?: string[]): ObservationDefinitionQualifiedInterval[];
/**
 * Returns true if the value is in the range accounting for precision.
 * @param value - The numeric value.
 * @param range - The numeric range.
 * @param precision - Optional precision in number of digits.
 * @returns True if the value is within the range.
 */
export declare function matchesRange(value: number, range: Range, precision?: number): boolean;
/**
 * Returns the input number rounded to the specified number of digits.
 * @param a - The input number.
 * @param precision - The precision in number of digits.
 * @returns The number rounded to the specified number of digits.
 */
export declare function preciseRound(a: number, precision: number): number;
/**
 * Returns true if the two numbers are equal to the given precision.
 * @param a - The first number.
 * @param b - The second number.
 * @param precision - Optional precision in number of digits.
 * @returns True if the two numbers are equal to the given precision.
 */
export declare function preciseEquals(a: number, b: number, precision?: number): boolean;
/**
 * Returns true if the first number is less than the second number to the given precision.
 * @param a - The first number.
 * @param b - The second number.
 * @param precision - Optional precision in number of digits.
 * @returns True if the first number is less than the second number to the given precision.
 */
export declare function preciseLessThan(a: number, b: number, precision?: number): boolean;
/**
 * Returns true if the first number is greater than the second number to the given precision.
 * @param a - The first number.
 * @param b - The second number.
 * @param precision - Optional precision in number of digits.
 * @returns True if the first number is greater than the second number to the given precision.
 */
export declare function preciseGreaterThan(a: number, b: number, precision?: number): boolean;
/**
 * Returns true if the first number is less than or equal to the second number to the given precision.
 * @param a - The first number.
 * @param b - The second number.
 * @param precision - Optional precision in number of digits.
 * @returns True if the first number is less than or equal to the second number to the given precision.
 */
export declare function preciseLessThanOrEquals(a: number, b: number, precision?: number): boolean;
/**
 * Returns true if the first number is greater than or equal to the second number to the given precision.
 * @param a - The first number.
 * @param b - The second number.
 * @param precision - Optional precision in number of digits.
 * @returns True if the first number is greater than or equal to the second number to the given precision.
 */
export declare function preciseGreaterThanOrEquals(a: number, b: number, precision?: number): boolean;
/**
 * Finds the first resource in the input array that matches the specified code and system.
 * @param resources - The array of resources to search.
 * @param code - The code to search for.
 * @param system - The system to search for.
 * @returns The first resource in the input array that matches the specified code and system, or undefined if no such resource is found.
 */
export declare function findResourceByCode(resources: ResourceWithCode[], code: CodeableConcept | string, system: string): ResourceWithCode | undefined;
export declare function arrayify<T>(value: NonNullable<T> | NonNullable<T>[]): T[];
export declare function arrayify<T>(value: T | T[] | undefined): T[] | undefined;
export declare function singularize<T>(value: T | T[] | undefined): T | undefined;
/**
 * Sleeps for the specified number of milliseconds.
 * @param ms - Time delay in milliseconds
 * @returns A promise that resolves after the specified number of milliseconds.
 */
export declare const sleep: (ms: number) => Promise<void>;
/**
 * Splits a string into an array of strings using the specified delimiter.
 * Unlike the built-in split function, this function will split the string into a maximum of exactly n parts.
 * Trailing empty strings are included in the result.
 * @param str - The string to split.
 * @param delim - The delimiter.
 * @param n - The maximum number of parts to split the string into.
 * @returns The resulting array of strings.
 */
export declare function splitN(str: string, delim: string, n: number): string[];
/**
 * Memoizes the result of a parameterless function
 * @param fn - The function to be wrapped
 * @returns The result of the first invocation of the wrapped function
 */
export declare function lazy<T>(fn: () => T): () => T;
export declare function append<T>(array: T[] | undefined, value: T): T[];
/**
 * Sorts an array of strings in place using the localeCompare method.
 *
 * This method will mutate the input array.
 *
 * @param array - The array of strings to sort.
 * @returns The sorted array of strings.
 */
export declare function sortStringArray(array: string[]): string[];
/**
 * Ensures the given URL has a trailing slash.
 * @param url - The URL to ensure has a trailing slash.
 * @returns The URL with a trailing slash.
 */
export declare function ensureTrailingSlash(url: string): string;
/**
 * Ensures the given URL has no leading slash.
 * @param url - The URL to ensure has no leading slash.
 * @returns The URL string with no slash.
 */
export declare function ensureNoLeadingSlash(url: string): string;
/**
 * Concatenates the given base URL and URL.
 *
 * If the URL is absolute, it is returned as-is.
 *
 * @param baseUrl - The base URL.
 * @param path - The URL to concat. Can be relative or absolute.
 * @returns The concatenated URL.
 */
export declare function concatUrls(baseUrl: string | URL, path: string): string;
/**
 * Concatenates a given base URL and path, ensuring the URL has the appropriate `ws://` or `wss://` protocol instead of `http://` or `https://`.
 *
 * @param baseUrl - The base URL.
 * @param path - The URL to concat. Can be relative or absolute.
 * @returns The concatenated WebSocket URL.
 */
export declare function getWebSocketUrl(baseUrl: URL | string, path: string): string;
/**
 * Converts the given `query` to a string.
 *
 * @param query - The query to convert. The type can be any member of `QueryTypes`.
 * @returns The query as a string.
 */
export declare function getQueryString(query: QueryTypes): string;
export declare const VALID_HOSTNAME_REGEX: RegExp;
/**
 * Tests whether a given input is a valid hostname.
 *
 * __NOTE: Does not validate that the input is a valid domain name, only a valid hostname.__
 *
 * @param input - The input to test.
 * @returns True if `input` is a valid hostname, otherwise returns false.
 *
 * ### Valid matches:
 * - foo
 * - foo.com
 * - foo.bar.com
 * - foo.org
 * - foo.bar.co.uk
 * - localhost
 * - LOCALHOST
 * - foo-bar-baz
 * - foo_bar
 * - foobar123
 *
 * ### Invalid matches:
 * - foo.com/bar
 * - https://foo.com
 * - foo_-bar_-
 * - foo | rm -rf /
 */
export declare function isValidHostname(input: string): boolean;
/**
 * Adds the supplied profileUrl to the resource.meta.profile if it is not already
 * specified
 * @param resource - A FHIR resource
 * @param profileUrl - The profile URL to add
 * @returns The resource
 */
export declare function addProfileToResource<T extends Resource = Resource>(resource: T, profileUrl: string): T;
/**
 * Returns a Map of resources from a bundle, using the specified identifier system as the key.
 * @param resourceBundle - The bundle of resources.
 * @param identifierSystem - The identifier system to use for keys.
 * @returns Map of resources keyed by identifier value for the specified system.
 */
export declare function mapByIdentifier<T extends Resource = Resource>(resourceBundle: Bundle<T>, identifierSystem: string): Map<string, T>;
/**
 * Removes the supplied profileUrl from the resource.meta.profile if it is present
 * @param resource - A FHIR resource
 * @param profileUrl - The profile URL to remove
 * @returns The resource
 */
export declare function removeProfileFromResource<T extends Resource = Resource>(resource: T, profileUrl: string): T;
export declare function flatMapFilter<T, U>(arr: T[] | undefined, fn: (value: T, idx: number) => U | U[] | undefined): U[];
/**
 * Returns the escaped HTML string of the input string.
 * @param unsafe - The unsafe HTML string to escape.
 * @returns The escaped HTML string.
 */
export declare function escapeHtml(unsafe: string): string;
//# sourceMappingURL=utils.d.ts.map