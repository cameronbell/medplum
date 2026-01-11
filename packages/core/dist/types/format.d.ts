import type { Address, CodeableConcept, Coding, HumanName, Money, Observation, ObservationComponent, Period, Quantity, Range, Reference, Timing } from '@medplum/fhirtypes';
import type { TypedValue } from './types';
export interface AddressFormatOptions {
    all?: boolean;
    use?: boolean;
    lineSeparator?: string;
}
export interface HumanNameFormatOptions {
    all?: boolean;
    prefix?: boolean;
    suffix?: boolean;
    use?: boolean;
}
/**
 * Converts a typed value to a string.
 * @param typedValue - The typed value to convert to a string.
 * @returns The string representation of the typed value.
 */
export declare function typedValueToString(typedValue: TypedValue | undefined): string;
/**
 * Formats a FHIR Reference as a string.
 * @param value - The reference to format.
 * @returns The formatted reference string.
 */
export declare function formatReferenceString(value: Reference | undefined): string;
/**
 * Formats a FHIR Address as a string.
 * @param address - The address to format.
 * @param options - Optional address format options.
 * @returns The formatted address string.
 */
export declare function formatAddress(address: Address | undefined, options?: AddressFormatOptions): string;
/**
 * Formats a FHIR HumanName as a string.
 * @param name - The name to format.
 * @param options - Optional name format options.
 * @returns The formatted name string.
 */
export declare function formatHumanName(name: HumanName | undefined, options?: HumanNameFormatOptions): string;
/**
 * Formats the given name portion of a FHIR HumanName element.
 * @param name - The name to format.
 * @returns The formatted given name string.
 */
export declare function formatGivenName(name: HumanName): string;
/**
 * Formats the family name portion of a FHIR HumanName element.
 * @param name - The name to format.
 * @returns The formatted family name string.
 */
export declare function formatFamilyName(name: HumanName): string;
/**
 * Returns true if the given date object is a valid date.
 * Dates can be invalid if created by parsing an invalid string.
 * @param date - A date object.
 * @returns Returns true if the date is a valid date.
 */
export declare function isValidDate(date: Date): boolean;
/**
 * Formats a FHIR date string as a human readable string.
 * Handles missing values and invalid dates.
 * @param date - The date to format.
 * @param locales - Optional locales.
 * @param options - Optional date format options.
 * @returns The formatted date string.
 */
export declare function formatDate(date: string | undefined, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
/**
 * Formats a FHIR time string as a human readable string.
 * Handles missing values and invalid dates.
 * @param time - The date to format.
 * @param locales - Optional locales.
 * @param options - Optional time format options.
 * @returns The formatted time string.
 */
export declare function formatTime(time: string | undefined, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
/**
 * Formats a FHIR time string as a human readable string.
 * The viewer's timezone does not affect the display.
 * @param time - The time to format, a string like `HH:mm` or `HH:mm:ss`
 * @param locales - Optional locales.
 * @param options - Optional time format options.
 * @returns The formatted time string.
 */
export declare function formatWallTime(time: string | undefined, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
/**
 * Formats a FHIR dateTime string as a human readable string.
 * Handles missing values and invalid dates.
 * @param dateTime - The dateTime to format.
 * @param locales - Optional locales.
 * @param options - Optional dateTime format options.
 * @returns The formatted dateTime string.
 */
export declare function formatDateTime(dateTime: string | undefined, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
/**
 * Formats a FHIR Period as a human readable string.
 * @param period - The period to format.
 * @param locales - Optional locales.
 * @param options - Optional period format options.
 * @returns The formatted period string.
 */
export declare function formatPeriod(period: Period | undefined, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;
/**
 * Formats a FHIR Timing as a human readable string.
 * @param timing - The timing to format.
 * @returns The formatted timing string.
 */
export declare function formatTiming(timing: Timing | undefined): string;
/**
 * Returns a human-readable string for a FHIR Range datatype, taking into account one-sided ranges
 * @param range - A FHIR Range element
 * @param precision - Number of decimal places to display in the rendered quantity values
 * @param exclusive - If true, one-sided ranges will be rendered with the `>` or `<` bounds rather than `>=` or `<=`
 * @returns A human-readable string representation of the Range
 */
export declare function formatRange(range: Range | undefined, precision?: number, exclusive?: boolean): string;
/**
 * Returns a human-readable string for a FHIR Quantity datatype, taking into account units and comparators
 * @param quantity - A FHIR Quantity element
 * @param precision - Number of decimal places to display in the rendered quantity values
 * @returns A human-readable string representation of the Quantity
 */
export declare function formatQuantity(quantity: Quantity | undefined, precision?: number): string;
export declare function formatMoney(money: Money | undefined): string;
/**
 * Formats a CodeableConcept element as a string.
 * @param codeableConcept - A FHIR CodeableConcept element
 * @returns The codeable concept as a string.
 */
export declare function formatCodeableConcept(codeableConcept: CodeableConcept | undefined): string;
/**
 * Formats a Coding element as a string.
 * @param coding - A FHIR Coding element
 * @param includeCode - If true, includes both the code and display if available
 * @returns The coding as a string.
 */
export declare function formatCoding(coding: Coding | undefined, includeCode?: boolean): string;
/**
 * Formats a FHIR Observation resource value as a string.
 * @param obs - A FHIR Observation resource.
 * @returns A human-readable string representation of the Observation.
 */
export declare function formatObservationValue(obs: Observation | ObservationComponent | undefined): string;
//# sourceMappingURL=format.d.ts.map