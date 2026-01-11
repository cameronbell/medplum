import type { OperationOutcomeIssue, Resource, StructureDefinition } from '@medplum/fhirtypes';
import type { TypedValue } from '../types';
import type { TypedValueWithPath } from './crawler';
import type { InternalSchemaElement, SliceDefinition, SliceDiscriminator } from './types';
export declare const fhirTypeToJsType: {
    readonly base64Binary: "string";
    readonly boolean: "boolean";
    readonly canonical: "string";
    readonly code: "string";
    readonly date: "string";
    readonly dateTime: "string";
    readonly decimal: "number";
    readonly id: "string";
    readonly instant: "string";
    readonly integer: "number";
    readonly integer64: "string";
    readonly markdown: "string";
    readonly oid: "string";
    readonly positiveInt: "number";
    readonly string: "string";
    readonly time: "string";
    readonly unsignedInt: "number";
    readonly uri: "string";
    readonly url: "string";
    readonly uuid: "string";
    readonly xhtml: "string";
    readonly 'http://hl7.org/fhirpath/System.String': "string";
};
/**
 * Returns true if the type code is a primitive type.
 * @param code - The type code to check.
 * @returns True if the type code is a primitive type.
 */
export declare function isPrimitiveType(code: string): boolean;
export declare const validationRegexes: Record<string, RegExp>;
export interface ValidatorOptions {
    profile?: StructureDefinition;
    collect?: {
        tokens?: Record<string, TypedValueWithPath[]>;
    };
}
export declare function validateResource(resource: Resource, options?: ValidatorOptions): OperationOutcomeIssue[];
export declare function validateTypedValue(typedValue: TypedValue, options?: ValidatorOptions): OperationOutcomeIssue[];
export declare function matchDiscriminant(value: TypedValue | TypedValue[] | undefined, discriminator: SliceDiscriminator, slice: SliceDefinition, elements?: Record<string, InternalSchemaElement>): boolean;
//# sourceMappingURL=validation.d.ts.map