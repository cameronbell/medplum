import type { ConceptMap, ExtractResource, ResourceType, StructureMap } from '@medplum/fhirtypes';
import type { TypedValue } from '../types';
/**
 * The TransformMapCollection class is a collection of StructureMap and ConceptMap resources.
 * It is used to store and retrieve imported StructureMaps and ConceptMaps by URL.
 */
export declare class TransformMapCollection {
    readonly resources: (StructureMap | ConceptMap)[];
    constructor(resources?: (StructureMap | ConceptMap)[]);
    get<K extends ResourceType>(resourceType: K, url: string): ExtractResource<K>[];
    private matchesUrl;
}
/**
 * Transforms input values using a FHIR StructureMap.
 *
 * See: https://www.hl7.org/fhir/mapping-language.html
 *
 * @param structureMap - The StructureMap to transform.
 * @param input - The input values.
 * @param transformMaps - Optional collection of imported StructureMaps and ConceptMaps.
 * @returns The transformed values.
 */
export declare function structureMapTransform(structureMap: StructureMap, input: TypedValue[], transformMaps?: TransformMapCollection): TypedValue[];
//# sourceMappingURL=transform.d.ts.map