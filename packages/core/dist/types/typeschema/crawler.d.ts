import type { GetTypedPropertyValueOptions } from '../fhirpath/utils';
import type { TypedValue } from '../types';
import type { InternalTypeSchema } from './types';
export interface CrawlerVisitor {
    onEnterObject?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => void;
    onExitObject?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => void;
    onEnterResource?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => void;
    onExitResource?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => void;
    visitProperty: (parent: TypedValueWithPath, key: string, path: string, propertyValues: (TypedValueWithPath | TypedValueWithPath[])[], schema: InternalTypeSchema) => void;
}
export interface AsyncCrawlerVisitor {
    onEnterObject?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => Promise<void>;
    onExitObject?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => Promise<void>;
    onEnterResource?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => Promise<void>;
    onExitResource?: (path: string, value: TypedValueWithPath, schema: InternalTypeSchema) => Promise<void>;
    visitPropertyAsync: (parent: TypedValueWithPath, key: string, path: string, value: TypedValueWithPath | TypedValueWithPath[], schema: InternalTypeSchema) => Promise<void>;
}
export interface CrawlerOptions {
    skipMissingProperties?: boolean;
    schema?: InternalTypeSchema;
    initialPath?: string;
}
/**
 * Crawls the typed value synchronously.
 * @param typedValue - The typed value to crawl.
 * @param visitor - The visitor functions to apply while crawling.
 * @param options - Options for how to crawl the typed value.
 */
export declare function crawlTypedValue(typedValue: TypedValue, visitor: CrawlerVisitor, options?: CrawlerOptions): void;
/**
 * Crawls the typed value asynchronously.
 * @param typedValue - The typed value to crawl.
 * @param visitor - The visitor functions to apply while crawling.
 * @param options - Options for how to crawl the typed value.
 * @returns Promise to crawl the typed value.
 */
export declare function crawlTypedValueAsync(typedValue: TypedValue, visitor: AsyncCrawlerVisitor, options?: CrawlerOptions): Promise<void>;
export declare function getNestedProperty(value: TypedValueWithPath | undefined, key: string, options: {
    profileUrl?: string;
    withPath: true;
}): (TypedValueWithPath | TypedValueWithPath[])[];
export declare function getNestedProperty(value: TypedValue | undefined, key: string, options?: {
    profileUrl?: string;
    withPath?: false;
}): (TypedValue | TypedValue[] | undefined)[];
export declare function getTypedPropertyValueWithPath(input: TypedValue | TypedValueWithPath, path: string, options?: GetTypedPropertyValueOptions): TypedValueWithPath[] | TypedValueWithPath;
export type TypedValueWithPath = TypedValue & {
    path: string;
};
/**
 * Translates a path emitted by this crawler into an RFC6902 JSON Patch pointer
 *
 * @param path - A path emitted from a Crawler
 * @returns pointer -An RFC6902 pointer describing the path
 */
export declare function pathToJSONPointer(path: string): string;
//# sourceMappingURL=crawler.d.ts.map