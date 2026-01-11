import type { ElementsContextType } from './elements-context';
import type { SliceDefinitionWithTypes } from './typeschema/slices';
import type { InternalSchemaElement, InternalTypeSchema, SliceDefinition, SlicingRules } from './typeschema/types';
export type VisitorSlicingRules = Omit<SlicingRules, 'slices'> & {
    slices: SliceDefinitionWithTypes[];
};
export interface SchemaVisitor {
    /**
     * Called when entering a schema. This is called once for the root profile and once for each
     * extension with a profile associated with it.
     * @param schema - The schema being entered.
     */
    onEnterSchema?: (schema: InternalTypeSchema) => void;
    /**
     * Called when exiting a schema. See `onEnterSchema` for more information.
     * @param schema - The schema being exited.
     */
    onExitSchema?: (schema: InternalTypeSchema) => void;
    /**
     * Called when entering an element. This is called for every element in the schema in a
     * tree-like fashion. If the element has slices, the slices are crawled after `onEnterElement`
     * but before `onExitElement`.
     *
     * @example
     * Example of tree-like method invocation ordering:
     * '''typescript
     * onEnterElement('Patient.name')
     * onEnterElement('Patient.name.given')
     * onExitElement('Patient.name.given')
     * onEnterElement('Patient.name.family')
     * onExitElement('Patient.name.family')
     * onExitElement('Patient.name')
     * '''
     *
     *
     * @param path - The full path of the element being entered, even if within an extension. e.g The
     * path of the ombCategory extension within the US Core Race extension will be
     * 'Patient.extension.extension.value[x]' rather than 'Extension.extension.value[x]'. The latter is
     * accessible on the element parameter.
     * @param element - The element being entered.
     * @param elementsContext - The context of the elements currently being crawled.
     */
    onEnterElement?: (path: string, element: InternalSchemaElement, elementsContext: ElementsContextType) => void;
    /**
     * Called when exiting an element. See `onEnterElement` for more information.
     * @param path - The full path of the element being exited.
     * @param element - The element being exited.
     * @param elementsContext - The context of the elements currently being crawled.
     */
    onExitElement?: (path: string, element: InternalSchemaElement, elementsContext: ElementsContextType) => void;
    /**
     * Called when entering a slice. Called for every slice in a given sliced element. `onEnterElement` and `onExitElement`
     * will be called in a tree-like fashion for elements within the slice followed by `onExitSlice`.
     *
     * @example
     * Example of a sliced element being crawled with some elements excluded for brevity:
     * '''typescript
     * onEnterElement  ('Observation.component')
     *
     * // systolic
     * onEnterSlice    ('Observation.component', systolicSlice, slicingRules)
     * onEnterElement  ('Observation.component.code')
     * onExitElement   ('Observation.component.code')
     * onEnterElement  ('Observation.component.value[x]')
     * onEnterElement  ('Observation.component.value[x].code')
     * onExitElement   ('Observation.component.value[x].code')
     * onEnterElement  ('Observation.component.value[x].system')
     * onExitElement   ('Observation.component.value[x].system')
     * onExitElement   ('Observation.component.value[x]')
     * onExitSlice     ('Observation.component', systolicSlice, slicingRules)
     *
     * // similar set of invocations for diastolic slice
     *
     * onExitElement  ('Observation.component')
     * '''
     *
     * @param path - The full path of the sliced element being entered. See `onEnterElement` for more information.
     * @param slice - The slice being entered.
     * @param slicing - The slicing rules related to the slice being entered.
     */
    onEnterSlice?: (path: string, slice: SliceDefinitionWithTypes, slicing: VisitorSlicingRules) => void;
    /**
     * Called when exiting a slice. See `onEnterSlice` for more information.
     * @param path - The full path of the sliced element being exited. See `onEnterElement` for more information.
     * @param slice - The slice being exited.
     * @param slicing - The slicing rules related to the slice.
     */
    onExitSlice?: (path: string, slice: SliceDefinitionWithTypes, slicing: VisitorSlicingRules) => void;
}
export declare class SchemaCrawler {
    private readonly rootSchema;
    private readonly visitor;
    private readonly elementsContextStack;
    private sliceAllowList;
    constructor(schema: InternalTypeSchema, visitor: SchemaVisitor, elements?: InternalTypeSchema['elements']);
    private get elementsContext();
    crawlElement(element: InternalSchemaElement, key: string, path: string): void;
    crawlSlice(key: string, slice: SliceDefinition, slicing: SlicingRules): void;
    crawlResource(): void;
    private crawlElementsImpl;
    private crawlElementNode;
    private prepareSlices;
    private crawlSlicingImpl;
    private crawlSliceImpl;
}
//# sourceMappingURL=schema-crawler.d.ts.map