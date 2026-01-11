import type { LRUCache } from '../cache';
import { ParserBuilder } from '../fhirlexer/parse';
import type { TypedValue } from '../types';
import type { TypedValueWithPath } from '../typeschema/crawler';
import { FhirPathAtom } from './atoms';
/**
 * Operator precedence
 * See: https://hl7.org/fhirpath/#operator-precedence
 */
export declare const OperatorPrecedence: {
    FunctionCall: number;
    Dot: number;
    Indexer: number;
    UnaryAdd: number;
    UnarySubtract: number;
    Multiply: number;
    Divide: number;
    IntegerDivide: number;
    Modulo: number;
    Add: number;
    Subtract: number;
    Ampersand: number;
    Is: number;
    As: number;
    Union: number;
    GreaterThan: number;
    GreaterThanOrEquals: number;
    LessThan: number;
    LessThanOrEquals: number;
    Equals: number;
    Equivalent: number;
    NotEquals: number;
    NotEquivalent: number;
    In: number;
    Contains: number;
    And: number;
    Xor: number;
    Or: number;
    Implies: number;
    Arrow: number;
    Semicolon: number;
};
export declare function initFhirPathParserBuilder(): ParserBuilder;
/**
 * Parses a FHIRPath expression into an AST.
 * The result can be used to evaluate the expression against a resource or other object.
 * This method is useful if you know that you will evaluate the same expression many times
 * against different resources.
 * @param input - The FHIRPath expression to parse.
 * @returns The AST representing the expression.
 */
export declare function parseFhirPath(input: string): FhirPathAtom;
/**
 * Evaluates a FHIRPath expression against a resource or other object.
 * @param expression - The FHIRPath expression to evaluate.
 * @param input - The resource or object to evaluate the expression against.
 * @returns The result of the FHIRPath expression against the resource or object.
 */
export declare function evalFhirPath(expression: string | FhirPathAtom, input: unknown): unknown[];
/**
 * Evaluates a FHIRPath expression against a resource or other object.
 * @param expression - The FHIRPath expression to evaluate.
 * @param input - The resource or object to evaluate the expression against.
 * @param variables - A map of variables for eval input.
 * @param cache - Cache for parsed ASTs.
 * @returns The result of the FHIRPath expression against the resource or object.
 */
export declare function evalFhirPathTyped(expression: string | FhirPathAtom, input: TypedValue[], variables?: Record<string, TypedValue>, cache?: LRUCache<FhirPathAtom> | undefined): (TypedValue | TypedValueWithPath)[];
//# sourceMappingURL=parse.d.ts.map