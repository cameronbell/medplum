/**
 * LRU cache (least recently used)
 * Source: https://stackoverflow.com/a/46432113
 */
export declare class LRUCache<T> {
    private readonly max;
    private readonly cache;
    constructor(max?: number);
    /**
     * Deletes all values from the cache.
     */
    clear(): void;
    /**
     * Returns the value for the given key.
     * @param key - The key to retrieve.
     * @returns The value if found; undefined otherwise.
     */
    get(key: string): T | undefined;
    /**
     * Sets the value for the given key.
     * @param key - The key to set.
     * @param val - The value to set.
     */
    set(key: string, val: T): void;
    /**
     * Deletes the value for the given key.
     * @param key - The key to delete.
     */
    delete(key: string): void;
    /**
     * Returns the list of all keys in the cache.
     * @returns The array of keys in the cache.
     */
    keys(): IterableIterator<string>;
    private first;
}
//# sourceMappingURL=cache.d.ts.map