export interface Event {
    readonly type: string;
    readonly defaultPrevented?: boolean;
}
export type EventListener = (e: Event) => void;
export declare class EventTarget {
    private readonly listeners;
    constructor();
    addEventListener(type: string, callback: EventListener): void;
    removeEventListener(type: string, callback: EventListener): void;
    dispatchEvent(event: Event): boolean;
    removeAllListeners(): void;
    /**
     * Gets the number of listeners for the provided Event type.
     * @param type - The name of the Event type.
     * @returns The number of listeners for this Event type.
     */
    listenerCount(type: string): number;
}
export declare class TypedEventTarget<TEvents extends Record<string, Event>> {
    private readonly emitter;
    dispatchEvent<TEventType extends keyof TEvents>(event: TEvents[TEventType]): void;
    addEventListener<TEventType extends keyof TEvents>(type: TEventType, handler: (event: TEvents[TEventType]) => void): void;
    removeEventListener<TEventType extends keyof TEvents>(type: TEventType, handler: (event: TEvents[TEventType]) => void): void;
    removeAllListeners(): void;
    /**
     * Gets the number of listeners for the provided Event type.
     * @param type - The name of the Event type.
     * @returns The number of listeners for this Event type.
     */
    listenerCount<TEventType extends keyof TEvents>(type: TEventType): number;
}
//# sourceMappingURL=eventtarget.d.ts.map