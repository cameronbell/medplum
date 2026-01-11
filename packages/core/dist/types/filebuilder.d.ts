export declare class FileBuilder {
    private readonly indent;
    private readonly b;
    indentCount: number;
    constructor(indent?: string, header?: boolean);
    newLine(): void;
    appendNoWrap(line: string): void;
    append(line: string): void;
    toString(): string;
}
/**
 * Returns a word-wrapped string.
 * Based on: https://stackoverflow.com/a/38709683
 * @param text - Original input string.
 * @param maxLength - Width in number of characters.
 * @returns Array of lines.
 */
export declare function wordWrap(text: string, maxLength: number): string[];
//# sourceMappingURL=filebuilder.d.ts.map