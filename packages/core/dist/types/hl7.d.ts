export declare const AckCode: {
    /** AA - Application Accept */
    readonly AA: "AA";
    /** AE - Application Error */
    readonly AE: "AE";
    /** AR - Application Reject */
    readonly AR: "AR";
    /** CA - Commit Accept */
    readonly CA: "CA";
    /** CE - Commit Error */
    readonly CE: "CE";
    /** CR - Commit Reject */
    readonly CR: "CR";
};
export type AckCode = keyof typeof AckCode;
export interface Hl7AckOptions {
    ackCode: AckCode;
    errSegment?: Hl7Segment;
}
/**
 * The Hl7Context class represents the parsing context for an HL7 message.
 *
 * @see MSH-1: https://hl7-definition.caristix.com/v2/HL7v2.6/Fields/MSH.1
 * @see MSH-2: https://hl7-definition.caristix.com/v2/HL7v2.6/Fields/MSH.2
 * @see See this tutorial on MSH, and why it's a bad idea to use anything other than the default values: https://www.hl7soup.com/HL7TutorialMSH.html
 */
export declare class Hl7Context {
    readonly segmentSeparator: string;
    readonly fieldSeparator: string;
    readonly componentSeparator: string;
    readonly repetitionSeparator: string;
    readonly escapeCharacter: string;
    readonly subcomponentSeparator: string;
    constructor(segmentSeparator?: string, fieldSeparator?: string, componentSeparator?: string, repetitionSeparator?: string, escapeCharacter?: string, subcomponentSeparator?: string);
    /**
     * Returns the MSH-1 field value based on the configured separators.
     * @returns The HL7 MSH-1 field value.
     */
    getMsh1(): string;
    /**
     * Returns the MSH-2 field value based on the configured separators.
     * @returns The HL7 MSH-2 field value.
     */
    getMsh2(): string;
}
/**
 * The Hl7Message class represents one HL7 message.
 * A message is a collection of segments.
 */
export declare class Hl7Message {
    readonly context: Hl7Context;
    readonly segments: Hl7Segment[];
    /**
     * Creates a new HL7 message.
     * @param segments - The HL7 segments.
     * @param context - Optional HL7 parsing context.
     */
    constructor(segments: Hl7Segment[], context?: Hl7Context);
    /**
     * Returns the HL7 message header.
     * @returns The HL7 message header.
     */
    get header(): Hl7Segment;
    /**
     * Returns an HL7 segment by index or by name.
     * @param index - The HL7 segment index or name.
     * @returns The HL7 segment if found; otherwise, undefined.
     * @deprecated Use getSegment() instead. This method will be removed in a future release.
     */
    get(index: number | string): Hl7Segment | undefined;
    /**
     * Returns all HL7 segments of a given name.
     * @param name - The HL7 segment name.
     * @returns An array of HL7 segments with the specified name.
     * @deprecated Use getAllSegments() instead. This method will be removed in a future release.
     */
    getAll(name: string): Hl7Segment[];
    /**
     * Returns an HL7 segment by index or by name.
     *
     * When using a numeric index, the first segment (usually the MSH header segment) is at index 0.
     *
     * When using a string index, this method returns the first segment with the specified name.
     *
     * @param index - The HL7 segment index or name.
     * @returns The HL7 segment if found; otherwise, undefined.
     */
    getSegment(index: number | string): Hl7Segment | undefined;
    /**
     * Returns all HL7 segments of a given name.
     * @param name - The HL7 segment name.
     * @returns An array of HL7 segments with the specified name.
     */
    getAllSegments(name: string): Hl7Segment[];
    /**
     * Returns the HL7 message as a string.
     * @returns The HL7 message as a string.
     */
    toString(): string;
    /**
     * Returns an HL7 "ACK" (acknowledgement) message for this message.
     * @param options - The optional options to configure the "ACK" message.
     * @returns The HL7 "ACK" message.
     */
    buildAck(options?: Hl7AckOptions): Hl7Message;
    private buildAckMessageType;
    /**
     * Parses an HL7 message string into an Hl7Message object.
     * @param text - The HL7 message text.
     * @returns The parsed HL7 message.
     */
    static parse(text: string): Hl7Message;
    /**
     * Sets or replaces a segment at the specified index.
     * Only allows MSH header to be replaced as first segment.
     * If index is a number and is larger than the length of the segments array, it will be appended as the last segment.
     * If the index is a string, replaces the first segment with that name.
     * @param index - The segment index or name
     * @param segment - The new segment to set
     * @returns true if the segment was set, false otherwise
     */
    setSegment(index: number | string, segment: Hl7Segment): boolean;
}
/**
 * The Hl7Segment class represents one HL7 segment.
 * A segment is a collection of fields.
 * The name field is the first field.
 */
export declare class Hl7Segment {
    readonly context: Hl7Context;
    readonly name: string;
    readonly fields: Hl7Field[];
    /**
     * Creates a new HL7 segment.
     * @param fields - The HL7 fields. The first field is the segment name.
     * @param context - Optional HL7 parsing context.
     */
    constructor(fields: Hl7Field[] | string[], context?: Hl7Context);
    /**
     * Returns an HL7 field by index.
     * @param index - The HL7 field index.
     * @returns The HL7 field.
     * @deprecated Use getField() instead. This method includes the segment name in the index, which leads to confusing behavior. This method will be removed in a future release.
     */
    get(index: number): Hl7Field;
    /**
     * Returns an HL7 field by index.
     *
     * Note that the index is 1-based, not 0-based.
     *
     * For example, to get the first field, use `getField(1)`.
     *
     * This aligns with HL7 field names such as PID.1, PID.2, etc.
     *
     * Field zero is the segment name.
     *
     * @param index - The HL7 field index.
     * @returns The HL7 field.
     */
    getField(index: number): Hl7Field;
    /**
     * Returns an HL7 component by field index and component index.
     *
     * This is a shortcut for `getField(field).getComponent(component)`.
     *
     * Note that both indexex are 1-based, not 0-based.
     *
     * For example, to get the first component, use `getComponent(1, 1)`.
     *
     * This aligns with HL7 component names such as MSH.9.2.
     *
     * @param fieldIndex - The HL7 field index.
     * @param component - The component index.
     * @param subcomponent - Optional subcomponent index.
     * @param repetition - Optional repetition index.
     * @returns The string value of the specified component.
     */
    getComponent(fieldIndex: number, component: number, subcomponent?: number, repetition?: number): string;
    /**
     * Returns the HL7 segment as a string.
     * @returns The HL7 segment as a string.
     */
    toString(): string;
    /**
     * Parses an HL7 segment string into an Hl7Segment object.
     * @param text - The HL7 segment text.
     * @param context - Optional HL7 parsing context.
     * @returns The parsed HL7 segment.
     */
    static parse(text: string, context?: Hl7Context): Hl7Segment;
    /**
     * Sets a field at the specified index. If that index does not exist, it will be added.
     * Note that the index is 1-based, not 0-based.
     * @param index - The field index
     * @param field - The new field value
     * @returns true if the field was set, false otherwise
     */
    setField(index: number, field: Hl7Field | string): boolean;
    /**
     * Sets a component value by field index and component index.
     * This is a shortcut for `getField(field).setComponent(component, value)`.
     * Note that both indices are 1-based, not 0-based.
     * @param fieldIndex - The HL7 field index
     * @param component - The component index
     * @param value - The new component value
     * @param subcomponent - Optional subcomponent index
     * @param repetition - Optional repetition index
     * @returns true if the component was set, false otherwise
     */
    setComponent(fieldIndex: number, component: number, value: string, subcomponent?: number, repetition?: number): boolean;
}
/**
 * The Hl7Field class represents one HL7 field.
 * A field is a collection of components.
 */
export declare class Hl7Field {
    readonly context: Hl7Context;
    readonly components: string[][];
    /**
     * Creates a new HL7 field.
     * @param components - The HL7 components.
     * @param context - Optional HL7 parsing context.
     */
    constructor(components: string[][], context?: Hl7Context);
    /**
     * Returns an HL7 component by index.
     * @param component - The component index.
     * @param subcomponent - Optional subcomponent index.
     * @param repetition - Optional repetition index.
     * @returns The string value of the specified component.
     * @deprecated Use getComponent() instead. This method will be removed in a future release.
     */
    get(component: number, subcomponent?: number, repetition?: number): string;
    /**
     * Returns an HL7 component by index.
     *
     * Note that the index is 1-based, not 0-based.
     *
     * For example, to get the first component, use `getComponent(1)`.
     *
     * This aligns with HL7 component names such as MSH.9.2.
     *
     * @param component - The component index.
     * @param subcomponent - Optional subcomponent index.
     * @param repetition - Optional repetition index.
     * @returns The string value of the specified component.
     */
    getComponent(component: number, subcomponent?: number, repetition?: number): string;
    /**
     * Returns the HL7 field as a string.
     * @returns The HL7 field as a string.
     */
    toString(): string;
    /**
     * Parses an HL7 field string into an Hl7Field object.
     * @param text - The HL7 field text.
     * @param context - Optional HL7 parsing context.
     * @returns The parsed HL7 field.
     */
    static parse(text: string, context?: Hl7Context): Hl7Field;
    /**
     * Sets a component value at the specified indices.
     * Note that the indices are 1-based, not 0-based.
     * @param component - The component index
     * @param value - The new component value
     * @param subcomponent - Optional subcomponent index
     * @param repetition - Optional repetition index
     * @returns true if the component was set, false otherwise
     */
    setComponent(component: number, value: string, subcomponent?: number, repetition?: number): boolean;
}
export interface Hl7DateParseOptions {
    /**
     * Default timezone offset.
     * Example: "-0500"
     */
    tzOffset?: string;
}
/**
 * Returns a formatted string representing the date in ISO-8601 format.
 *
 * HL7-Definition V2
 * Specifies a point in time using a 24-hour clock notation.
 *
 * Format: YYYY[MM[DD[HH[MM[SS[. S[S[S[S]]]]]]]]][+/-ZZZZ].
 *
 * @param hl7DateTime - Date/time string.
 * @param options - Optional parsing options.
 * @returns The date in ISO-8601 format.
 */
export declare function parseHl7DateTime(hl7DateTime: string | undefined, options?: Hl7DateParseOptions): string | undefined;
/**
 * Formats an ISO date/time string into an HL7 date/time string.
 * @param isoDate - The ISO date/time string.
 * @returns The HL7 date/time string.
 */
export declare function formatHl7DateTime(isoDate: Date | string): string;
//# sourceMappingURL=hl7.d.ts.map