import type { Readable } from 'node:stream';
/**
 * Reads data from a Readable stream and returns a Promise that resolves with a Buffer containing all the data.
 * @param stream - The Readable stream to read from.
 * @returns A Promise that resolves with a Buffer containing all the data from the Readable stream.
 */
export declare function streamToBuffer(stream: Readable): Promise<Buffer>;
//# sourceMappingURL=sftp.d.ts.map