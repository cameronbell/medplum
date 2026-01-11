import { TypedEventTarget } from '../eventtarget';
/*!
 * Reconnecting WebSocket
 * by Pedro Ladaria <pedro.ladaria@gmail.com>
 * https://github.com/pladaria/reconnecting-websocket
 * License MIT
 *
 * Copy of "partysocket" from Partykit team, a fork of the original "Reconnecting WebSocket"
 * https://github.com/partykit/partykit/blob/main/packages/partysocket
 */
export interface IReconnectingWebSocket extends TypedEventTarget<WebSocketEventMap> {
    readyState: number;
    close(code?: number, reason?: string): void;
    send(message: string): void;
    reconnect(code?: number, reason?: string): void;
}
export interface IReconnectingWebSocketCtor {
    new (url: string, protocols?: ProtocolsProvider, options?: Options): IReconnectingWebSocket;
}
export interface ErrorEvent extends globalThis.Event {
    message: string;
    error: Error;
}
export interface CloseEvent extends globalThis.Event {
    code: number;
    reason: string;
    wasClean: boolean;
}
export type WebSocketEventMap = {
    close: CloseEvent;
    error: ErrorEvent;
    message: MessageEvent;
    open: Event;
};
/**
 * This map exists separately from `WebSocketEventMap`, which is the actual event map used for the `ReconnectingWebSocket` class itself,
 * due to slight difference in the type between the events as we use them, and the events as they exist as global interfaces. We need the global interfaces
 * to be generic enough to satisfy conformant implementations that don't exactly match the events we export and use in `ReconnectingWebSocket` itself.
 */
export type IWebSocketEventMap = {
    close: globalThis.CloseEvent;
    error: globalThis.ErrorEvent;
    message: globalThis.MessageEvent;
    open: Event;
};
/**
 * Generic interface that an implementation of `WebSocket` must satisfy to be used with `ReconnectingWebSocket`.
 * This is a slightly modified fork of the `WebSocket` global type used in Node.
 *
 * The main key difference is making all the `onclose`, `onerror`, etc. functions have `any[]` args, making `data` in `send()` of type `any`, and making `binaryType` of type string,
 * though the particular implementation should narrow each of these implementation-specific types.
 */
export interface IWebSocket {
    binaryType: string;
    readonly bufferedAmount: number;
    readonly extensions: string;
    onclose: ((...args: any[]) => any) | null;
    onerror: ((...args: any[]) => any) | null;
    onmessage: ((...args: any[]) => any) | null;
    onopen: ((...args: any[]) => any) | null;
    readonly protocol: string;
    readonly readyState: number;
    readonly url: string;
    close(code?: number, reason?: string): void;
    send(data: any): void;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export declare function assert(condition: unknown, msg?: string): asserts condition;
export type Options<WS extends IWebSocket = WebSocket> = {
    WebSocket?: any;
    binaryType?: WS['binaryType'];
    maxReconnectionDelay?: number;
    minReconnectionDelay?: number;
    reconnectionDelayGrowFactor?: number;
    minUptime?: number;
    connectionTimeout?: number;
    maxRetries?: number;
    maxEnqueuedMessages?: number;
    startClosed?: boolean;
    debug?: boolean;
    debugLogger?: (...args: any[]) => void;
};
export type ProtocolsProvider = null | string | string[];
export type Message = string | ArrayBuffer | Blob | ArrayBufferView;
export declare class ReconnectingWebSocket<WS extends IWebSocket = WebSocket> extends TypedEventTarget<WebSocketEventMap> implements IReconnectingWebSocket {
    private _ws;
    private _retryCount;
    private _uptimeTimeout;
    private _connectTimeout;
    private _shouldReconnect;
    private _connectLock;
    private _binaryType;
    private _closeCalled;
    private _messageQueue;
    private readonly _debugLogger;
    protected _url: string;
    protected _protocols?: ProtocolsProvider;
    protected _options: Options<WS>;
    constructor(url: string, protocols?: ProtocolsProvider, options?: Options<WS>);
    static get CONNECTING(): number;
    static get OPEN(): number;
    static get CLOSING(): number;
    static get CLOSED(): number;
    get CONNECTING(): number;
    get OPEN(): number;
    get CLOSING(): number;
    get CLOSED(): number;
    get binaryType(): WS['binaryType'];
    set binaryType(value: WS['binaryType']);
    /**
     * @returns The number or connection retries.
     */
    get retryCount(): number;
    /**
     * @returns The number of bytes of data that have been queued using calls to send() but not yet
     * transmitted to the network. This value resets to zero once all queued data has been sent.
     * This value does not reset to zero when the connection is closed; if you keep calling send(),
     * this will continue to climb. Read only
     *
     */
    get bufferedAmount(): number;
    /**
     * @returns The extensions selected by the server. This is currently only the empty string or a list of
     * extensions as negotiated by the connection
     */
    get extensions(): string;
    /**
     * @returns A string indicating the name of the sub-protocol the server selected;
     * this will be one of the strings specified in the protocols parameter when creating the
     * WebSocket object.
     */
    get protocol(): string;
    /**
     * @returns The current state of the connection; this is one of the Ready state constants.
     */
    get readyState(): number;
    /**
     * @returns The URL as resolved by the constructor.
     */
    get url(): string;
    /**
     * @returns Whether the websocket object is now in reconnectable state.
     */
    get shouldReconnect(): boolean;
    /**
     * An event listener to be called when the WebSocket connection's readyState changes to CLOSED
     */
    onclose: ((event: CloseEvent) => void) | null;
    /**
     * An event listener to be called when an error occurs
     */
    onerror: ((event: ErrorEvent) => void) | null;
    /**
     * An event listener to be called when a message is received from the server
     */
    onmessage: ((event: MessageEvent) => void) | null;
    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data
     */
    onopen: ((event: Event) => void) | null;
    /**
     * Closes the WebSocket connection or connection attempt, if any. If the connection is already
     * CLOSED, this method does nothing
     * @param code - The code to close with. Default is 1000.
     * @param reason - An optional reason for closing the connection.
     */
    close(code?: number, reason?: string): void;
    /**
     * Closes the WebSocket connection or connection attempt and connects again.
     * Resets retry counter;
     * @param code - The code to disconnect with. Default is 1000.
     * @param reason - An optional reason for disconnecting the connection.
     */
    reconnect(code?: number, reason?: string): void;
    /**
     * Enqueue specified data to be transmitted to the server over the WebSocket connection
     * @param data - The data to enqueue.
     */
    send(data: Message): void;
    private _debug;
    private _getNextDelay;
    private _wait;
    private _connect;
    private _handleTimeout;
    private _disconnect;
    private _acceptOpen;
    private readonly _handleOpen;
    private readonly _handleMessage;
    private readonly _handleError;
    private readonly _handleClose;
    private _removeListeners;
    private _addListeners;
    private _clearTimeouts;
}
//# sourceMappingURL=reconnecting-websocket.d.ts.map