import type { Operator } from '../search/search';
/**
 * The FhirFilterExpression type is the base type of all filter expressions.
 */
export type FhirFilterExpression = FhirFilterComparison | FhirFilterNegation | FhirFilterConnective;
/**
 * The FhirFilterComparison class represents a comparison expression.
 */
export declare class FhirFilterComparison {
    readonly path: string;
    readonly operator: Operator;
    readonly value: string;
    constructor(path: string, operator: Operator, value: string);
}
/**
 * The FhirFilterNegation class represents a negation expression.
 * It contains a single child expression.
 */
export declare class FhirFilterNegation {
    readonly child: FhirFilterExpression;
    constructor(child: FhirFilterExpression);
}
/**
 * The FhirFilterConnective class represents a connective expression.
 * It contains a list of child expressions.
 */
export declare class FhirFilterConnective {
    readonly keyword: 'and' | 'or';
    readonly left: FhirFilterExpression;
    readonly right: FhirFilterExpression;
    constructor(keyword: 'and' | 'or', left: FhirFilterExpression, right: FhirFilterExpression);
}
//# sourceMappingURL=types.d.ts.map