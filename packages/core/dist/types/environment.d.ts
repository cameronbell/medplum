/**
 * Environment detection utilities that can be mocked in tests.
 * These functions replace direct checks of global objects to avoid
 * the need to manipulate non-configurable globalThis.window in Jest/JSDOM 23+.
 */
/**
 * Returns true if running in a browser environment with window available.
 * @returns True if in browser environment.
 */
export declare function isBrowserEnvironment(): boolean;
/**
 * Returns true if running in Node.js environment with Buffer available.
 * @returns True if in Node.js environment.
 */
export declare function isNodeEnvironment(): boolean;
/**
 * Returns the global window object if available.
 * @returns The window object or undefined.
 */
export declare function getWindow(): Window | undefined;
/**
 * Returns the global Buffer constructor if available.
 * @returns The Buffer constructor or undefined.
 */
export declare function getBuffer(): typeof Buffer | undefined;
/**
 * Location utilities that can be mocked in tests.
 * These functions wrap location calls to avoid JSDOM 23+ restrictions.
 */
export declare const locationUtils: {
    assign(url: string): void;
    reload(): void;
    getSearch(): string;
    getPathname(): string;
    getLocation(): string;
    getOrigin(): string;
};
//# sourceMappingURL=environment.d.ts.map