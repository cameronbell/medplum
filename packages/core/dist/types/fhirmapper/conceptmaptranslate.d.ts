import type { CodeableConcept, Coding, ConceptMap } from '@medplum/fhirtypes';
import type { TypedValue } from '../types';
export interface ConceptMapTranslateParameters {
    url?: string;
    source?: string;
    code?: string;
    system?: string;
    coding?: Coding;
    codeableConcept?: CodeableConcept;
    targetsystem?: string;
}
export interface ConceptMapTranslateMatch {
    equivalence?: string;
    concept?: Coding;
    property?: ConceptMapTranslateMatchAttribute[];
    dependsOn?: ConceptMapTranslateMatchAttribute[];
    product?: ConceptMapTranslateMatchAttribute[];
    source?: string;
}
export interface ConceptMapTranslateMatchAttribute {
    key: string;
    value: TypedValue;
}
export interface ConceptMapTranslateOutput {
    result: boolean;
    message?: string;
    match?: ConceptMapTranslateMatch[];
}
export declare function conceptMapTranslate(map: ConceptMap, params: ConceptMapTranslateParameters): ConceptMapTranslateOutput;
export declare function indexConceptMapCodings(params: ConceptMapTranslateParameters): Record<string, string[]>;
//# sourceMappingURL=conceptmaptranslate.d.ts.map