import type { AccessPolicy, Agent, Attachment, Binary, Bot, BulkDataExport, Bundle, ClientApplication, Communication, Device, DocumentReference, ExtractResource, Identifier, Media, OperationOutcome, Patient, Practitioner, Project, ProjectMembership, ProjectMembershipAccess, ProjectSetting, Reference, RelatedPerson, Resource, ResourceType, Subscription, UserConfiguration, ValueSet } from '@medplum/fhirtypes';
/** @ts-ignore */
import type { CustomTableLayout, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import { LRUCache } from './cache';
import type { CdsDiscoveryResponse, CdsRequest, CdsResponse } from './cds';
import { TypedEventTarget } from './eventtarget';
import type { CurrentContext, FhircastEventContext, FhircastEventName, FhircastEventVersionOptional, FhircastEventVersionRequired, SubscriptionRequest } from './fhircast';
import { FhircastConnection } from './fhircast';
import { MedplumKeyValueClient } from './keyvalue';
import { ReadablePromise } from './readablepromise';
import type { IClientStorage } from './storage';
import type { SubscriptionEmitter } from './subscriptions';
import { SubscriptionManager } from './subscriptions';
import type { CodeChallengeMethod, ProfileResource, QueryTypes, WithId } from './utils';
/**
 * Log level for MedplumClient requests and responses.
 * - 'none': No logging
 * - 'basic': Log method, URL, and status code only (no sensitive headers)
 * - 'verbose': Log all details including headers (may include sensitive data)
 */
export type ClientLogLevel = 'none' | 'basic' | 'verbose';
export declare const MEDPLUM_VERSION: string;
export declare const MEDPLUM_CLI_CLIENT_ID = "medplum-cli";
export declare const DEFAULT_ACCEPT: string;
interface ILocationUtils {
    assign(url: string): void;
    reload(): void;
    getSearch(): string;
    getPathname(): string;
    getLocation(): string;
    getOrigin(): string;
}
/**
 * The MedplumClientOptions interface defines configuration options for MedplumClient.
 *
 * All configuration settings are optional.
 */
export interface MedplumClientOptions {
    /**
     * Base server URL.
     *
     * Default value is `https://api.medplum.com/`
     *
     * Use this to point to a custom Medplum deployment.
     */
    baseUrl?: string;
    /**
     * OAuth2 authorize URL.
     *
     * Default value is `baseUrl + "/oauth2/authorize"`.
     *
     * Can be specified as absolute URL or relative to baseUrl.
     *
     * Use this if you want to use a separate OAuth server.
     */
    authorizeUrl?: string;
    /**
     * FHIR URL path.
     *
     * Default value is `fhir/R4/`.
     *
     * Can be specified as absolute URL or relative to baseUrl.
     *
     * Use this if you want to use a different path when connecting to a FHIR server.
     */
    fhirUrlPath?: string;
    /**
     * OAuth2 token URL.
     *
     * Default value is `baseUrl + "/oauth2/token"`.
     *
     * Can be specified as absolute URL or relative to baseUrl.
     *
     * Use this if you want to use a separate OAuth server.
     */
    tokenUrl?: string;
    /**
     * OAuth2 logout URL.
     *
     * Default value is `baseUrl + "/oauth2/logout"`.
     *
     * Can be specified as absolute URL or relative to baseUrl.
     *
     * Use this if you want to use a separate OAuth server.
     */
    logoutUrl?: string;
    /**
     * FHIRcast Hub URL.
     *
     * Default value is `fhircast/STU3`.
     *
     * Can be specified as absolute URL or relative to `baseUrl`.
     *
     * Use this if you want to use a different path when connecting to a FHIRcast hub.
     */
    fhircastHubUrl?: string;
    /**
     * The client ID.
     *
     * Client ID can be used for SMART-on-FHIR customization.
     */
    clientId?: string;
    /**
     * The client secret.
     *
     * Client secret can be used for FHIR Oauth Client Credential flows
     */
    clientSecret?: string;
    /**
     * The OAuth Access Token.
     *
     * Access Token used to connect to make request to FHIR servers
     */
    accessToken?: string;
    /**
     * Specifies through which part of the HTTP request the client credentials should be sent.
     *
     * Body is the default for backwards compatibility, but header may be more desirable for applications.
     */
    authCredentialsMethod?: 'body' | 'header';
    /**
     * Number of resources to store in the cache.
     *
     * Default value is `1000`.
     *
     * Consider using this for performance of displaying Patient or Practitioner resources.
     */
    resourceCacheSize?: number;
    /**
     * The length of time in milliseconds to cache resources.
     *
     * Default value is `60000` (60 seconds).
     *
     * Cache time of zero disables all caching.
     *
     * For any individual request, the cache behavior can be overridden by setting the cache property on request options.
     *
     * See: {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/cache}
     */
    cacheTime?: number;
    /**
     * The length of time in milliseconds to delay requests for auto batching.
     *
     * Auto batching attempts to group multiple requests together into a single batch request.
     *
     * Default value is `0`, which disables auto batching.
     */
    autoBatchTime?: number;
    /**
     * The refresh grace period in milliseconds.
     *
     * This is the amount of time before the access token expires that the client will attempt to refresh the token.
     *
     * Default value is `300000` (5 minutes).
     */
    refreshGracePeriod?: number;
    /**
     * Fetch implementation.
     *
     * Default is `window.fetch` (if available).
     *
     * For Node.js applications, consider the 'node-fetch' package.
     */
    fetch?: FetchLike;
    /**
     * Storage implementation.
     *
     * Default is `window.localStorage` (if available), this is the common implementation for use in the browser, or an in-memory storage implementation.  If using Medplum on a server it may be useful to provide a custom storage implementation, for example using redis, a database or a file based storage.  Medplum CLI is an an example of `FileSystemStorage`, for reference.
     */
    storage?: IClientStorage;
    locationUtils?: ILocationUtils;
    /**
     * Create PDF implementation.
     *
     * Default is none, and PDF generation is disabled.
     *
     * @example
     * In browser environments, import the client-side pdfmake library.
     *
     * ```html
     * <script src="pdfmake.min.js"></script>
     * <script>
     * async function createPdf(docDefinition, tableLayouts, fonts) {
     *   return new Promise((resolve) => {
     *     pdfMake.createPdf(docDefinition, tableLayouts, fonts).getBlob(resolve);
     *   });
     * }
     * </script>
     * ```
     *
     * @example
     * In Node.js applications:
     *
     * ```ts
     * import type { CustomTableLayout, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
     * function createPdf(
     *   docDefinition: TDocumentDefinitions,
     *   tableLayouts?: { [name: string]: CustomTableLayout },
     *   fonts?: TFontDictionary
     * ): Promise<Buffer> {
     *   return new Promise((resolve, reject) => {
     *     const printer = new PdfPrinter(fonts ?? {});
     *     const pdfDoc = printer.createPdfKitDocument(docDefinition, { tableLayouts });
     *     const chunks: Uint8Array[] = [];
     *     pdfDoc.on('data', (chunk: Uint8Array) => chunks.push(chunk));
     *     pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
     *     pdfDoc.on('error', reject);
     *     pdfDoc.end();
     *   });
     * }
     * ```
     */
    createPdf?: CreatePdfFunction;
    /**
     * Callback for when the client is unauthenticated.
     *
     * Default is do nothing.
     *
     * For client side applications, consider redirecting to a sign in page.
     */
    onUnauthenticated?: () => void;
    /**
     * The default redirect behavior.
     *
     * The default behavior is to not follow redirects.
     *
     * Use "follow" to automatically follow redirects.
     */
    redirect?: RequestRedirect;
    /**
     * When the verbose flag is set, the client will log all requests and responses to the console.
     * @deprecated Use logLevel instead. Will be removed in a future version.
     */
    verbose?: boolean;
    /**
     * Log level for requests and responses.
     * - 'none': No logging (default)
     * - 'basic': Log method, URL, and status code only (no sensitive headers)
     * - 'verbose': Log all details including headers (may include sensitive data like tokens)
     *
     * @defaultValue 'none'
     */
    logLevel?: ClientLogLevel;
    /**
     * Optional flag to enable or disable Medplum extended mode.
     *
     * Medplum extended mode includes a few non-standard FHIR properties such as meta.author and meta.project.
     *
     * Default is true.
     */
    extendedMode?: boolean;
    /**
     * Default headers to include in all requests.
     * This can be used to set custom headers such as Cookies or Authorization headers.
     */
    defaultHeaders?: Record<string, string>;
    /**
     * Prefix to add to all keys when using `localStorage` as the backing store for `ClientStorage` (the default option in the browser).
     *
     * Default is `''` (no prefix).
     */
    storagePrefix?: string;
}
export interface MedplumRequestOptions extends RequestInit {
    /**
     * Optional flag to follow "Location" or "Content-Location" URL on successful HTTP 200 "OK" responses.
     */
    followRedirectOnOk?: boolean;
    /**
     * Optional flag to follow "Location" or "Content-Location" URL on successful HTTP 201 "Created" responses.
     */
    followRedirectOnCreated?: boolean;
    /**
     * Optional flag to poll the status URL on successful HTTP 202 "Accepted" responses.
     */
    pollStatusOnAccepted?: boolean;
    /**
     * Optional polling time interval in milliseconds.
     * Default value is 1000 (1 second).
     */
    pollStatusPeriod?: number;
    /**
     * Optional max number of retries that should be made in the case of a failed request. Default is `2`.
     */
    maxRetries?: number;
    /**
     * Optional maximum time to wait between retries, in milliseconds; defaults to `2000` (2 s).
     */
    maxRetryTime?: number;
    /**
     * Optional flag to disable auto-batching for this specific request.
     * Only applies when the client is configured with auto-batching enabled.
     */
    disableAutoBatch?: boolean;
}
export interface PushToAgentOptions extends MedplumRequestOptions {
    /**
     * Time to wait before request timeout in milliseconds; defaults to `10000` (10 s)
     */
    waitTimeout?: number;
}
export type FetchLike = (url: string, options?: any) => Promise<any>;
/**
 * ResourceArray is an array of resources with a bundle property.
 * The bundle property is a FHIR Bundle containing the search results.
 * This is useful for retrieving bundle metadata such as total, offset, and next link.
 */
export type ResourceArray<T extends Resource = Resource> = T[] & {
    bundle: Bundle<T>;
};
export interface CreatePdfFunction {
    (docDefinition: TDocumentDefinitions, tableLayouts?: Record<string, CustomTableLayout>, fonts?: TFontDictionary): Promise<any>;
}
export interface BaseLoginRequest {
    readonly projectId?: string;
    readonly clientId?: string;
    readonly resourceType?: string;
    readonly scope?: string;
    readonly nonce?: string;
    readonly codeChallenge?: string;
    readonly codeChallengeMethod?: CodeChallengeMethod;
    readonly googleClientId?: string;
    readonly launch?: string;
    readonly redirectUri?: string;
}
export interface EmailPasswordLoginRequest extends BaseLoginRequest {
    readonly email: string;
    readonly password: string;
    /** @deprecated Use scope of "offline" or "offline_access" instead. */
    readonly remember?: boolean;
}
export interface NewUserRequest {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly recaptchaToken: string;
    readonly recaptchaSiteKey?: string;
    readonly remember?: boolean;
    readonly projectId?: string;
    readonly clientId?: string;
}
export interface NewProjectRequest {
    readonly login: string;
    readonly projectName: string;
}
export interface NewPatientRequest {
    readonly login: string;
    readonly projectId: string;
}
export interface GoogleCredentialResponse {
    readonly clientId: string;
    readonly credential: string;
}
export interface GoogleLoginRequest extends BaseLoginRequest {
    readonly googleClientId: string;
    readonly googleCredential: string;
    readonly createUser?: boolean;
}
export interface LoginAuthenticationResponse {
    readonly login: string;
    readonly mfaEnrollRequired?: boolean;
    readonly mfaRequired?: boolean;
    readonly enrollQrCode?: string;
    readonly code?: string;
    readonly memberships?: ProjectMembership[];
}
export interface LoginProfileResponse {
    readonly login: string;
    readonly scope: string;
}
export interface LoginScopeResponse {
    readonly login: string;
    readonly code: string;
}
export interface LoginState {
    readonly project: Reference<Project>;
    readonly profile: Reference<ProfileResource>;
    readonly accessToken: string;
    readonly refreshToken: string;
}
export interface TokenResponse {
    readonly token_type: string;
    readonly id_token: string;
    readonly access_token: string;
    readonly refresh_token: string;
    readonly expires_in: number;
    readonly project: Reference<Project>;
    readonly profile: Reference<ProfileResource>;
}
export interface BotEvent<T = unknown> {
    readonly bot: Reference<Bot>;
    readonly contentType: string;
    readonly input: T;
    readonly secrets: Record<string, ProjectSetting>;
    readonly traceId?: string;
    readonly requester?: Reference<Bot | ClientApplication | Patient | Practitioner | RelatedPerson>;
    /** Headers from the original request, when invoked by HTTP request */
    readonly headers?: Record<string, string | string[] | undefined>;
}
export interface InviteRequest {
    resourceType: 'Patient' | 'Practitioner' | 'RelatedPerson';
    firstName: string;
    lastName: string;
    email?: string;
    externalId?: string;
    scope?: 'project' | 'server';
    password?: string;
    sendEmail?: boolean;
    membership?: Partial<ProjectMembership>;
    upsert?: boolean;
    forceNewMembership?: boolean;
    mfaRequired?: boolean;
    /** @deprecated Use membership.accessPolicy instead. */
    accessPolicy?: Reference<AccessPolicy>;
    /** @deprecated Use membership.access instead. */
    access?: ProjectMembershipAccess[];
    /** @deprecated Use membership.admin instead. */
    admin?: boolean;
}
export type RateLimitInfo = {
    /** Name of the rate limiter. */
    name: string;
    /** Remaining rate limit quota units. */
    remainingUnits: number;
    /** Number of seconds until the rate limit resets to its full quota. */
    secondsUntilReset: number;
    /** Timestamp (seconds from 1970-01-01T00:00:00Z) after which the rate limiter resets to its full quota. */
    resetsAfter: number;
};
/**
 * JSONPatch patch operation.
 * Compatible with fast-json-patch and rfc6902 Operation.
 */
export interface PatchOperation {
    readonly op: 'add' | 'remove' | 'replace' | 'copy' | 'move' | 'test';
    readonly path: string;
    readonly value?: any;
}
/**
 * Source for a FHIR Binary.
 */
export type BinarySource = string | File | Blob | Uint8Array;
/**
 * Binary upload options.
 */
export interface CreateBinaryOptions {
    /**
     * The binary data to upload.
     */
    readonly data: BinarySource;
    /**
     * Content type for the binary.
     */
    readonly contentType: string;
    /**
     * Optional filename for the binary.
     */
    readonly filename?: string;
    /**
     * Optional security context for the binary.
     */
    readonly securityContext?: Reference;
    /**
     * Optional fetch options. **NOTE:** only `requestOptions.signal` is respected when `onProgress` is also provided.
     */
    readonly onProgress?: (e: ProgressEvent) => void;
}
export interface CreateMediaOptions extends CreateBinaryOptions {
    /**
     * Optional additional fields for the Media resource.
     */
    readonly additionalFields?: Partial<Media>;
}
export interface CreateDocumentReferenceOptions extends CreateBinaryOptions {
    /**
     * Optional additional fields for the DocumentReference resource.
     */
    readonly additionalFields?: Omit<Partial<DocumentReference>, 'content'>;
}
/**
 * PDF upload options.
 */
export interface CreatePdfOptions extends Omit<CreateBinaryOptions, 'data' | 'contentType'> {
    /**
     * The PDF document definition. See {@link https://pdfmake.github.io/docs/0.1/document-definition-object/}
     */
    readonly docDefinition: TDocumentDefinitions;
    /**
     * Optional pdfmake custom table layout.
     */
    readonly tableLayouts?: Record<string, CustomTableLayout>;
    /**
     * Optional pdfmake custom font dictionary.
     */
    readonly fonts?: TFontDictionary;
}
export interface ReadHistoryOptions {
    readonly count?: number;
    readonly offset?: number;
}
/**
 * Email address definition.
 * Compatible with nodemailer Mail.Address.
 */
export interface MailAddress {
    readonly name: string;
    readonly address: string;
}
/**
 * Email destination definition.
 */
export type MailDestination = string | MailAddress | string[] | MailAddress[];
/**
 * Email attachment definition.
 * Compatible with nodemailer Mail.Options.
 */
export interface MailAttachment {
    /** String, Buffer or a Stream contents for the attachment */
    readonly content?: string;
    /** path to a file or an URL (data uris are allowed as well) if you want to stream the file instead of including it (better for larger attachments) */
    readonly path?: string;
    /** filename to be reported as the name of the attached file, use of unicode is allowed. If you do not want to use a filename, set this value as false, otherwise a filename is generated automatically */
    readonly filename?: string | false;
    /** optional content type for the attachment, if not set will be derived from the filename property */
    readonly contentType?: string;
}
/**
 * Email message definition.
 * Compatible with nodemailer Mail.Options.
 */
export interface MailOptions {
    /** The e-mail address of the sender. All e-mail addresses can be plain `sender@server.com` or formatted `Sender Name <sender@server.com>` */
    readonly from?: string | MailAddress;
    /** An e-mail address that will appear on the Sender: field */
    readonly sender?: string | MailAddress;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the To: field */
    readonly to?: MailDestination;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field */
    readonly cc?: MailDestination;
    /** Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field */
    readonly bcc?: MailDestination;
    /** An e-mail address that will appear on the Reply-To: field */
    readonly replyTo?: string | MailAddress;
    /** The subject of the e-mail */
    readonly subject?: string;
    /** The plaintext version of the message */
    readonly text?: string;
    /** The HTML version of the message */
    readonly html?: string;
    /** An array of attachment objects */
    readonly attachments?: MailAttachment[];
}
export interface RequestCacheEntry {
    readonly requestTime: number;
    readonly value: ReadablePromise<any>;
}
/**
 * OAuth 2.0 Grant Type Identifiers
 * Standard identifiers: {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-07#name-grant-types}
 * JWT bearer extension: {@link https://datatracker.ietf.org/doc/html/rfc7523}
 * Token exchange extension: {@link https://datatracker.ietf.org/doc/html/rfc8693}
 */
export declare const OAuthGrantType: {
    readonly ClientCredentials: "client_credentials";
    readonly AuthorizationCode: "authorization_code";
    readonly RefreshToken: "refresh_token";
    readonly JwtBearer: "urn:ietf:params:oauth:grant-type:jwt-bearer";
    readonly TokenExchange: "urn:ietf:params:oauth:grant-type:token-exchange";
};
export type OAuthGrantType = (typeof OAuthGrantType)[keyof typeof OAuthGrantType];
/**
 * OAuth 2.0 Token Type Identifiers
 * See {@link https://datatracker.ietf.org/doc/html/rfc8693#name-token-type-identifiers | RFC 8693 Section 3.1} for full details.
 */
export declare const OAuthTokenType: {
    /** Indicates that the token is an OAuth 2.0 access token issued by the given authorization server. */
    readonly AccessToken: "urn:ietf:params:oauth:token-type:access_token";
    /** Indicates that the token is an OAuth 2.0 refresh token issued by the given authorization server. */
    readonly RefreshToken: "urn:ietf:params:oauth:token-type:refresh_token";
    /** Indicates that the token is an ID Token as defined in Section 2 of [OpenID.Core]. */
    readonly IdToken: "urn:ietf:params:oauth:token-type:id_token";
    /** Indicates that the token is a base64url-encoded SAML 1.1 [OASIS.saml-core-1.1] assertion. */
    readonly Saml1Token: "urn:ietf:params:oauth:token-type:saml1";
    /** Indicates that the token is a base64url-encoded SAML 2.0 [OASIS.saml-core-2.0-os] assertion. */
    readonly Saml2Token: "urn:ietf:params:oauth:token-type:saml2";
};
export type OAuthTokenType = (typeof OAuthTokenType)[keyof typeof OAuthTokenType];
/**
 * OAuth 2.0 Client Authentication Methods
 * See: https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication
 */
export declare const OAuthTokenAuthMethod: {
    readonly ClientSecretBasic: "client_secret_basic";
    readonly ClientSecretPost: "client_secret_post";
    readonly ClientSecretJwt: "client_secret_jwt";
    readonly PrivateKeyJwt: "private_key_jwt";
    readonly None: "none";
};
export type OAuthTokenAuthMethod = (typeof OAuthTokenAuthMethod)[keyof typeof OAuthTokenAuthMethod];
/**
 * OAuth 2.0 Client Authentication Methods
 * See {@link https://datatracker.ietf.org/doc/html/rfc7523#section-2.2 | RFC 7523 Section 2.2} for full details.
 */
export declare const OAuthClientAssertionType: {
    /** Using JWTs for Client Authentication */
    readonly JwtBearer: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
};
export type OAuthClientAssertionType = (typeof OAuthClientAssertionType)[keyof typeof OAuthClientAssertionType];
/**
 * OAuth Signing Algorithms
 * See {@link https://datatracker.ietf.org/doc/html/rfc7519 | RFC 7519} for full details.
 */
export declare const OAuthSigningAlgorithm: {
    readonly ES256: "ES256";
    readonly ES384: "ES384";
    readonly ES512: "ES512";
    readonly HS256: "HS256";
    readonly RS256: "RS256";
    readonly RS384: "RS384";
    readonly RS512: "RS512";
};
export type OAuthSigningAlgorithm = (typeof OAuthSigningAlgorithm)[keyof typeof OAuthSigningAlgorithm];
/**
 * ValueSet $expand operation parameters.
 * See {@link https://hl7.org/fhir/r4/valueset-operation-expand.html | FHIR ValueSet $expand Operation Parameters} for full details.
 */
export interface ValueSetExpandParams {
    url?: string;
    filter?: string;
    date?: string;
    offset?: number;
    count?: number;
    displayLanguage?: string;
}
export interface RequestProfileSchemaOptions extends MedplumRequestOptions {
    /** (optional) Whether to include nested profiles, e.g. from extensions. Defaults to false. */
    expandProfile?: boolean;
}
/**
 * This map enumerates all the lifecycle events that `MedplumClient` emits and what the shape of the `Event` is.
 */
export type MedplumClientEventMap = {
    change: {
        type: 'change';
    };
    offline: {
        type: 'offline';
    };
    profileRefreshing: {
        type: 'profileRefreshing';
    };
    profileRefreshed: {
        type: 'profileRefreshed';
    };
    storageInitialized: {
        type: 'storageInitialized';
    };
    storageInitFailed: {
        type: 'storageInitFailed';
        payload: {
            error: Error;
        };
    };
};
/**
 * The MedplumClient class provides a client for the Medplum FHIR server.
 *
 * The client can be used in the browser, in a Node.js application, or in a Medplum Bot.
 *
 * The client provides helpful methods for common operations such as:
 *   1. Authenticating
 *   2. Creating resources
 *   3. Reading resources
 *   4. Updating resources
 *   5. Deleting resources
 *   6. Searching
 *   7. Making GraphQL queries
 *
 * The client can also be used to integrate with other FHIR servers. For an example, see the {@link https://github.com/medplum/medplum/tree/main/examples/medplum-demo-bots/src/epic | Epic Connection Demo Bot}.
 *
 * @example
 * Here is a quick example of how to use the client:
 *
 * ```typescript
 * import { MedplumClient } from '@medplum/core';
 * const medplum = new MedplumClient();
 * ```
 *
 * @example
 * Create a `Patient`:
 *
 * ```typescript
 * const patient = await medplum.createResource({
 *   resourceType: 'Patient',
 *   name: [{
 *     given: ['Alice'],
 *     family: 'Smith'
 *   }]
 * });
 * ```
 *
 * @example
 * Read a `Patient` by ID:
 *
 * ```typescript
 * const patient = await medplum.readResource('Patient', '123');
 * console.log(patient.name[0].given[0]);
 * ```
 *
 * @example
 * Search for a `Patient` by name:
 *
 * ```typescript
 * const bundle = await medplum.search('Patient', 'name=Alice');
 * console.log(bundle.total);
 * ```
 *
 *  <head>
 *    <meta name="algolia:pageRank" content="100" />
 *  </head>
 */
export declare class MedplumClient extends TypedEventTarget<MedplumClientEventMap> {
    private readonly options;
    private readonly fetch;
    private readonly createPdfImpl?;
    private readonly storage;
    private readonly locationUtils;
    protected readonly requestCache: LRUCache<RequestCacheEntry> | undefined;
    private readonly cacheTime;
    private readonly baseUrl;
    private readonly fhirBaseUrl;
    private readonly authorizeUrl;
    private readonly tokenUrl;
    private readonly logoutUrl;
    private readonly fhircastHubUrl;
    private readonly defaultHeaders;
    private readonly onUnauthenticated?;
    private readonly autoBatchTime;
    private readonly autoBatchQueue;
    private readonly refreshGracePeriod;
    private subscriptionManager?;
    private medplumServer?;
    private clientId?;
    private clientSecret?;
    private credentialsInHeader;
    private autoBatchTimerId?;
    private accessToken?;
    private accessTokenExpires?;
    private refreshToken?;
    private refreshPromise?;
    private profilePromise?;
    private sessionDetails?;
    private currentRateLimits?;
    private basicAuth?;
    private initPromise;
    private initComplete;
    private keyValueClient?;
    private logLevel;
    constructor(options?: MedplumClientOptions);
    /**
     * @returns Whether the client has been fully initialized or not. Should always be true unless a custom asynchronous `ClientStorage` was passed into the constructor.
     */
    get isInitialized(): boolean;
    /**
     * Gets a Promise that resolves when async initialization is complete. This is particularly useful for waiting for an async `ClientStorage` and/or authentication to finish.
     * @returns A Promise that resolves when any async initialization of the client is finished.
     */
    getInitPromise(): Promise<void>;
    /**
     * Initializes the log level with backward compatibility for the verbose option.
     * @param options - The client options.
     * @returns The initialized log level.
     */
    private initializeLogLevel;
    private attemptResumeActiveLogin;
    /**
     * Returns the current base URL for all API requests.
     * By default, this is set to `https://api.medplum.com/`.
     * This can be overridden by setting the `baseUrl` option when creating the client.
     * @category HTTP
     * @returns The current base URL for all API requests.
     */
    getBaseUrl(): string;
    /**
     * Returns the current authorize URL.
     * By default, this is set to `https://api.medplum.com/oauth2/authorize`.
     * This can be overridden by setting the `authorizeUrl` option when creating the client.
     * @category HTTP
     * @returns The current authorize URL.
     */
    getAuthorizeUrl(): string;
    /**
     * Returns the current token URL.
     * By default, this is set to `https://api.medplum.com/oauth2/token`.
     * This can be overridden by setting the `tokenUrl` option when creating the client.
     * @category HTTP
     * @returns The current token URL.
     */
    getTokenUrl(): string;
    /**
     * Returns the current logout URL.
     * By default, this is set to `https://api.medplum.com/oauth2/logout`.
     * This can be overridden by setting the `logoutUrl` option when creating the client.
     * @category HTTP
     * @returns The current logout URL.
     */
    getLogoutUrl(): string;
    /**
     * Returns the current FHIRcast Hub URL.
     * By default, this is set to `https://api.medplum.com/fhircast/STU3`.
     * This can be overridden by setting the `logoutUrl` option when creating the client.
     * @category HTTP
     * @returns The current FHIRcast Hub URL.
     */
    getFhircastHubUrl(): string;
    /**
     * Returns default headers to include in all requests.
     * This can be used to set custom headers such as Cookies or Authorization headers.
     * @category HTTP
     * @returns Default headers to include in all requests.
     */
    getDefaultHeaders(): Record<string, string>;
    /**
     * Clears all auth state including local storage and session storage.
     * @category Authentication
     */
    clear(): void;
    /**
     * Clears the active login from local storage.
     * Does not clear all local storage (such as other logins).
     * @category Authentication
     */
    clearActiveLogin(): void;
    /**
     * Invalidates any cached values or cached requests for the given URL.
     * @category Caching
     * @param url - The URL to invalidate.
     */
    invalidateUrl(url: URL | string): void;
    /**
     * Invalidates all cached values and flushes the cache.
     * @category Caching
     */
    invalidateAll(): void;
    /**
     * Invalidates all cached search results or cached requests for the given resourceType.
     * @category Caching
     * @param resourceType - The resource type to invalidate.
     */
    invalidateSearches(resourceType: ResourceType): void;
    /**
     * Makes an HTTP GET request to the specified URL.
     *
     * This is a lower level method for custom requests.
     * For common operations, we recommend using higher level methods
     * such as `readResource()`, `search()`, etc.
     * @category HTTP
     * @param url - The target URL.
     * @param options - Optional fetch options.
     * @returns Promise to the response content.
     */
    get<T = any>(url: URL | string, options?: MedplumRequestOptions): ReadablePromise<T>;
    /**
     * Makes an HTTP POST request to the specified URL.
     *
     * This is a lower level method for custom requests.
     * For common operations, we recommend using higher level methods
     * such as `createResource()`.
     * @category HTTP
     * @param url - The target URL.
     * @param body - The content body. Strings and `File` objects are passed directly. Other objects are converted to JSON.
     * @param contentType - The content type to be included in the "Content-Type" header.
     * @param options - Optional fetch options.
     * @returns Promise to the response content.
     */
    post(url: URL | string, body?: any, contentType?: string, options?: MedplumRequestOptions): Promise<any>;
    /**
     * Makes an HTTP PUT request to the specified URL.
     *
     * This is a lower level method for custom requests.
     * For common operations, we recommend using higher level methods
     * such as `updateResource()`.
     * @category HTTP
     * @param url - The target URL.
     * @param body - The content body. Strings and `File` objects are passed directly. Other objects are converted to JSON.
     * @param contentType - The content type to be included in the "Content-Type" header.
     * @param options - Optional fetch options.
     * @returns Promise to the response content.
     */
    put(url: URL | string, body: any, contentType?: string, options?: MedplumRequestOptions): Promise<any>;
    /**
     * Makes an HTTP PATCH request to the specified URL.
     *
     * This is a lower level method for custom requests.
     * For common operations, we recommend using higher level methods
     * such as `patchResource()`.
     * @category HTTP
     * @param url - The target URL.
     * @param operations - Array of JSONPatch operations.
     * @param options - Optional fetch options.
     * @returns Promise to the response content.
     */
    patch(url: URL | string, operations: PatchOperation[], options?: MedplumRequestOptions): Promise<any>;
    /**
     * Makes an HTTP DELETE request to the specified URL.
     *
     *
     * This is a lower level method for custom requests.
     * For common operations, we recommend using higher level methods
     * such as `deleteResource()`.
     * @category HTTP
     * @param url - The target URL.
     * @param options - Optional fetch options.
     * @returns Promise to the response content.
     */
    delete(url: URL | string, options?: MedplumRequestOptions): Promise<any>;
    /**
     * Initiates a new user flow.
     *
     * This method is part of the two different user registration flows:
     * 1) New Practitioner and new Project
     * 2) New Patient registration
     * @category Authentication
     * @param newUserRequest - Register request including email and password.
     * @param options - Optional fetch options.
     * @returns Promise to the authentication response.
     */
    startNewUser(newUserRequest: NewUserRequest, options?: MedplumRequestOptions): Promise<LoginAuthenticationResponse>;
    /**
     * Initiates a new project flow.
     *
     * This requires a partial login from `startNewUser` or `startNewGoogleUser`.
     * @param newProjectRequest - Register request including email and password.
     * @param options - Optional fetch options.
     * @returns Promise to the authentication response.
     */
    startNewProject(newProjectRequest: NewProjectRequest, options?: MedplumRequestOptions): Promise<LoginAuthenticationResponse>;
    /**
     * Initiates a new patient flow.
     *
     * This requires a partial login from `startNewUser` or `startNewGoogleUser`.
     * @param newPatientRequest - Register request including email and password.
     * @param options - Optional fetch options.
     * @returns Promise to the authentication response.
     */
    startNewPatient(newPatientRequest: NewPatientRequest, options?: MedplumRequestOptions): Promise<LoginAuthenticationResponse>;
    /**
     * Initiates a user login flow.
     * @category Authentication
     * @param loginRequest - Login request including email and password.
     * @param options - Optional fetch options.
     * @returns Promise to the authentication response.
     */
    startLogin(loginRequest: EmailPasswordLoginRequest, options?: MedplumRequestOptions): Promise<LoginAuthenticationResponse>;
    /**
     * Tries to sign in with Google authentication.
     * The response parameter is the result of a Google authentication.
     * See {@link https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions | Google Sign-In Credential Response} for full details.
     * @category Authentication
     * @param loginRequest - Login request including Google credential response.
     * @param options - Optional fetch options.
     * @returns Promise to the authentication response.
     */
    startGoogleLogin(loginRequest: GoogleLoginRequest, options?: MedplumRequestOptions): Promise<LoginAuthenticationResponse>;
    /**
     * Returns the PKCE code challenge and method.
     * If the login request already includes a code challenge, it is returned.
     * Otherwise, a new PKCE code challenge is generated.
     * @category Authentication
     * @param loginRequest - The original login request.
     * @returns The PKCE code challenge and method.
     */
    ensureCodeChallenge<T extends BaseLoginRequest>(loginRequest: T): Promise<T>;
    /**
     * Signs out the client.
     * This revokes the current token and clears token from the local cache.
     * @category Authentication
     */
    signOut(): Promise<void>;
    /**
     * Tries to sign in the user.
     * Returns true if the user is signed in.
     * This may result in navigating away to the sign in page.
     * @category Authentication
     * @param loginParams - Optional login parameters.
     * @returns The user profile resource if available.
     */
    signInWithRedirect(loginParams?: Partial<BaseLoginRequest>): Promise<ProfileResource | undefined>;
    /**
     * Tries to sign out the user.
     * See: https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html
     * @category Authentication
     */
    signOutWithRedirect(): void;
    /**
     * Initiates sign in with an external identity provider.
     * @param authorizeUrl - The external authorization URL.
     * @param clientId - The external client ID.
     * @param redirectUri - The external identity provider redirect URI.
     * @param baseLogin - The Medplum login request.
     * @param pkceEnabled - Whether `PKCE` should be enabled for this external auth request. Defaults to `true`.
     * @category Authentication
     */
    signInWithExternalAuth(authorizeUrl: string, clientId: string, redirectUri: string, baseLogin: BaseLoginRequest, pkceEnabled?: boolean): Promise<void>;
    /**
     * Exchange an external access token for a Medplum access token.
     * @param token - The access token that was generated by the external identity provider.
     * @param clientId - The ID of the `ClientApplication` in your Medplum project that will be making the exchange request.
     * @returns The user profile resource.
     * @category Authentication
     */
    exchangeExternalAccessToken(token: string, clientId?: string): Promise<ProfileResource>;
    /**
     * Builds the external identity provider redirect URI.
     * @param authorizeUrl - The external authorization URL.
     * @param clientId - The external client ID.
     * @param redirectUri - The external identity provider redirect URI.
     * @param loginRequest - The Medplum login request.
     * @param pkceEnabled - Whether `PKCE` should be enabled for this external auth request. Defaults to `true`.
     * @returns The external identity provider redirect URI.
     * @category Authentication
     */
    getExternalAuthRedirectUri(authorizeUrl: string, clientId: string, redirectUri: string, loginRequest: BaseLoginRequest, pkceEnabled?: boolean): string;
    /**
     * Builds a FHIR URL from a collection of URL path components.
     * For example, `fhirUrl('Patient', '123')` returns `fhir/R4/Patient/123`.
     * @category HTTP
     * @param path - The path component of the URL.
     * @returns The well-formed FHIR URL.
     */
    fhirUrl(...path: string[]): URL;
    /**
     * Builds a FHIR search URL from a search query or structured query object.
     * @category HTTP
     * @category Search
     * @param resourceType - The FHIR resource type.
     * @param query - The FHIR search query or structured query object. Can be any valid input to the URLSearchParams() constructor.
     * @returns The well-formed FHIR URL.
     */
    fhirSearchUrl(resourceType: ResourceType, query: QueryTypes): URL;
    /**
     * Sends a FHIR search request.
     *
     * @example
     * Example using a FHIR search string:
     *
     * ```typescript
     * const bundle = await client.search('Patient', 'name=Alice');
     * console.log(bundle);
     * ```
     *
     * @example
     * The return value is a FHIR bundle:
     *
     * ```json
     * {
     *    "resourceType": "Bundle",
     *    "type": "searchset",
     *    "entry": [
     *       {
     *          "resource": {
     *             "resourceType": "Patient",
     *             "name": [
     *                {
     *                   "given": [
     *                      "George"
     *                   ],
     *                   "family": "Washington"
     *                }
     *             ],
     *          }
     *       }
     *    ]
     * }
     * ```
     *
     * @example
     * To query the count of a search, use the summary feature like so:
     *
     * ```typescript
     * const patients = medplum.search('Patient', '_summary=count');
     * ```
     *
     * See {@link https://www.hl7.org/fhir/search.html | FHIR search} for full details.
     * @category Search
     * @param resourceType - The FHIR resource type.
     * @param query - Optional FHIR search query or structured query object. Can be any valid input to the URLSearchParams() constructor.
     * @param options - Optional fetch options.
     * @returns Promise to the search result bundle.
     */
    search<RT extends ResourceType>(resourceType: RT, query?: QueryTypes, options?: MedplumRequestOptions): ReadablePromise<Bundle<WithId<ExtractResource<RT>>>>;
    /**
     * Sends a FHIR search request for a single resource.
     *
     * This is a convenience method for `search()` that returns the first resource rather than a `Bundle`.
     *
     * @example
     * Example using a FHIR search string:
     *
     * ```typescript
     * const patient = await client.searchOne('Patient', 'identifier=123');
     * console.log(patient);
     * ```
     *
     * The return value is the resource, if available; otherwise, undefined.
     *
     * See {@link https://www.hl7.org/fhir/search.html | FHIR search} for full details.
     * @category Search
     * @param resourceType - The FHIR resource type.
     * @param query - Optional FHIR search query or structured query object. Can be any valid input to the URLSearchParams() constructor.
     * @param options - Optional fetch options.
     * @returns Promise to the first search result.
     */
    searchOne<RT extends ResourceType>(resourceType: RT, query?: QueryTypes, options?: MedplumRequestOptions): ReadablePromise<WithId<ExtractResource<RT>> | undefined>;
    /**
     * Sends a FHIR search request for an array of resources.
     *
     * This is a convenience method for `search()` that returns the resources as an array rather than a `Bundle`.
     *
     * @example
     * Example using a FHIR search string:
     *
     * ```typescript
     * const patients = await client.searchResources('Patient', 'name=Alice');
     * console.log(patients);
     * ```
     *
     * The return value is an array of resources.
     *
     * See {@link https://www.hl7.org/fhir/search.html | FHIR search} for full details.
     * @category Search
     * @param resourceType - The FHIR resource type.
     * @param query - Optional FHIR search query or structured query object. Can be any valid input to the URLSearchParams() constructor.
     * @param options - Optional fetch options.
     * @returns Promise to the array of search results.
     */
    searchResources<RT extends ResourceType>(resourceType: RT, query?: QueryTypes, options?: MedplumRequestOptions): ReadablePromise<ResourceArray<WithId<ExtractResource<RT>>>>;
    /**
     * Creates an
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator | async generator}
     * over a series of FHIR search requests for paginated search results. Each iteration of the generator yields
     * the array of resources on each page. Searches using _offset based pagination are limited to 10,000 records.
     * For larger result sets, _cursor based pagination should be used instead.
     *
     * See {@link https://www.medplum.com/docs/search/paginated-search#cursor-based-pagination | the docs} for more information.
     *
     * @example
     *
     * ```typescript
     * for await (const page of medplum.searchResourcePages('Patient', { _count: 10 })) {
     *  for (const patient of page) {
     *    console.log(`Processing Patient resource with ID: ${patient.id}`);
     *  }
     * }
     * ```
     *
     * @category Search
     * @param resourceType - The FHIR resource type.
     * @param query - Optional FHIR search query or structured query object. Can be any valid input to the URLSearchParams() constructor.
     * @param options - Optional fetch options.
     * @yields An async generator, where each result is an array of resources for each page.
     */
    searchResourcePages<RT extends ResourceType>(resourceType: RT, query?: QueryTypes, options?: MedplumRequestOptions): AsyncGenerator<ResourceArray<WithId<ExtractResource<RT>>>>;
    /**
     * Searches a ValueSet resource using the "expand" operation.
     * See: https://www.hl7.org/fhir/operation-valueset-expand.html
     * @category Search
     * @param params - The ValueSet expand parameters.
     * @param options - Optional fetch options.
     * @returns Promise to expanded ValueSet.
     */
    valueSetExpand(params: ValueSetExpandParams, options?: MedplumRequestOptions): ReadablePromise<ValueSet>;
    /**
     * Returns a cached resource if it is available.
     * @category Caching
     * @param resourceType - The FHIR resource type.
     * @param id - The FHIR resource ID.
     * @returns The resource if it is available in the cache; undefined otherwise.
     */
    getCached<RT extends ResourceType>(resourceType: RT, id: string): WithId<ExtractResource<RT>> | undefined;
    /**
     * Returns a cached resource if it is available.
     * @category Caching
     * @param reference - The FHIR reference.
     * @returns The resource if it is available in the cache; undefined otherwise.
     */
    getCachedReference<T extends Resource>(reference: Reference<T>): T | undefined;
    /**
     * Reads a resource by resource type and ID.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const patient = await medplum.readResource('Patient', '123');
     * console.log(patient);
     * ```
     *
     * See the FHIR "read" operation for full details: https://www.hl7.org/fhir/http.html#read
     * @category Read
     * @param resourceType - The FHIR resource type.
     * @param id - The resource ID.
     * @param options - Optional fetch options.
     * @returns The resource if available.
     */
    readResource<RT extends ResourceType>(resourceType: RT, id: string, options?: MedplumRequestOptions): ReadablePromise<WithId<ExtractResource<RT>>>;
    /**
     * Reads a resource by `Reference`.
     *
     * This is a convenience method for `readResource()` that accepts a `Reference` object.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const serviceRequest = await medplum.readResource('ServiceRequest', '123');
     * const patient = await medplum.readReference(serviceRequest.subject);
     * console.log(patient);
     * ```
     *
     * See the FHIR "read" operation for full details: https://www.hl7.org/fhir/http.html#read
     * @category Read
     * @param reference - The FHIR reference object.
     * @param options - Optional fetch options.
     * @returns The resource if available.
     */
    readReference<T extends Resource>(reference: Reference<T>, options?: MedplumRequestOptions): ReadablePromise<WithId<T>>;
    readCanonical<RT extends ResourceType>(resourceType: RT | RT[], url: string, options?: MedplumRequestOptions): ReadablePromise<WithId<ExtractResource<RT>> | undefined>;
    /**
     * Requests the schema for a resource type.
     * If the schema is already cached, the promise is resolved immediately.
     * @category Schema
     * @param resourceType - The FHIR resource type.
     * @param options - Optional fetch options.
     * @returns Promise to a schema with the requested resource type.
     */
    requestSchema(resourceType: string, options?: MedplumRequestOptions): Promise<void>;
    /**
     * Requests the schema for a profile.
     * If the schema is already cached, the promise is resolved immediately.
     * @category Schema
     * @param profileUrl - The FHIR URL of the profile
     * @param options - (optional) Additional options
     * @returns Promise for schema request.
     */
    requestProfileSchema(profileUrl: string, options?: RequestProfileSchemaOptions): Promise<void>;
    /**
     * Reads resource history by resource type and ID.
     *
     * The return value is a bundle of all versions of the resource.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const history = await medplum.readHistory('Patient', '123');
     * console.log(history);
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#history | FHIR "history" operation} for full details.
     * @category Read
     * @param resourceType - The FHIR resource type.
     * @param id - The resource ID.
     * @param options - Optional history options.
     * @param requestOptions - Optional fetch options.
     * @returns Promise to the resource history.
     */
    readHistory<RT extends ResourceType>(resourceType: RT, id: string, options?: ReadHistoryOptions, requestOptions?: MedplumRequestOptions): ReadablePromise<Bundle<WithId<ExtractResource<RT>>>>;
    /**
     * Reads a specific version of a resource by resource type, ID, and version ID.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const version = await medplum.readVersion('Patient', '123', '456');
     * console.log(version);
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#vread | FHIR "vread" operation} for full details.
     * @category Read
     * @param resourceType - The FHIR resource type.
     * @param id - The resource ID.
     * @param vid - The version ID.
     * @param options - Optional fetch options.
     * @returns The resource if available.
     */
    readVersion<RT extends ResourceType>(resourceType: RT, id: string, vid: string, options?: MedplumRequestOptions): ReadablePromise<WithId<ExtractResource<RT>>>;
    /**
     * Executes the Patient "everything" operation for a patient.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const bundle = await medplum.readPatientEverything('123');
     * console.log(bundle);
     * ```
     *
     * See the {@link https://hl7.org/fhir/operation-patient-everything.html | FHIR "patient-everything" operation} for full details.
     * @category Read
     * @param id - The Patient Id
     * @param options - Optional fetch options.
     * @returns A Bundle of all Resources related to the Patient
     */
    readPatientEverything(id: string, options?: MedplumRequestOptions): ReadablePromise<Bundle>;
    /**
     * Executes the Patient "summary" operation for a patient.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const bundle = await medplum.readPatientSummary('123');
     * console.log(bundle);
     * ```
     *
     * See the {@link https://build.fhir.org/ig/HL7/fhir-ips/index.html | International Patient Summary Implementation Guide} for full details.
     *
     * See the {@link https://build.fhir.org/ig/HL7/fhir-ips/OperationDefinition-summary.html | Patient summary operation} for full details.
     *
     * @param id - The Patient ID.
     * @param options - Optional fetch options.
     * @returns A patient summary bundle, organized into the patient summary sections.
     */
    readPatientSummary(id: string, options?: MedplumRequestOptions): ReadablePromise<Bundle>;
    /**
     * Creates a new FHIR resource.
     *
     * The return value is the newly created resource, including the ID and meta.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.createResource({
     *   resourceType: 'Patient',
     *   name: [{
     *    family: 'Smith',
     *    given: ['John']
     *   }]
     * });
     * console.log(result.id);
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#create | FHIR "create" operation} for full details.
     * @category Create
     * @param resource - The FHIR resource to create.
     * @param options - Optional fetch options.
     * @returns The result of the create operation.
     */
    createResource<T extends Resource>(resource: T, options?: MedplumRequestOptions): Promise<WithId<T>>;
    /**
     * Conditionally create a new FHIR resource only if some equivalent resource does not already exist on the server.
     *
     * The return value is the existing resource or the newly created resource, including the ID and meta.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.createResourceIfNoneExist(
     *   {
     *     resourceType: 'Patient',
     *     identifier: [{
     *      system: 'http://example.com/mrn',
     *      value: '123'
     *     }]
     *     name: [{
     *      family: 'Smith',
     *      given: ['John']
     *     }]
     *   },
     *   'identifier=123'
     * );
     * console.log(result.id);
     * ```
     *
     * This method is syntactic sugar for:
     *
     * ```typescript
     * return searchOne(resourceType, query) ?? createResource(resource);
     * ```
     *
     * The query parameter only contains the search parameters (what would be in the URL following the "?").
     *
     * See the {@link https://www.hl7.org/fhir/http.html#create | FHIR "conditional create" operation} for full details.
     * @category Create
     * @param resource - The FHIR resource to create.
     * @param query - The search query for an equivalent resource (should not include resource type or "?").
     * @param options - Optional fetch options.
     * @returns The result of the create operation.
     */
    createResourceIfNoneExist<T extends Resource>(resource: T, query: string, options?: MedplumRequestOptions): Promise<WithId<T>>;
    /**
     * Upsert a resource: update it in place if it exists, otherwise create it.  This is done in a single, transactional
     * request to guarantee data consistency.
     * @param resource - The resource to update or create.
     * @param query - A FHIR search query to uniquely identify the resource if it already exists.
     * @param options  - Optional fetch options.
     * @returns The updated/created resource.
     */
    upsertResource<T extends Resource>(resource: T, query: QueryTypes, options?: MedplumRequestOptions): Promise<WithId<T>>;
    /**
     * Creates a FHIR `Attachment` with the provided data content.
     *
     * This is a convenience method for creating a `Binary` resource and then creating an `Attachment` element.
     *
     * The `data` parameter can be a string or a `File` object.
     *
     * A `File` object often comes from a `<input type="file">` element.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.createAttachment(myFile, 'test.jpg', 'image/jpeg');
     * console.log(result);
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#create | FHIR "create" operation} for full details.
     * @category Create
     * @param createBinaryOptions -The binary options. See `CreateBinaryOptions` for full details.
     * @param requestOptions - Optional fetch options. **NOTE:** only `options.signal` is respected when `onProgress` is also provided.
     * @returns The result of the create operation.
     */
    createAttachment(createBinaryOptions: CreateBinaryOptions, requestOptions?: MedplumRequestOptions): Promise<Attachment>;
    /**
     * @category Create
     * @param data - The binary data to upload.
     * @param filename - Optional filename for the binary.
     * @param contentType - Content type for the binary.
     * @param onProgress - Optional callback for progress events. **NOTE:** only `options.signal` is respected when `onProgress` is also provided.
     * @param options - Optional fetch options. **NOTE:** only `options.signal` is respected when `onProgress` is also provided.
     * @returns The result of the create operation.
     * @deprecated Use `createAttachment` with `CreateBinaryOptions` instead. To be removed in a future version.
     */
    createAttachment(data: BinarySource, filename: string | undefined, contentType: string, onProgress?: (e: ProgressEvent) => void, options?: MedplumRequestOptions): Promise<Attachment>;
    /**
     * Creates a FHIR `Binary` resource with the provided data content.
     *
     * The return value is the newly created resource, including the ID and meta.
     *
     * The `data` parameter can be a string or a `File` object.
     *
     * A `File` object often comes from a `<input type="file">` element.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.createBinary(myFile, 'test.jpg', 'image/jpeg');
     * console.log(result.id);
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#create | FHIR "create" operation} for full details.
     *
     * @category Create
     * @param createBinaryOptions -The binary options. See `CreateBinaryOptions` for full details.
     * @param requestOptions - Optional fetch options. **NOTE:** only `options.signal` is respected when `onProgress` is also provided.
     * @returns The result of the create operation.
     */
    createBinary(createBinaryOptions: CreateBinaryOptions, requestOptions?: MedplumRequestOptions): Promise<WithId<Binary>>;
    /**
     * @category Create
     * @param data - The binary data to upload.
     * @param filename - Optional filename for the binary.
     * @param contentType - Content type for the binary.
     * @param onProgress - Optional callback for progress events. **NOTE:** only `options.signal` is respected when `onProgress` is also provided.
     * @param options - Optional fetch options. **NOTE:** only `options.signal` is respected when `onProgress` is also provided.
     * @returns The result of the create operation.
     * @deprecated Use `createBinary` with `CreateBinaryOptions` instead. To be removed in a future version.
     */
    createBinary(data: BinarySource, filename: string | undefined, contentType: string, onProgress?: (e: ProgressEvent) => void, options?: MedplumRequestOptions): Promise<WithId<Binary>>;
    uploadwithProgress(url: URL, data: BinarySource, contentType: string, onProgress: (e: ProgressEvent) => void, options?: MedplumRequestOptions): Promise<any>;
    /**
     * Creates a PDF as a FHIR `Binary` resource based on pdfmake document definition.
     *
     * The return value is the newly created resource, including the ID and meta.
     *
     * The `docDefinition` parameter is a pdfmake document definition.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.createPdf({
     *   content: ['Hello world']
     * });
     * console.log(result.id);
     * ```
     *
     * See the {@link https://pdfmake.github.io/docs/0.1/document-definition-object/ | pdfmake document definition} for full details.
     * @category Media
     * @param createPdfOptions - The PDF creation options. See `CreatePdfOptions` for full details.
     * @param requestOptions - Optional fetch options.
     * @returns The result of the create operation.
     */
    createPdf(createPdfOptions: CreatePdfOptions, requestOptions?: MedplumRequestOptions): Promise<WithId<Binary>>;
    /**
     * @category Media
     * @param docDefinition - The PDF document definition.
     * @param filename - Optional filename for the PDF binary resource.
     * @param tableLayouts - Optional pdfmake custom table layout.
     * @param fonts - Optional pdfmake custom font dictionary.
     * @returns The result of the create operation.
     * @deprecated Use `createPdf` with `CreatePdfOptions` instead. To be removed in a future version.
     */
    createPdf(docDefinition: TDocumentDefinitions, filename: string | undefined, tableLayouts?: Record<string, CustomTableLayout>, fonts?: TFontDictionary): Promise<WithId<Binary>>;
    /**
     * Creates a FHIR `Communication` resource with the provided data content.
     *
     * This is a convenience method to handle common cases where a `Communication` resource is created with a `payload`.
     * @category Create
     * @param resource - The FHIR resource to comment on.
     * @param text - The text of the comment.
     * @param options - Optional fetch options.
     * @returns The result of the create operation.
     */
    createComment(resource: Resource, text: string, options?: MedplumRequestOptions): Promise<WithId<Communication>>;
    /**
     * Updates a FHIR resource.
     *
     * The return value is the updated resource, including the ID and meta.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.updateResource({
     *   resourceType: 'Patient',
     *   id: '123',
     *   name: [{
     *    family: 'Smith',
     *    given: ['John']
     *   }]
     * });
     * console.log(result.meta.versionId);
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#update | FHIR "update" operation} for full details.
     * @category Write
     * @param resource - The FHIR resource to update.
     * @param options - Optional fetch options.
     * @returns The result of the update operation.
     */
    updateResource<T extends Resource>(resource: T, options?: MedplumRequestOptions): Promise<WithId<T>>;
    /**
     * Updates a FHIR resource using JSONPatch operations.
     *
     * The return value is the updated resource, including the ID and meta.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.patchResource('Patient', '123', [
     *   {op: 'replace', path: '/name/0/family', value: 'Smith'},
     * ]);
     * console.log(result.meta.versionId);
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#patch | FHIR "update" operation} for full details.
     *
     * See the {@link https://tools.ietf.org/html/rfc6902 | JSONPatch specification} for full details.
     * @category Write
     * @param resourceType - The FHIR resource type.
     * @param id - The resource ID.
     * @param operations - The JSONPatch operations.
     * @param options - Optional fetch options.
     * @returns The result of the patch operations.
     */
    patchResource<RT extends ResourceType>(resourceType: RT, id: string, operations: PatchOperation[], options?: MedplumRequestOptions): Promise<WithId<ExtractResource<RT>>>;
    /**
     * Deletes a FHIR resource by resource type and ID.
     *
     * @example
     * Example:
     *
     * ```typescript
     * await medplum.deleteResource('Patient', '123');
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/http.html#delete | FHIR "delete" operation} for full details.
     * @category Delete
     * @param resourceType - The FHIR resource type.
     * @param id - The resource ID.
     * @param options - Optional fetch options.
     * @returns The result of the delete operation.
     */
    deleteResource(resourceType: ResourceType, id: string, options?: MedplumRequestOptions): Promise<any>;
    /**
     * Executes the validate operation with the provided resource.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.validateResource({
     *   resourceType: 'Patient',
     *   name: [{ given: ['Alice'], family: 'Smith' }],
     * });
     * ```
     *
     * See the {@link https://www.hl7.org/fhir/resource-operation-validate.html | FHIR "$validate" operation} for full details.
     * @param resource - The FHIR resource.
     * @param options - Optional fetch options.
     * @returns The validate operation outcome.
     */
    validateResource<T extends Resource>(resource: T, options?: MedplumRequestOptions): Promise<OperationOutcome>;
    /**
     * Executes a bot by ID or Identifier.
     * @param idOrIdentifier - The Bot ID or Identifier.
     * @param body - The content body. Strings and `File` objects are passed directly. Other objects are converted to JSON.
     * @param contentType - The content type to be included in the "Content-Type" header.
     * @param options - Optional fetch options.
     * @returns The Bot return value.
     */
    executeBot(idOrIdentifier: string | Identifier, body: any, contentType?: string, options?: MedplumRequestOptions): Promise<any>;
    /**
     * Executes a batch or transaction of FHIR operations.
     *
     * @example
     * Example:
     *
     * ```typescript
     * await medplum.executeBatch({
     *   "resourceType": "Bundle",
     *   "type": "transaction",
     *   "entry": [
     *     {
     *       "fullUrl": "urn:uuid:61ebe359-bfdc-4613-8bf2-c5e300945f0a",
     *       "resource": {
     *         "resourceType": "Patient",
     *         "name": [{ "use": "official", "given": ["Alice"], "family": "Smith" }],
     *         "gender": "female",
     *         "birthDate": "1974-12-25"
     *       },
     *       "request": {
     *         "method": "POST",
     *         "url": "Patient"
     *       }
     *     },
     *     {
     *       "fullUrl": "urn:uuid:88f151c0-a954-468a-88bd-5ae15c08e059",
     *       "resource": {
     *         "resourceType": "Patient",
     *         "identifier": [{ "system": "http:/example.org/fhir/ids", "value": "234234" }],
     *         "name": [{ "use": "official", "given": ["Bob"], "family": "Jones" }],
     *         "gender": "male",
     *         "birthDate": "1974-12-25"
     *       },
     *       "request": {
     *         "method": "POST",
     *         "url": "Patient",
     *         "ifNoneExist": "identifier=http:/example.org/fhir/ids|234234"
     *       }
     *     }
     *   ]
     * });
     * ```
     *
     * See the {@link https://hl7.org/fhir/http.html#transaction | FHIR "batch/transaction" section} for full details.
     * @category Batch
     * @param bundle - The FHIR batch/transaction bundle.
     * @param options - Optional fetch options.
     * @returns The FHIR batch/transaction response bundle.
     */
    executeBatch(bundle: Bundle, options?: MedplumRequestOptions): Promise<Bundle>;
    /**
     * Sends an email using the Medplum Email API.
     *
     * Builds the email using nodemailer MailComposer.
     *
     * Examples:
     *
     * @example
     * Send a simple text email:
     *
     * ```typescript
     * await medplum.sendEmail({
     *   to: 'alice@example.com',
     *   cc: 'bob@example.com',
     *   subject: 'Hello',
     *   text: 'Hello Alice',
     * });
     * ```
     *
     * @example
     * Send an email with a `Binary` attachment:
     *
     * ```typescript
     * await medplum.sendEmail({
     *   to: 'alice@example.com',
     *   subject: 'Email with attachment',
     *   text: 'See the attached report',
     *   attachments: [{
     *     filename: 'report.pdf',
     *     path: "Binary/" + binary.id
     *   }]
     * });
     * ```
     *
     * See the {@link https://nodemailer.com/extras/mailcomposer/ | nodemailer MailComposer options} for full details.
     * @category Media
     * @param email - The MailComposer options.
     * @param options - Optional fetch options.
     * @returns Promise to the operation outcome.
     */
    sendEmail(email: MailOptions, options?: MedplumRequestOptions): Promise<OperationOutcome>;
    /**
     * Executes a GraphQL query.
     *
     * @example
     * Example:
     *
     * ```typescript
     * const result = await medplum.graphql(`{
     *   Patient(id: "123") {
     *     resourceType
     *     id
     *     name {
     *       given
     *       family
     *     }
     *   }
     * }`);
     * ```
     *
     * @example
     * Advanced queries such as named operations and variable substitution are supported:
     *
     * ```typescript
     * const result = await medplum.graphql(
     *   `query GetPatientById($patientId: ID!) {
     *     Patient(id: $patientId) {
     *       resourceType
     *       id
     *       name {
     *         given
     *         family
     *       }
     *     }
     *   }`,
     *   'GetPatientById',
     *   { patientId: '123' }
     * );
     * ```
     *
     * See the {@link https://graphql.org/learn/ | GraphQL documentation} for more details.
     *
     * See the {@link https://www.hl7.org/fhir/graphql.html | FHIR GraphQL documentation} for FHIR specific details.
     * @category Read
     * @param query - The GraphQL query.
     * @param operationName - Optional GraphQL operation name.
     * @param variables - Optional GraphQL variables.
     * @param options - Optional fetch options.
     * @returns The GraphQL result.
     */
    graphql(query: string, operationName?: string | null, variables?: any, options?: MedplumRequestOptions): Promise<any>;
    /**
     * Executes the $graph operation on this resource to fetch a Bundle of resources linked to the target resource
     * according to a graph definition
     * @category Read
     * @param resourceType - The FHIR resource type.
     * @param id - The resource ID.
     * @param graphName - `name` parameter of the GraphDefinition
     * @param options - Optional fetch options.
     * @returns A Bundle
     */
    readResourceGraph(resourceType: ResourceType, id: string, graphName: string, options?: MedplumRequestOptions): ReadablePromise<Bundle>;
    /**
     * Pushes a message to an agent.
     *
     * @param agent - The agent to push to.
     * @param destination - The destination device.
     * @param body - The message body.
     * @param contentType - Optional message content type.
     * @param waitForResponse - Optional wait for response flag.
     * @param options - Optional fetch options.
     * @returns Promise to the result. If waiting for response, the result is the response body. Otherwise, it is an operation outcome.
     */
    pushToAgent(agent: Agent | Reference<Agent>, destination: Device | Reference<Device> | string, body: any, contentType?: string, waitForResponse?: boolean, options?: PushToAgentOptions): Promise<any>;
    /**
     * Reads the list of available CDS services.
     * @param options - Optional fetch options.
     * @returns The list of CDS services.
     */
    getCdsServices(options?: MedplumRequestOptions): Promise<CdsDiscoveryResponse>;
    /**
     * Calls a CDS service by ID.
     * @param id - The CDS service ID.
     * @param body - The CDS request body.
     * @param options - Optional fetch options.
     * @returns The CDS response.
     */
    callCdsService(id: string, body: CdsRequest, options?: MedplumRequestOptions): Promise<CdsResponse>;
    /**
     * @category Authentication
     * @returns The Login State
     */
    getActiveLogin(): LoginState | undefined;
    /**
     * Sets the active login.
     * @param login - The new active login state.
     * @category Authentication
     */
    setActiveLogin(login: LoginState): Promise<void>;
    /**
     * Returns the current access token.
     * @returns The current access token.
     * @category Authentication
     */
    getAccessToken(): string | undefined;
    /**
     * Returns whether the client has a valid access token or not.
     * @param gracePeriod - Optional grace period in milliseconds. If not specified, uses the client configured grace period (default 5 minutes).
     * @returns Boolean indicating whether or not the client is authenticated.
     *
     * **NOTE: Does not check whether the auth token has been revoked server-side.**
     */
    isAuthenticated(gracePeriod?: number): boolean;
    /**
     * Sets the current access token.
     * @param accessToken - The new access token.
     * @param refreshToken - Optional refresh token.
     * @category Authentication
     */
    setAccessToken(accessToken: string, refreshToken?: string): void;
    /**
     * Returns the list of available logins.
     * @returns The list of available logins.
     * @category Authentication
     */
    getLogins(): LoginState[];
    private addLogin;
    private refreshProfile;
    /**
     * Returns true if the client is waiting for initial authentication.
     * @returns True if the client is waiting for initial authentication.
     * @category Authentication
     */
    isLoading(): boolean;
    /**
     * Returns true if the current user is authenticated as a super admin.
     * @returns True if the current user is authenticated as a super admin.
     * @category Authentication
     */
    isSuperAdmin(): boolean;
    /**
     * Returns true if the current user is authenticated as a project admin.
     * @returns True if the current user is authenticated as a project admin.
     * @category Authentication
     */
    isProjectAdmin(): boolean;
    /**
     * Returns the current project if available.
     * @returns The current project if available.
     * @category User Profile
     */
    getProject(): Project | undefined;
    /**
     * Returns the current project membership if available.
     * @returns The current project membership if available.
     * @category User Profile
     */
    getProjectMembership(): ProjectMembership | undefined;
    /**
     * Returns the current user profile resource if available.
     * This method does not wait for loading promises.
     * @returns The current user profile resource if available.
     * @category User Profile
     */
    getProfile(): ProfileResource | undefined;
    /**
     * Returns the current user profile resource, retrieving form the server if necessary.
     * This method waits for loading promises.
     * @returns The current user profile resource.
     * @category User Profile
     */
    getProfileAsync(): Promise<WithId<ProfileResource> | undefined>;
    /**
     * Returns the current user configuration if available.
     * @returns The current user configuration if available.
     * @category User Profile
     */
    getUserConfiguration(): WithId<UserConfiguration> | undefined;
    /**
     * Returns the current user access policy if available.
     * @returns The current user access policy if available.
     * @category User Profile
     */
    getAccessPolicy(): AccessPolicy | undefined;
    /**
     * Downloads the URL as a blob. Can accept binary URLs in the form of `Binary/{id}` as well.
     * @category Read
     * @param url - The URL to request. Can be a standard URL or one in the form of `Binary/{id}`.
     * @param options - Optional fetch request init options.
     * @returns Promise to the response body as a blob.
     */
    download(url: URL | string, options?: MedplumRequestOptions): Promise<Blob>;
    /**
     * Creates a FHIR Media resource with the provided data content.
     *
     * @category Create
     * @param createMediaOptions - The media creation options. See `CreateMediaOptions` for full details.
     * @param requestOptions - Optional fetch options.
     * @returns The new media resource.
     */
    createMedia(createMediaOptions: CreateMediaOptions, requestOptions?: MedplumRequestOptions): Promise<Media>;
    /**
     * Upload media to the server and create a Media instance for the uploaded content.
     * @param contents - The contents of the media file, as a string, Uint8Array, File, or Blob.
     * @param contentType - The media type of the content.
     * @param filename - Optional filename for the binary, or extended upload options (see `BinaryUploadOptions`).
     * @param additionalFields - Additional fields for Media.
     * @param options - Optional fetch options.
     * @returns Promise that resolves to the created Media
     * @deprecated Use `createMedia` with `CreateMediaOptions` instead. To be removed in a future version.
     */
    uploadMedia(contents: string | Uint8Array | File | Blob, contentType: string, filename: string | undefined, additionalFields?: Partial<Media>, options?: MedplumRequestOptions): Promise<Media>;
    /**
     * Creates a FHIR DocumentReference resource with the provided data content.
     *
     * @category Create
     * @param createDocumentReferenceOptions - The document reference creation options. See `CreateDocumentReferenceOptions` for full details.
     * @param requestOptions - Optional fetch options.
     * @returns The new document reference resource.
     */
    createDocumentReference(createDocumentReferenceOptions: CreateDocumentReferenceOptions, requestOptions?: MedplumRequestOptions): Promise<DocumentReference>;
    /**
     * Performs Bulk Data Export operation request flow. See the {@link https://build.fhir.org/ig/HL7/bulk-data/export.html#bulk-data-export | FHIR "Bulk Data Export"} for full details.
     * @param exportLevel - Optional export level. Defaults to system level export. 'Group/:id' - Group of Patients, 'Patient' - All Patients.
     * @param resourceTypes - A string of comma-delimited FHIR resource types.
     * @param since - Resources will be included in the response if their state has changed after the supplied time (e.g. if Resource.meta.lastUpdated is later than the supplied _since time).
     * @param options - Optional fetch options.
     * @returns Bulk Data Response containing links to Bulk Data files. See the {@link https://build.fhir.org/ig/HL7/bulk-data/export.html#response---complete-status | "Response - Complete Status"} for full details.
     */
    bulkExport(exportLevel?: string, resourceTypes?: string, since?: string, options?: MedplumRequestOptions): Promise<Partial<BulkDataExport>>;
    /**
     * Starts an async request following the FHIR "Asynchronous Request Pattern".
     *
     * See the {@link https://hl7.org/fhir/r4/async.html | FHIR "Asynchronous Request Pattern"} for full details.
     *
     * @param url - The URL to request.
     * @param options - Optional fetch options.
     * @returns The response body.
     */
    startAsyncRequest<T>(url: string, options?: MedplumRequestOptions): Promise<T>;
    /**
     * Returns the key value client.
     * @returns The key value client.
     */
    get keyValue(): MedplumKeyValueClient;
    /**
     * Internal helper method to get a bundle from a URL.
     * In addition to returning the bundle, it also caches all of the resources in the bundle.
     * This should be used by any method that returns a bundle of resources to be cached.
     * @param url - The bundle URL.
     * @param options - Optional fetch options.
     * @returns Promise to the bundle.
     */
    private getBundle;
    /**
     * Returns true if caching is enabled for the given request options.
     * @param options - Optional fetch options for cache settings.
     * @returns True if caching is enabled.
     */
    private isCacheEnabled;
    /**
     * Returns the cache entry if available and not expired.
     * @param key - The cache key to retrieve.
     * @param options - Optional fetch options for cache settings.
     * @returns The cached entry if found.
     */
    private getCacheEntry;
    /**
     * Adds a readable promise to the cache.
     * @param key - The cache key to store.
     * @param value - The readable promise to store.
     * @param options - Optional fetch options for cache settings.
     */
    private setCacheEntry;
    /**
     * Adds a concrete value as the cache entry for the given resource.
     * This is used in cases where the resource is loaded indirectly.
     * For example, when a resource is loaded as part of a Bundle.
     * @param resource - The resource to cache.
     * @param options - Optional fetch options for cache settings.
     */
    private cacheResource;
    /**
     * Deletes a cache entry.
     * @param key - The cache key to delete.
     */
    private deleteCacheEntry;
    /**
     * Makes an HTTP request.
     * @param method - The HTTP method (GET, POST, etc).
     * @param url - The target URL.
     * @param options - Optional fetch request init options.
     * @param state - Optional request state.
     * @returns The JSON content body if available.
     */
    private request;
    private parseBody;
    private fetchWithRetry;
    private logRequest;
    private logResponse;
    private setCurrentRateLimit;
    /**
     * Reports the last-seen rate limit information from the server.
     * @returns Array of applicable rate limits.
     */
    rateLimitStatus(): RateLimitInfo[];
    private getRetryDelay;
    private pollStatus;
    /**
     * Executes a batch of requests that were automatically batched together.
     */
    private executeAutoBatch;
    /**
     * Adds default options to the fetch options.
     * @param options - The options to add defaults to.
     */
    private addFetchOptionsDefaults;
    /**
     * Sets the "Content-Type" header on fetch options.
     * @param options - The fetch options.
     * @param contentType - The new content type to set.
     */
    private setRequestContentType;
    /**
     * Returns a header from fetch options.
     * @param options - The fetch options.
     * @param key - The header key.
     * @returns The header value if found.
     */
    private getRequestHeader;
    /**
     * Sets a header on fetch options.
     * @param options - The fetch options.
     * @param key - The header key.
     * @param value - The header value.
     * @param ifNoneExist - Optional flag to only set the header if it doesn't already exist.
     */
    private setRequestHeader;
    /**
     * Sets the body on fetch options.
     * @param options - The fetch options.
     * @param data - The new content body.
     */
    private setRequestBody;
    /**
     * Handles an unauthenticated response from the server.
     * First, tries to refresh the access token and retry the request.
     * Otherwise, calls unauthenticated callbacks and rejects.
     * @param method - The HTTP method of the original request.
     * @param url - The URL of the original request.
     * @param options - Optional fetch request init options.
     * @returns The result of the retry.
     */
    private handleUnauthenticated;
    /**
     * Starts a new PKCE flow.
     * These PKCE values are stateful, and must survive redirects and page refreshes.
     * @category Authentication
     * @returns The PKCE code challenge details.
     */
    startPkce(): Promise<{
        codeChallengeMethod: CodeChallengeMethod;
        codeChallenge: string;
    }>;
    /**
     * Redirects the user to the login screen for authorization.
     * Clears all auth state including local storage and session storage.
     * @param loginParams - The authorization login parameters.
     * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationEndpoint
     */
    private requestAuthorization;
    /**
     * Processes an OAuth authorization code.
     * See: https://openid.net/specs/openid-connect-core-1_0.html#TokenRequest
     * @param code - The authorization code received by URL parameter.
     * @param loginParams - Optional login parameters.
     * @returns The user profile resource.
     * @category Authentication
     */
    processCode(code: string, loginParams?: Partial<BaseLoginRequest>): Promise<ProfileResource>;
    /**
     * Refreshes the access token using the refresh token if available.
     * @param gracePeriod - Optional grace period in milliseconds. If not specified, uses the client configured grace period (default 5 minutes).
     * @returns Promise to refresh the access token.
     */
    refreshIfExpired(gracePeriod?: number): Promise<void>;
    /**
     * Tries to refresh the auth tokens.
     * @returns The refresh promise if available; otherwise undefined.
     * @see https://openid.net/specs/openid-connect-core-1_0.html#RefreshTokens
     */
    private refresh;
    /**
     * Starts a new OAuth2 client credentials flow.
     *
     * @example
     * ```typescript
     * await medplum.startClientLogin(import.meta.env.MEDPLUM_CLIENT_ID, import.meta.env.MEDPLUM_CLIENT_SECRET)
     * // Example Search
     * await medplum.searchResources('Patient')
     * ```
     *
     * See {@link https://datatracker.ietf.org/doc/html/rfc6749#section-4.4 | RFC 6749 Section 4.4} for full details.
     *
     * @category Authentication
     * @param clientId - The client ID.
     * @param clientSecret - The client secret.
     * @returns Promise that resolves to the client profile.
     */
    startClientLogin(clientId: string, clientSecret: string): Promise<ProfileResource>;
    /**
     * Starts a new OAuth2 JWT bearer flow.
     *
     * @example
     * ```typescript
     * await medplum.startJwtBearerLogin(import.meta.env.MEDPLUM_CLIENT_ID, import.meta.env.MEDPLUM_JWT_BEARER_ASSERTION, 'openid profile');
     * // Example Search
     * await medplum.searchResources('Patient')
     * ```
     *
     * See {@link https://datatracker.ietf.org/doc/html/rfc7523#section-2.1 | RFC 7523 Section 2.1} for full details.
     *
     * @category Authentication
     * @param clientId - The client ID.
     * @param assertion - The JWT assertion.
     * @param scope - The OAuth scope.
     * @returns Promise that resolves to the client profile.
     */
    startJwtBearerLogin(clientId: string, assertion: string, scope: string): Promise<ProfileResource>;
    /**
     * Starts a new OAuth2 JWT assertion flow.
     *
     * See {@link https://datatracker.ietf.org/doc/html/rfc7523#section-2.2 | RFC 7523 Section 2.2} for full details.
     *
     * @category Authentication
     * @param jwt - The JWT assertion.
     * @returns Promise that resolves to the client profile.
     */
    startJwtAssertionLogin(jwt: string): Promise<ProfileResource>;
    /**
     * Sets the client ID and secret for basic auth.
     *
     * @example
     * ```typescript
     * medplum.setBasicAuth(import.meta.env.MEDPLUM_CLIENT_ID, import.meta.env.MEDPLUM_CLIENT_SECRET);
     * // Example Search
     * await medplum.searchResources('Patient');
     * ```
     *
     * @category Authentication
     * @param clientId - The client ID.
     * @param clientSecret - The client secret.
     */
    setBasicAuth(clientId: string, clientSecret: string): void;
    /**
     * Sets the log level for the client.
     * - 'none': No logging
     * - 'basic': Log method, URL, and status code only (no sensitive headers)
     * - 'verbose': Log all details including headers (may include sensitive data)
     *
     * @example
     * ```typescript
     * // Basic logging for production
     * medplum.setLogLevel('basic');
     * await medplum.searchResources('Patient');
     * // Output:
     * // > GET https://api.medplum.com/fhir/R4/Patient
     * // < 200 OK
     * ```
     *
     * @example
     * ```typescript
     * // Verbose logging for debugging
     * medplum.setLogLevel('verbose');
     * await medplum.searchResources('Patient');
     * // Output includes all headers
     * ```
     *
     * @category HTTP
     * @param level - The log level to set.
     */
    setLogLevel(level: ClientLogLevel): void;
    /**
     * Gets the current log level.
     * @category HTTP
     * @returns The current log level.
     */
    getLogLevel(): ClientLogLevel;
    /**
     * Sets the verbose mode for the client.
     * When verbose is enabled, the client will log all requests and responses to the console.
     *
     * @deprecated Use setLogLevel instead. This method will be removed in a future version.
     *
     * @example
     * ```typescript
     * medplum.setVerbose(true);
     * // Now all requests and responses will be logged
     * await medplum.searchResources('Patient');
     * ```
     *
     * @category HTTP
     * @param verbose - Whether to enable verbose logging.
     */
    setVerbose(verbose: boolean): void;
    /**
     * Subscribes to a specified topic, listening for a list of specified events.
     *
     * Once you have the `SubscriptionRequest` returned from this method, you can call `fhircastConnect(subscriptionRequest)` to connect to the subscription stream.
     *
     * @category FHIRcast
     * @param topic - The topic to publish to. Usually a UUID.
     * @param events - An array of event names to listen for.
     * @returns A `Promise` that resolves once the request completes, or rejects if it fails.
     */
    fhircastSubscribe(topic: string, events: FhircastEventName[]): Promise<SubscriptionRequest>;
    /**
     * Unsubscribes from the specified topic.
     *
     * @category FHIRcast
     * @param subRequest - A `SubscriptionRequest` representing a subscription to cancel. Mode will be set to `unsubscribe` automatically.
     * @returns A `Promise` that resolves when request to unsubscribe is completed.
     */
    fhircastUnsubscribe(subRequest: SubscriptionRequest): Promise<void>;
    /**
     * Connects to a `FHIRcast` session.
     *
     * @category FHIRcast
     * @param subRequest - The `SubscriptionRequest` to use for connecting.
     * @returns A `FhircastConnection` which emits lifecycle events for the `FHIRcast` WebSocket connection.
     */
    fhircastConnect(subRequest: SubscriptionRequest): FhircastConnection;
    /**
     * Publishes a new context to a given topic for a specified event type.
     *
     * @category FHIRcast
     * @param topic - The topic to publish to. Usually a UUID.
     * @param event - The name of the event to publish an updated context for, ie. `Patient-open`.
     * @param context - The updated context containing resources relevant to this event.
     * @param versionId - The `versionId` of the `anchor context` of the given event. Used for `DiagnosticReport-update` event.
     * @returns A `Promise` that resolves once the request completes, or rejects if it fails.
     */
    fhircastPublish<EventName extends FhircastEventVersionOptional>(topic: string, event: EventName, context: FhircastEventContext<EventName> | FhircastEventContext<EventName>[], versionId?: never): Promise<Record<string, any>>;
    fhircastPublish<RequiredVersionEvent extends FhircastEventVersionRequired>(topic: string, event: RequiredVersionEvent, context: FhircastEventContext<RequiredVersionEvent> | FhircastEventContext<RequiredVersionEvent>[], versionId: string): Promise<Record<string, any>>;
    /**
     * Gets the current context of the given FHIRcast `topic`.
     *
     * @category FHIRcast
     * @param topic - The topic to get the current context for. Usually a UUID.
     * @returns A Promise which resolves to the `CurrentContext` for the given topic.
     */
    fhircastGetContext(topic: string): Promise<CurrentContext>;
    /**
     * Invite a user to a project.
     * @param projectId - The project ID.
     * @param body - The InviteRequest.
     * @returns Promise that returns a project membership or an operation outcome.
     */
    invite(projectId: string, body: InviteRequest): Promise<ProjectMembership | OperationOutcome>;
    /**
     * Makes a POST request to the tokens endpoint.
     * See {@link https://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint | OpenID Connect Core 1.0 TokenEndpoint} for full details.
     * @param params - Token parameters.
     * @returns The user profile resource.
     */
    private fetchTokens;
    /**
     * Verifies the tokens received from the auth server.
     * Validates the JWT against the JWKS.
     * See {@link https://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint | OpenID Connect Core 1.0 TokenEndpoint} for full details.
     * @param tokens - The token response.
     * @returns Promise to complete.
     */
    private verifyTokens;
    private checkSessionDetailsMatchLogin;
    /**
     * Sets up a listener for window storage events.
     * This synchronizes state across browser windows and browser tabs.
     */
    private setupStorageListener;
    /**
     * Gets the `SubscriptionManager` for WebSocket subscriptions.
     *
     * @category Subscriptions
     * @returns the `SubscriptionManager` for this client.
     */
    getSubscriptionManager(): SubscriptionManager;
    /**
     * Subscribes to a given criteria, listening to notifications over WebSockets.
     *
     * This uses Medplum's `WebSocket Subscriptions` under the hood.
     *
     * A `SubscriptionEmitter` is returned from this function, which can be used to listen for updates to resources described by the given criteria.
     *
     * When subscribing to the same criteria multiple times, the same `SubscriptionEmitter` will be returned, and a reference count will be incremented.
     *
     * -----
     * @example
     * ```ts
     * const emitter = medplum.subscribeToCriteria('Communication');
     *
     * emitter.addEventListener('message', (bundle: Bundle) => {
     *   // Called when a `Communication` resource is created or modified
     *   console.log(bundle?.entry?.[1]?.resource); // Logs the `Communication` resource that was updated
     * });
     * ```
     *
     * @category Subscriptions
     * @param criteria - The criteria to subscribe to.
     * @param subscriptionProps - Optional properties to add to the created `Subscription` resource.
     * @returns a `SubscriptionEmitter` that emits `Bundle` resources containing changes to resources based on the given criteria.
     */
    subscribeToCriteria(criteria: string, subscriptionProps?: Partial<Subscription>): SubscriptionEmitter;
    /**
     * Unsubscribes from the given criteria.
     *
     * When called the same amount of times as proceeding calls to `subscribeToCriteria` on a given `criteria`,
     * the criteria is fully removed from the `SubscriptionManager`.
     *
     * @category Subscriptions
     * @param criteria - The criteria to unsubscribe from.
     * @param subscriptionProps - The optional properties that `subscribeToCriteria` was called with.
     */
    unsubscribeFromCriteria(criteria: string, subscriptionProps?: Partial<Subscription>): void;
    /**
     * Get the master `SubscriptionEmitter` for the `SubscriptionManager`.
     *
     * The master `SubscriptionEmitter` gets messages for all subscribed `criteria` as well as WebSocket errors, `connect` and `disconnect` events, and the `close` event.
     *
     * It can also be used to listen for `heartbeat` messages.
     *
     *------
     * @example
     * ### Listening for `heartbeat`:
     * ```ts
     * const masterEmitter = medplum.getMasterSubscriptionEmitter();
     *
     * masterEmitter.addEventListener('heartbeat', (bundle: Bundle<SubscriptionStatus>) => {
     *   console.log(bundle?.entry?.[0]?.resource); // A `SubscriptionStatus` of type `heartbeat`
     * });
     *
     * ```
     * @category Subscriptions
     * @returns the master `SubscriptionEmitter` from the `SubscriptionManager`.
     */
    getMasterSubscriptionEmitter(): SubscriptionEmitter;
}
export declare function normalizeCreateBinaryOptions(arg1: BinarySource | CreateBinaryOptions, arg2: string | undefined | MedplumRequestOptions, arg3?: string, arg4?: (e: ProgressEvent) => void): CreateBinaryOptions;
export declare function normalizeCreatePdfOptions(arg1: TDocumentDefinitions | CreatePdfOptions, arg2: string | undefined | MedplumRequestOptions, arg3: Record<string, CustomTableLayout> | undefined, arg4: TFontDictionary | undefined): CreatePdfOptions;
export {};
//# sourceMappingURL=client.d.ts.map