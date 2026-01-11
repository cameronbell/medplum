import type { Bundle, DiagnosticReport, Encounter, ImagingStudy, OperationOutcome, Patient, Reference } from '@medplum/fhirtypes';
import { TypedEventTarget } from '../eventtarget';
export declare const FHIRCAST_EVENT_NAMES: {
    readonly 'Patient-open': "Patient-open";
    readonly 'Patient-close': "Patient-close";
    readonly 'ImagingStudy-open': "ImagingStudy-open";
    readonly 'ImagingStudy-close': "ImagingStudy-close";
    readonly 'Encounter-open': "Encounter-open";
    readonly 'Encounter-close': "Encounter-close";
    readonly 'DiagnosticReport-open': "DiagnosticReport-open";
    readonly 'DiagnosticReport-close': "DiagnosticReport-close";
    readonly 'DiagnosticReport-select': "DiagnosticReport-select";
    readonly 'DiagnosticReport-update': "DiagnosticReport-update";
    readonly syncerror: "syncerror";
};
export declare const FHIRCAST_RESOURCE_TYPES: readonly ["Patient", "Encounter", "ImagingStudy", "DiagnosticReport", "OperationOutcome", "Bundle"];
export declare const FHIRCAST_EVENT_VERSION_REQUIRED: readonly ["DiagnosticReport-update"];
export type FhircastEventVersionRequired = (typeof FHIRCAST_EVENT_VERSION_REQUIRED)[number];
export type FhircastEventVersionOptional = Exclude<FhircastEventName, FhircastEventVersionRequired>;
export declare function isContextVersionRequired(event: string): event is FhircastEventVersionRequired;
export declare function assertContextVersionOptional(event: string): asserts event is FhircastEventVersionOptional;
export type FhircastEventName = keyof typeof FHIRCAST_EVENT_NAMES;
export type FhircastResourceEventName = Exclude<FhircastEventName, 'syncerror'>;
export type FhircastResourceType = (typeof FHIRCAST_RESOURCE_TYPES)[number];
export type FhircastAnchorResourceType = 'Patient' | 'ImagingStudy' | 'Encounter' | 'DiagnosticReport';
export type FhircastEventContextDetails = {
    resourceType: FhircastResourceType | '*';
    optional?: boolean;
    manyAllowed?: boolean;
    array?: boolean;
    reference?: boolean;
};
export declare const FHIRCAST_EVENT_RESOURCES: {
    readonly 'Patient-open': {
        readonly patient: {
            readonly resourceType: "Patient";
        };
        readonly encounter: {
            readonly resourceType: "Encounter";
            readonly optional: true;
        };
    };
    readonly 'Patient-close': {
        readonly patient: {
            readonly resourceType: "Patient";
        };
        readonly encounter: {
            readonly resourceType: "Encounter";
            readonly optional: true;
        };
    };
    readonly 'ImagingStudy-open': {
        readonly study: {
            readonly resourceType: "ImagingStudy";
        };
        readonly encounter: {
            readonly resourceType: "Encounter";
            readonly optional: true;
        };
        readonly patient: {
            readonly resourceType: "Patient";
            readonly optional: true;
        };
    };
    readonly 'ImagingStudy-close': {
        readonly study: {
            readonly resourceType: "ImagingStudy";
        };
        readonly encounter: {
            readonly resourceType: "Encounter";
            readonly optional: true;
        };
        readonly patient: {
            readonly resourceType: "Patient";
            readonly optional: true;
        };
    };
    readonly 'Encounter-open': {
        readonly encounter: {
            readonly resourceType: "Encounter";
        };
        readonly patient: {
            readonly resourceType: "Patient";
        };
    };
    readonly 'Encounter-close': {
        readonly encounter: {
            readonly resourceType: "Encounter";
        };
        readonly patient: {
            readonly resourceType: "Patient";
        };
    };
    readonly 'DiagnosticReport-open': {
        readonly report: {
            readonly resourceType: "DiagnosticReport";
        };
        readonly encounter: {
            readonly resourceType: "Encounter";
            readonly optional: true;
        };
        readonly study: {
            readonly resourceType: "ImagingStudy";
            readonly optional: true;
            readonly manyAllowed: true;
        };
        readonly patient: {
            readonly resourceType: "Patient";
        };
    };
    readonly 'DiagnosticReport-close': {
        readonly report: {
            readonly resourceType: "DiagnosticReport";
        };
        readonly encounter: {
            readonly resourceType: "Encounter";
            readonly optional: true;
        };
        readonly study: {
            readonly resourceType: "ImagingStudy";
            readonly optional: true;
            readonly manyAllowed: true;
        };
        readonly patient: {
            readonly resourceType: "Patient";
        };
    };
    readonly 'DiagnosticReport-select': {
        readonly report: {
            readonly resourceType: "DiagnosticReport";
            readonly reference: true;
        };
        readonly patient: {
            readonly resourceType: "Patient";
            readonly optional: true;
            readonly reference: true;
        };
        readonly select: {
            readonly resourceType: "*";
            readonly reference: true;
            readonly manyAllowed: true;
        };
    };
    readonly 'DiagnosticReport-update': {
        readonly report: {
            readonly resourceType: "DiagnosticReport";
            readonly reference: true;
        };
        readonly patient: {
            readonly resourceType: "Patient";
            readonly optional: true;
            readonly reference: true;
        };
        readonly updates: {
            readonly resourceType: "Bundle";
        };
    };
    readonly syncerror: {
        readonly operationoutcome: {
            readonly resourceType: "OperationOutcome";
        };
    };
};
/**
 * Checks if a `ResourceType` can be used in a `FHIRcast` context.
 *
 * @param resourceType - A `ResourceType` to test.
 * @returns `true` if this is a resource type associated with `FHIRcast` contexts, otherwise returns `false`.
 */
export declare function isFhircastResourceType(resourceType: FhircastResourceType): boolean;
/**
 * A `FHIRcast` subscription request.
 *
 * Can be passed to `MedplumClient.fhircastConnect` or `MedplumClient.fhircastUnsubscribe` to either open a `FHIRcast` connection, or unsubscribe from the subscription.
 */
export type SubscriptionRequest = {
    channelType: 'websocket';
    mode: 'subscribe' | 'unsubscribe';
    events: FhircastEventName[];
    topic: string;
    endpoint: string;
};
export type FhircastPatientContext = {
    key: 'patient';
    resource: Patient;
};
export type FhircastEncounterContext = {
    key: 'encounter';
    resource: Encounter;
};
export type FhircastStudyContext = {
    key: 'study';
    resource: ImagingStudy;
};
export type FhircastReportContext = {
    key: 'report';
    resource: DiagnosticReport;
};
export type FhircastReportReferenceContext = {
    key: 'report';
    reference: Reference<DiagnosticReport>;
};
export type FhircastPatientReferenceContext = {
    key: 'patient';
    reference: Reference<Patient>;
};
export type FhircastUpdatesContext = {
    key: 'updates';
    resource: Bundle;
};
export type FhircastSelectContext = {
    key: 'select';
    reference: Reference;
};
export type FhircastOperationOutcomeContext = {
    key: 'operationoutcome';
    resource: OperationOutcome;
};
export type FhircastResourceContext = FhircastPatientContext | FhircastEncounterContext | FhircastStudyContext | FhircastReportContext | FhircastUpdatesContext | FhircastOperationOutcomeContext;
export type FhircastReferenceContext = FhircastReportReferenceContext | FhircastPatientReferenceContext | FhircastSelectContext;
export type FhircastPatientOpenContext = FhircastPatientContext | FhircastEncounterContext;
export type FhircastPatientCloseContext = FhircastPatientOpenContext;
export type FhircastImagingStudyOpenContext = FhircastStudyContext | FhircastEncounterContext | FhircastPatientContext;
export type FhircastImagingStudyCloseContext = FhircastImagingStudyOpenContext;
export type FhircastEncounterOpenContext = FhircastEncounterContext | FhircastPatientContext;
export type FhircastEncounterCloseContext = FhircastEncounterOpenContext;
export type FhircastDiagnosticReportOpenContext = FhircastReportContext | FhircastEncounterContext | FhircastStudyContext | FhircastPatientContext;
export type FhircastDiagnosticReportCloseContext = FhircastDiagnosticReportOpenContext;
export type FhircastDiagnosticReportUpdateContext = FhircastReportReferenceContext | FhircastPatientReferenceContext | FhircastUpdatesContext;
export type FhircastDiagnosticReportSelectContext = FhircastReportReferenceContext | FhircastPatientReferenceContext | FhircastSelectContext;
export type FhircastSyncErrorContext = FhircastOperationOutcomeContext;
export type FhircastHubContentContext = {
    key: 'content';
    resource: Bundle;
};
export type FhircastEventKeys<EventName extends FhircastEventName> = keyof (typeof FHIRCAST_EVENT_RESOURCES)[EventName];
export type FhircastContextResourceType<EventName extends FhircastEventName, K extends FhircastEventKeys<EventName>> = (typeof FHIRCAST_EVENT_RESOURCES)[EventName][K] extends {
    resourceType: infer R;
} ? R : never;
export type FhircastEventContext<EventName extends FhircastEventName = FhircastResourceEventName> = EventName extends 'Patient-open' ? FhircastPatientOpenContext : EventName extends 'Patient-close' ? FhircastPatientCloseContext : EventName extends 'ImagingStudy-open' ? FhircastImagingStudyOpenContext : EventName extends 'ImagingStudy-close' ? FhircastImagingStudyCloseContext : EventName extends 'Encounter-open' ? FhircastEncounterOpenContext : EventName extends 'Encounter-close' ? FhircastEncounterCloseContext : EventName extends 'DiagnosticReport-open' ? FhircastDiagnosticReportOpenContext : EventName extends 'DiagnosticReport-close' ? FhircastDiagnosticReportCloseContext : EventName extends 'DiagnosticReport-update' ? FhircastDiagnosticReportUpdateContext : EventName extends 'DiagnosticReport-select' ? FhircastDiagnosticReportSelectContext : EventName extends 'syncerror' ? FhircastSyncErrorContext : never;
export type AnchorResourceOpenEvent<T extends FhircastAnchorResourceType> = T extends FhircastAnchorResourceType ? `${T}-open` : never;
export type CurrentContext<T extends FhircastAnchorResourceType | '' = FhircastAnchorResourceType | ''> = T extends '' ? {
    'context.type': '';
    context: never[];
} : T extends 'DiagnosticReport' ? {
    'context.type': 'DiagnosticReport';
    'context.versionId': string;
    context: (FhircastEventContext<'DiagnosticReport-open'> | FhircastHubContentContext)[];
} : T extends 'Patient' | 'Encounter' | 'ImagingStudy' ? {
    'context.type': T;
    'context.versionId': string;
    context: FhircastEventContext<AnchorResourceOpenEvent<T>>[];
} : never;
export type PendingSubscriptionRequest = Omit<SubscriptionRequest, 'endpoint'>;
export type FhircastEventPayload<EventName extends FhircastEventName = FhircastEventName> = {
    'hub.topic': string;
    'hub.event': EventName;
    context: FhircastEventContext<EventName>[];
    'context.versionId'?: string;
    'context.priorVersionId'?: string;
};
export type FhircastMessagePayload<EventName extends FhircastEventName = FhircastEventName> = {
    timestamp: string;
    id: string;
    event: FhircastEventPayload<EventName>;
};
export declare function isCompletedSubscriptionRequest(subscriptionRequest: SubscriptionRequest | PendingSubscriptionRequest): subscriptionRequest is SubscriptionRequest;
/**
 * Creates a serialized url-encoded payload for a `FHIRcast` subscription from a `SubscriptionRequest` object that can be directly used in an HTTP request to the Hub.
 *
 * @param subscriptionRequest - An object representing a subscription request.
 * @returns A serialized subscription in url-encoded form.
 */
export declare function serializeFhircastSubscriptionRequest(subscriptionRequest: SubscriptionRequest | PendingSubscriptionRequest): string;
/**
 * Validates that a `SubscriptionRequest`.
 *
 * @param subscriptionRequest - The `SubscriptionRequest` to validate.
 * @returns A `boolean` indicating whether or not the `SubscriptionRequest` is valid.
 */
export declare function validateFhircastSubscriptionRequest(subscriptionRequest: SubscriptionRequest | PendingSubscriptionRequest): boolean;
/**
 * Creates a serializable JSON payload for the `FHIRcast` protocol
 *
 * @param topic - The topic that this message will be published on. Usually a UUID.
 * @param event - The event name, ie. "Patient-open" or "Patient-close".
 * @param context - The updated context, containing new versions of resources related to this event.
 * @param versionId - The current `versionId` of the anchor context. For example, in `DiagnosticReport-update`, it's the `versionId` of the `DiagnosticReport`.
 * @returns A serializable `FhircastMessagePayload`.
 */
export declare function createFhircastMessagePayload<EventName extends FhircastEventVersionOptional>(topic: string, event: EventName, context: FhircastEventContext<EventName> | FhircastEventContext<EventName>[], versionId?: never): FhircastMessagePayload<EventName>;
export declare function createFhircastMessagePayload<EventName extends FhircastEventVersionRequired>(topic: string, event: EventName, context: FhircastEventContext<EventName> | FhircastEventContext<EventName>[], versionId: string): FhircastMessagePayload<EventName>;
export type FhircastConnectEvent = {
    type: 'connect';
};
export type FhircastMessageEvent = {
    type: 'message';
    payload: FhircastMessagePayload;
};
export type FhircastDisconnectEvent = {
    type: 'disconnect';
};
export type FhircastSubscriptionEventMap = {
    connect: FhircastConnectEvent;
    message: FhircastMessageEvent;
    disconnect: FhircastDisconnectEvent;
};
/**
 * A class representing a `FHIRcast` connection.
 *
 * `FhircastConnection` extends `EventTarget` and emits 3 lifecycle events:
 * 1. `connect` - An event to signal when a WebSocket connection has been opened. Fired as soon as a WebSocket emits `open`.
 * 2. `message` - Contains a `payload` field containing a `FHIRcast` message payload exactly as it comes in over WebSockets.
 * 3. `disconnect` - An event to signal when a WebSocket connection has been closed. Fired as soon as a WebSocket emits `close`.
 *
 * To close the connection, call `connection.disconnect()` and listen to the `disconnect` event to know when the connection has been disconnected.
 */
export declare class FhircastConnection extends TypedEventTarget<FhircastSubscriptionEventMap> {
    readonly subRequest: SubscriptionRequest;
    private readonly websocket;
    /**
     * Creates a new `FhircastConnection`.
     * @param subRequest - The subscription request to initialize the connection from.
     */
    constructor(subRequest: SubscriptionRequest);
    disconnect(): void;
}
//# sourceMappingURL=index.d.ts.map