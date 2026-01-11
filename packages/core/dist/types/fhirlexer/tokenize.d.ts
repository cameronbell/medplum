export interface Marker {
    index: number;
    line: number;
    column: number;
}
export interface Token extends Marker {
    id: string;
    value: string;
}
export interface TokenizerOptions {
    dateTimeLiterals?: boolean;
    symbolRegex?: RegExp;
}
export declare class Tokenizer {
    private readonly str;
    private readonly keywords;
    private readonly operators;
    private readonly dateTimeLiterals;
    private readonly symbolRegex;
    private readonly result;
    private readonly pos;
    private readonly markStack;
    constructor(str: string, keywords: string[], operators: string[], options?: TokenizerOptions);
    tokenize(): Token[];
    private prevToken;
    private peekToken;
    private consumeToken;
    private consumeWhitespace;
    private consumeMultiLineComment;
    private consumeSingleLineComment;
    private consumeString;
    private consumeChar;
    private consumeQuotedSymbol;
    private consumeDateTime;
    private consumeNumber;
    private consumeSymbol;
    private consumeOperator;
    private consumeWhile;
    private curr;
    private peek;
    private mark;
    private reset;
    private advance;
    private buildToken;
}
//# sourceMappingURL=tokenize.d.ts.map