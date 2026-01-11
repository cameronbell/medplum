import type { Bundle, Project, Resource, Subscription } from '@medplum/fhirtypes';
import { MedplumClient } from '../client';
import { TypedEventTarget } from '../eventtarget';
import type { Logger } from '../logger';
import type { WithId } from '../utils';
import type { IReconnectingWebSocket, IReconnectingWebSocketCtor } from '../websockets/reconnecting-websocket';
export type SubscriptionEventMap = {
    connect: {
        type: 'connect';
        payload: {
            subscriptionId: string;
        };
    };
    disconnect: {
        type: 'disconnect';
        payload: {
            subscriptionId: string;
        };
    };
    error: {
        type: 'error';
        payload: Error;
    };
    message: {
        type: 'message';
        payload: Bundle;
    };
    open: {
        type: 'open';
    };
    close: {
        type: 'close';
    };
    heartbeat: {
        type: 'heartbeat';
        payload: Bundle;
    };
};
/**
 * An `EventTarget` that emits events when new subscription notifications come in over WebSockets.
 *
 * -----
 *
 * ### Events emitted:
 *
 * - `connect` - A new subscription is connected to the `SubscriptionManager` and `message` events for this subscription can be expected.
 * - `disconnect` - The specified subscription is no longer being monitored by the `SubscriptionManager`.
 * - `error` - An error has occurred.
 * - `message` - A message containing a notification `Bundle` has been received.
 * - `open` - The WebSocket has been opened.
 * - `close` - The WebSocket has been closed.
 * - `heartbeat` - A `heartbeat` message has been received.
 */
export declare class SubscriptionEmitter extends TypedEventTarget<SubscriptionEventMap> {
    private readonly criteria;
    constructor(...criteria: string[]);
    getCriteria(): Set<string>;
    /**
     * @internal
     * @param criteria - The criteria to add to this `SubscriptionEmitter`.
     */
    _addCriteria(criteria: string): void;
    /**
     * @internal
     * @param criteria - The criteria to remove from this `SubscriptionEmitter`.
     */
    _removeCriteria(criteria: string): void;
}
export interface SubManagerOptions {
    ReconnectingWebSocket?: IReconnectingWebSocketCtor;
    pingIntervalMs?: number;
    debug?: boolean;
    debugLogger?: (...args: any[]) => void;
}
export declare class SubscriptionManager {
    private readonly medplum;
    private readonly ws;
    private masterSubEmitter?;
    private readonly criteriaEntries;
    private readonly criteriaEntriesBySubscriptionId;
    private wsClosed;
    private pingTimer;
    private readonly pingIntervalMs;
    private waitingForPong;
    private currentProfile;
    constructor(medplum: MedplumClient, wsUrl: URL | string, options?: SubManagerOptions);
    private setupListeners;
    private emitError;
    private maybeEmitDisconnect;
    private getTokenForCriteria;
    private maybeGetCriteriaEntry;
    private getAllCriteriaEmitters;
    private addCriteriaEntry;
    private removeCriteriaEntry;
    private subscribeToCriteria;
    private refreshAllSubscriptions;
    addCriteria(criteria: string, subscriptionProps?: Partial<Subscription>): SubscriptionEmitter;
    removeCriteria(criteria: string, subscriptionProps?: Partial<Subscription>): void;
    getWebSocket(): IReconnectingWebSocket;
    closeWebSocket(): void;
    reconnectWebSocket(): void;
    getCriteriaCount(): number;
    getMasterEmitter(): SubscriptionEmitter;
}
export type BackgroundJobInteraction = 'create' | 'update' | 'delete';
export interface BackgroundJobContext {
    project?: WithId<Project>;
    interaction: BackgroundJobInteraction;
}
export type ResourceMatchesSubscriptionCriteria = {
    resource: Resource;
    subscription: Subscription;
    context: BackgroundJobContext;
    logger?: Logger;
    getPreviousResource: (currentResource: Resource) => Promise<Resource | undefined>;
};
export declare function resourceMatchesSubscriptionCriteria({ resource, subscription, context, getPreviousResource, logger, }: ResourceMatchesSubscriptionCriteria): Promise<boolean>;
export declare function isFhirCriteriaMet(subscription: Subscription, currentResource: Resource, getPreviousResource: (currentResource: Resource) => Promise<Resource | undefined>): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map