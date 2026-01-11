import type { Bundle, CodeableConcept, Observation, Quantity, SampledData } from '@medplum/fhirtypes';
export type StatsFn = (data: number[]) => number | Quantity;
export type QuantityUnit = Pick<Quantity, 'unit' | 'code' | 'system'>;
export type SamplingInfo = Omit<SampledData, 'data'>;
/**
 * Summarizes a group of Observations into a single computed summary value, with the individual values
 * preserved in `Observation.component.valueSampledData`.
 *
 * @param observations - The Observations to summarize.
 * @param summaryCode - The code for the summarized value.
 * @param summarizeFn - Function to summarize the data points.
 * @returns - The summary Observation resource.
 */
export declare function summarizeObservations(observations: Observation[] | Bundle<Observation>, summaryCode: CodeableConcept, summarizeFn: StatsFn): Observation;
export interface DataSampleOptions {
    /** Code for the data points. */
    code?: CodeableConcept;
    /** Unit for the data points. */
    unit?: QuantityUnit;
    /** Sampling information for high-frequency Observations. */
    sampling?: Omit<SampledData, 'data'>;
}
export declare class DataSampler {
    private code?;
    private unit?;
    private readonly sampling?;
    private readonly dataPoints;
    /**
     * @param opts - Optional parameters.
     */
    constructor(opts?: DataSampleOptions);
    addObservation(obs: Observation): void;
    addData(...data: number[]): void;
    private checkUnit;
    summarize(code: CodeableConcept, fn: StatsFn): Observation;
}
export declare function expandSampledData(sample: SampledData): number[];
export declare function expandSampledObservation(obs: Observation): Observation[];
//# sourceMappingURL=datasampler.d.ts.map