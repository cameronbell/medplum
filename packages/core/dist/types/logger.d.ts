/**
 * Logging level, with greater values representing more detailed logs emitted.
 *
 * The zero value means no server logs will be emitted.
 */
export declare const LogLevel: {
    NONE: number;
    ERROR: number;
    WARN: number;
    INFO: number;
    DEBUG: number;
};
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
export declare const LogLevelNames: readonly ["NONE", "ERROR", "WARN", "INFO", "DEBUG"];
export interface LogMessage {
    level: (typeof LogLevelNames)[number];
    msg: string;
    timestamp: string;
    [key: string]: string | boolean | number;
}
export interface LoggerOptions {
    prefix?: string;
}
export interface ILoggerConfig {
    level: LogLevel;
    options?: LoggerOptions;
    metadata: Record<string, any>;
}
export interface LoggerConfig extends ILoggerConfig {
    write: (msg: string) => void;
}
export type LoggerConfigOverride = Partial<LoggerConfig>;
export interface ILogger {
    level: LogLevel;
    error(msg: string, data?: Record<string, any> | Error): void;
    warn(msg: string, data?: Record<string, any> | Error): void;
    info(msg: string, data?: Record<string, any> | Error): void;
    debug(msg: string, data?: Record<string, any> | Error): void;
    clone(overrides?: Partial<ILoggerConfig>): ILogger;
}
export declare class Logger implements ILogger {
    readonly write: (msg: string) => void;
    readonly metadata: Record<string, any>;
    readonly options?: LoggerOptions;
    readonly prefix?: string;
    level: LogLevel;
    constructor(write: (msg: string) => void, metadata?: Record<string, any>, level?: LogLevel, options?: LoggerOptions);
    clone(override?: LoggerConfigOverride): Logger;
    private getLoggerConfig;
    error(msg: string, data?: Record<string, any> | Error): void;
    warn(msg: string, data?: Record<string, any> | Error): void;
    info(msg: string, data?: Record<string, any> | Error): void;
    debug(msg: string, data?: Record<string, any> | Error): void;
    log(level: LogLevel, msg: string, data?: Record<string, any> | Error): void;
}
export declare function parseLogLevel(level: string): LogLevel;
/**
 * Serializes an Error object into a plain object, including nested causes and custom properties.
 * @param error - The error to serialize.
 * @param depth - The current depth of recursion.
 * @param maxDepth - The maximum depth of recursion.
 * @returns A serialized representation of the error.
 */
export declare function serializeError(error: Error, depth?: number, maxDepth?: number): Record<string, any>;
//# sourceMappingURL=logger.d.ts.map