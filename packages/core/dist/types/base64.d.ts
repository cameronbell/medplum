/**
 * Decodes a base64 string.
 * Handles both browser and Node environments.
 * Supports Unicode characters.
 * @param data - The base-64 encoded input string.
 * @returns The decoded string.
 */
export declare function decodeBase64(data: string): string;
/**
 * Encodes a base64 string.
 * Handles both browser and Node environments.
 * Supports Unicode characters.
 * @param data - The unencoded input string.
 * @returns The base-64 encoded string.
 */
export declare function encodeBase64(data: string): string;
/**
 * Encodes a string into Base64URL format.
 * This is the encoding required for JWT parts.
 * @param data - The unencoded input string.
 * @returns The Base64URL encoded string.
 */
export declare function encodeBase64Url(data: string): string;
/**
 * Decodes a string from Base64URL format.
 * @param data - The Base64URL encoded input string.
 * @returns The decoded string.
 */
export declare function decodeBase64Url(data: string): string;
//# sourceMappingURL=base64.d.ts.map