/**
 * Returns a cryptographically secure random string.
 * @returns A cryptographically secure random string.
 */
export declare function getRandomString(): string;
/**
 * Encrypts a string with SHA256 encryption.
 * @param str - The unencrypted input string.
 * @returns The encrypted value in an ArrayBuffer.
 */
export declare function encryptSHA256(str: string): Promise<ArrayBuffer>;
/**
 * Cross platform random UUID generator
 * @returns A random UUID.
 */
export declare function generateId(): string;
//# sourceMappingURL=crypto.d.ts.map