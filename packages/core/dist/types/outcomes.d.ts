import type { OperationOutcome, OperationOutcomeIssue } from '@medplum/fhirtypes';
import type { Constraint } from './typeschema/types';
export declare const allOk: OperationOutcome;
export declare const created: OperationOutcome;
export declare const notModified: OperationOutcome;
export declare const notFound: OperationOutcome;
export declare const unauthorized: OperationOutcome;
export declare const unauthorizedTokenExpired: OperationOutcome;
export declare const unauthorizedTokenAudience: OperationOutcome;
export declare const forbidden: OperationOutcome;
export declare const gone: OperationOutcome;
export declare const preconditionFailed: OperationOutcome;
export declare const unsupportedMediaType: OperationOutcome;
export declare const multipleMatches: OperationOutcome;
export declare const tooManyRequests: OperationOutcome;
export declare function accepted(location: string): OperationOutcome;
export declare function badRequest(details: string, expression?: string): OperationOutcome;
export declare function conflict(details: string, code?: string): OperationOutcome;
export declare function validationError(details: string): OperationOutcome;
export declare function serverError(err: Error): OperationOutcome;
export declare function serverTimeout(msg?: string): OperationOutcome;
export declare function redirect(url: URL): OperationOutcome;
export declare function businessRule(key: string, message: string): OperationOutcome;
/**
 * Returns true if the input is an Error object.
 * This should be replaced with `Error.isError` when it is more widely supported.
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError
 * @param value - The candidate value.
 * @returns True if the input is an Error object.
 */
export declare function isError(value: unknown): value is Error;
export declare function isOperationOutcome(value: unknown): value is OperationOutcome;
export declare function isOk(outcome: OperationOutcome): boolean;
export declare function isCreated(outcome: OperationOutcome): boolean;
export declare function isAccepted(outcome: OperationOutcome): boolean;
export declare function isRedirect(outcome: OperationOutcome): boolean;
export declare function isNotFound(outcome: OperationOutcome): boolean;
export declare function isConflict(outcome: OperationOutcome): boolean;
export declare function isGone(outcome: OperationOutcome): boolean;
export declare function isUnauthenticated(outcome: OperationOutcome): boolean;
export declare function getStatus(outcome: OperationOutcome): number;
/**
 * Asserts that the operation completed successfully and that the resource is defined.
 * @param outcome - The operation outcome.
 * @param resource - The resource that may or may not have been returned.
 */
export declare function assertOk<T>(outcome: OperationOutcome, resource: T | undefined): asserts resource is T;
export declare class OperationOutcomeError extends Error {
    readonly outcome: OperationOutcome;
    constructor(outcome: OperationOutcome, options?: ErrorOptions);
}
/**
 * Normalizes an error object into an OperationOutcome.
 * @param error - The error value which could be a string, Error, OperationOutcome, or other unknown type.
 * @returns The normalized OperationOutcome.
 */
export declare function normalizeOperationOutcome(error: unknown): OperationOutcome;
/**
 * Normalizes an error object into a displayable error string.
 * @param error - The error value which could be a string, Error, OperationOutcome, or other unknown type.
 * @returns A display string for the error.
 */
export declare function normalizeErrorString(error: unknown): string;
/**
 * Returns a string represenation of the operation outcome.
 * @param outcome - The operation outcome.
 * @returns The string representation of the operation outcome.
 */
export declare function operationOutcomeToString(outcome: OperationOutcome): string;
/**
 * Returns a string represenation of the operation outcome issue.
 * @param issue - The operation outcome issue.
 * @returns The string representation of the operation outcome issue.
 */
export declare function operationOutcomeIssueToString(issue: OperationOutcomeIssue): string;
export type IssueSeverity = 'error' | 'fatal' | 'warning' | 'information';
export type IssueType = 'structure' | 'invariant' | 'processing';
export declare function createOperationOutcomeIssue(severity: IssueSeverity, code: IssueType, message: string, path: string, data?: Record<string, any>): OperationOutcomeIssue;
export declare function createStructureIssue(expression: string, details: string): OperationOutcomeIssue;
export declare function createConstraintIssue(expression: string, constraint: Constraint): OperationOutcomeIssue;
export declare function createProcessingIssue(expression: string, message: string, err: Error, data?: Record<string, any>): OperationOutcomeIssue;
//# sourceMappingURL=outcomes.d.ts.map