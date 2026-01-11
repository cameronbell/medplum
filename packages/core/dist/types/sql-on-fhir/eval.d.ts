import type { Resource, ViewDefinition, ViewDefinitionSelect } from '@medplum/fhirtypes';
/**
 * Represents a "selection structure" in the SQL-on-FHIR specification.
 *
 * In practice, this can be a ViewDefinition or ViewDefinitionSelect.
 *
 * TypeScript does not like checks for properties that are not part of the type, so we use this interface instead.
 */
export interface SelectionStructure {
    forEach?: string;
    forEachOrNull?: string;
    column?: ViewDefinitionSelect['column'];
    select?: SelectionStructure[];
    unionAll?: SelectionStructure[];
}
/**
 * SQL on FHIR output row.
 */
export type OutputRow = Record<string, any>;
/**
 * Evaluates a SQL-on-FHIR view on a set of FHIR resources.
 * @param view - The view definition.
 * @param resources - The array of FHIR resources.
 * @returns The output rows.
 */
export declare function evalSqlOnFhir(view: ViewDefinition, resources: Resource[]): OutputRow[];
//# sourceMappingURL=eval.d.ts.map