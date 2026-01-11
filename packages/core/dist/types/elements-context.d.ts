import type { AccessPolicyResource } from '@medplum/fhirtypes';
import type { InternalSchemaElement } from './typeschema/types';
export interface ExtendedInternalSchemaElement extends InternalSchemaElement {
    readonly?: boolean;
}
export type ExtendedElementProperties = {
    readonly: boolean;
    hidden: boolean;
};
/**
 * Information for the set of elements at a given path within in a resource. This mostly exists to
 * normalize access to elements regardless of whether they are from a profile, extension, or slice.
 */
export type ElementsContextType = {
    /** The FHIR path from the root resource to which the keys of `elements` are relative. */
    path: string;
    /**
     * The mapping of keys to `ExtendedInternalSchemaElement` at the current `path` relative to the
     * root resource. `elements` originate from either `InternalTypeSchema.elements` or
     * `SliceDefinition.elements` when the elements context is created within a slice.
     */
    elements: Record<string, ExtendedInternalSchemaElement>;
    /**
     * Similar mapping as `elements`, but with keys being the full path from the root resource rather
     * than relative to `path`, in other words, the keys of the Record are `${path}.${key}`.
     */
    elementsByPath: Record<string, ExtendedInternalSchemaElement>;
    /** The URL, if any, of the resource profile or extension from which the `elements` collection originated. */
    profileUrl: string | undefined;
    /** Whether debug logging is enabled */
    debugMode: boolean;
    /** The `AccessPolicyResource` provided, if any, used to determine hidden and readonly elements. */
    accessPolicyResource?: AccessPolicyResource;
    /**
     * Used to get an `ExtendedElementProperties` object for an element at a given path. This
     * is primarily useful when working with elements not included in `InternalTypeSchema.elements`
     * as is the case for nested elements that have not been modified by a profile or extension,
     * e.g. Patient.name.family.
     *
     * This function does not attempt to determine if the input `path` is actually an element in the
     * resource. When a syntactically correct path to a nonexistent element, e.g. Patient.foobar, is provided,
     * a `ExtendedElementProperties` object with default values is returned.
     *
     * @param path - The full path to an element in the resource, e.g. Patient.name.family
     * @returns An `ExtendedElementProperties` object with `readonly` and `hidden` properties for the
     * element at `path`, or `undefined` if the input path is malformed.
     */
    getExtendedProps(path: string): ExtendedElementProperties | undefined;
    /** `true` if this is a default/placeholder `ElementsContextType` */
    isDefaultContext?: boolean;
};
export declare function buildElementsContext({ parentContext, path, elements, profileUrl, debugMode, accessPolicyResource, }: {
    /** The most recent `ElementsContextType` in which this context is being built. */
    parentContext: ElementsContextType | undefined;
    /** The FHIR path from the root resource to which the keys of `elements` are relative. */
    path: string;
    /**
     * The mapping of keys to `InternalSchemaElement` at the current `path` relative to the
     * root resource. This should be either `InternalTypeSchema.elements` or `SliceDefinition.elements`.
     */
    elements: Record<string, InternalSchemaElement>;
    /** The URL, if any, of the resource profile or extension from which the `elements` collection originated. */
    profileUrl?: string;
    /** Whether debug logging is enabled */
    debugMode?: boolean;
    accessPolicyResource?: AccessPolicyResource;
}): ElementsContextType | undefined;
//# sourceMappingURL=elements-context.d.ts.map