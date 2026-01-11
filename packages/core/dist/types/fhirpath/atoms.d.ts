import type { Atom, AtomContext } from '../fhirlexer/parse';
import { InfixOperatorAtom, PrefixOperatorAtom } from '../fhirlexer/parse';
import type { TypedValue } from '../types';
export declare class FhirPathAtom implements Atom {
    readonly original: string;
    readonly child: Atom;
    constructor(original: string, child: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
export declare class LiteralAtom implements Atom {
    readonly value: TypedValue;
    constructor(value: TypedValue);
    eval(): TypedValue[];
    toString(): string;
}
export declare class SymbolAtom implements Atom {
    readonly name: string;
    constructor(name: string);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    private getVariable;
    private evalValue;
    toString(): string;
}
export declare class EmptySetAtom implements Atom {
    eval(): [];
    toString(): string;
}
export declare class UnaryOperatorAtom extends PrefixOperatorAtom {
    readonly impl: (x: TypedValue[]) => TypedValue[];
    constructor(operator: string, child: Atom, impl: (x: TypedValue[]) => TypedValue[]);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
export declare class AsAtom extends InfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare abstract class BooleanInfixOperatorAtom extends InfixOperatorAtom {
    abstract eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class ArithemticOperatorAtom extends BooleanInfixOperatorAtom {
    readonly impl: (x: number, y: number) => number | boolean;
    constructor(operator: string, left: Atom, right: Atom, impl: (x: number, y: number) => number | boolean);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class ConcatAtom extends InfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class ContainsAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class InAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class DotAtom extends InfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
export declare class UnionAtom extends InfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class EqualsAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class NotEqualsAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class EquivalentAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class NotEquivalentAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class IsAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
/**
 * 6.5.1. and
 * Returns true if both operands evaluate to true,
 * false if either operand evaluates to false,
 * and the empty collection otherwise.
 */
export declare class AndAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
/**
 * 6.5.2. or
 * Returns false if both operands evaluate to false,
 * true if either operand evaluates to true,
 * and empty (`{ }`) otherwise:
 */
export declare class OrAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
/**
 * 6.5.4. xor
 * Returns true if exactly one of the operands evaluates to true,
 * false if either both operands evaluate to true or both operands evaluate to false,
 * and the empty collection otherwise.
 */
export declare class XorAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
/**
 * 6.5.5. implies
 * Returns true if left is true and right is true,
 * true left is false and right true, false or empty
 * true left is empty
 */
export declare class ImpliesAtom extends BooleanInfixOperatorAtom {
    constructor(left: Atom, right: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
}
export declare class FunctionAtom implements Atom {
    readonly name: string;
    readonly args: Atom[];
    constructor(name: string, args: Atom[]);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
export declare class IndexerAtom implements Atom {
    readonly left: Atom;
    readonly expr: Atom;
    constructor(left: Atom, expr: Atom);
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
//# sourceMappingURL=atoms.d.ts.map