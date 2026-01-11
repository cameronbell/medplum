import type { InternalTypeSchema, SliceDefinition, SliceDiscriminator } from './types';
export type SliceDefinitionWithTypes = SliceDefinition & {
    type: NonNullable<SliceDefinition['type']>;
    typeSchema?: InternalTypeSchema;
};
export declare function isSliceDefinitionWithTypes(slice: SliceDefinition): slice is SliceDefinitionWithTypes;
export declare function getValueSliceName(value: any, slices: SliceDefinitionWithTypes[], discriminators: SliceDiscriminator[], profileUrl: string | undefined): string | undefined;
//# sourceMappingURL=slices.d.ts.map