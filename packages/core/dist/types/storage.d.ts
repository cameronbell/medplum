export interface IClientStorage {
    getInitPromise?(): Promise<void>;
    clear(): void;
    getString(key: string): string | undefined;
    setString(key: string, value: string | undefined): void;
    getObject<T>(key: string): T | undefined;
    setObject<T>(key: string, value: T): void;
    makeKey(key: string): string;
}
/**
 * The ClientStorage class is a utility class for storing strings and objects.
 *
 * When using MedplumClient in the browser, it will be backed by browser localStorage.
 *
 * When Using MedplumClient in the server, it will be backed by the MemoryStorage class.  For example, the Medplum CLI uses `FileSystemStorage`.
 */
export declare class ClientStorage implements IClientStorage {
    private readonly storage;
    private readonly prefix;
    constructor(storage?: Storage, prefix?: string);
    makeKey(key: string): string;
    clear(): void;
    getString(key: string): string | undefined;
    setString(key: string, value: string | undefined): void;
    getObject<T>(key: string): T | undefined;
    setObject<T>(key: string, value: T): void;
}
/**
 * The MemoryStorage class is a minimal in-memory implementation of the Storage interface.
 */
export declare class MemoryStorage implements Storage {
    private readonly data;
    constructor();
    /**
     * Returns the number of key/value pairs.
     * @returns The number of key/value pairs.
     */
    get length(): number;
    /**
     * Removes all key/value pairs, if there are any.
     */
    clear(): void;
    /**
     * Returns the current value associated with the given key, or null if the given key does not exist.
     * @param key - The specified storage key.
     * @returns The current value associated with the given key, or null if the given key does not exist.
     */
    getItem(key: string): string | null;
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     * @param key - The storage key.
     * @param value - The new value.
     */
    setItem(key: string, value: string | null): void;
    /**
     * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
     * @param key - The storage key.
     */
    removeItem(key: string): void;
    /**
     * Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.
     * @param index - The numeric index.
     * @returns The nth key.
     */
    key(index: number): string | null;
}
/**
 * The MockAsyncClientStorage class is a mock implementation of the ClientStorage class.
 * This can be used for testing async initialization of the MedplumClient.
 */
export declare class MockAsyncClientStorage extends ClientStorage implements IClientStorage {
    private initialized;
    private readonly initPromise;
    private initResolve;
    constructor();
    setInitialized(): void;
    getInitPromise(): Promise<void>;
    get isInitialized(): boolean;
}
//# sourceMappingURL=storage.d.ts.map