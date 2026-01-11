import type { MedplumClient } from './client';
export declare class MedplumKeyValueClient {
    readonly medplum: MedplumClient;
    constructor(medplum: MedplumClient);
    /**
     * Gets the value for the given key from the keyvalue store.
     * @param key - The key to get the value for.
     * @returns The value for the given key.
     */
    get(key: string): Promise<string | undefined>;
    /**
     * Sets the value for the given key in the keyvalue store.
     * @param key - The key to set the value for.
     * @param value - The value to set.
     */
    set(key: string, value: string): Promise<void>;
    /**
     * Deletes the value for the given key from the keyvalue store.
     * @param key - The key to delete the value for.
     */
    delete(key: string): Promise<void>;
}
//# sourceMappingURL=keyvalue.d.ts.map