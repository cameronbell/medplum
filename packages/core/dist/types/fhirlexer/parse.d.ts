import type { TypedValue } from '../types';
import type { Token } from './tokenize';
export interface AtomContext {
    parent?: AtomContext;
    variables: Record<string, TypedValue>;
}
export interface Atom {
    eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
export declare abstract class PrefixOperatorAtom implements Atom {
    readonly operator: string;
    readonly child: Atom;
    constructor(operator: string, child: Atom);
    abstract eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
export declare abstract class InfixOperatorAtom implements Atom {
    readonly operator: string;
    readonly left: Atom;
    readonly right: Atom;
    constructor(operator: string, left: Atom, right: Atom);
    abstract eval(context: AtomContext, input: TypedValue[]): TypedValue[];
    toString(): string;
}
export interface PrefixParselet {
    parse(parser: Parser, token: Token): Atom;
}
export interface InfixParselet {
    precedence: number;
    parse?(parser: Parser, left: Atom, token: Token): Atom;
}
export declare class ParserBuilder {
    private readonly prefixParselets;
    private readonly infixParselets;
    registerInfix(tokenType: string, parselet: InfixParselet): this;
    registerPrefix(tokenType: string, parselet: PrefixParselet): this;
    prefix(tokenType: string, precedence: number, builder: (token: Token, right: Atom) => Atom): this;
    infixLeft(tokenType: string, precedence: number, builder: (left: Atom, token: Token, right: Atom) => Atom): this;
    construct(input: Token[]): Parser;
}
export declare class Parser {
    private tokens;
    private readonly prefixParselets;
    private readonly infixParselets;
    constructor(tokens: Token[], prefixParselets: Record<string, PrefixParselet>, infixParselets: Record<string, InfixParselet>);
    hasMore(): boolean;
    match(expected: string): boolean;
    consumeAndParse(precedence?: number): Atom;
    getPrecedence(): number;
    consume(expectedId?: string, expectedValue?: string): Token;
    peek(): Token | undefined;
    removeComments(): void;
    getInfixParselet(token: Token): InfixParselet | undefined;
}
//# sourceMappingURL=parse.d.ts.map