import type { InternalSchemaElement, InternalTypeSchema } from './typeschema/types';
export type BaseSchema = Record<string, {
    elements: Record<string, Partial<InternalSchemaElement>>;
}>;
export declare function compressElement(element: InternalSchemaElement): Partial<InternalSchemaElement>;
export declare function inflateElement(path: string, partial: Partial<InternalSchemaElement>): InternalSchemaElement;
export type DataTypesMap = {
    [type: string]: InternalTypeSchema;
};
export declare function inflateBaseSchema(base: BaseSchema): DataTypesMap;
//# sourceMappingURL=base-schema-utils.d.ts.map