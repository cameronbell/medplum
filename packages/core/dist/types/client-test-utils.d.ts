import type { OperationOutcome, Practitioner, Resource } from '@medplum/fhirtypes';
import type { FetchLike } from './client';
import { MedplumClient } from './client';
import { ReadablePromise } from './readablepromise';
import type { ProfileResource, WithId } from './utils';
export declare function mockFetch(status: number, body: OperationOutcome | Record<string, unknown> | ((url: string, options?: any) => any), contentType?: "application/fhir+json"): FetchLike & jest.Mock;
export declare function mockFetchWithStatus(onFetch: (url: string, options?: any) => [number, any], contentType?: "application/fhir+json"): FetchLike & jest.Mock;
export declare function mockFetchResponse(status: number, body: any, headers?: Record<string, string>): Response;
export declare class MockFhirRouter {
    routes: Map<string, () => Record<string, any>>;
    constructor();
    makeKey(method: 'GET' | 'POST', path: string): string;
    addRoute(method: 'GET' | 'POST', path: string, callback: () => Record<string, any>): void;
    fetchRoute<T = Record<string, any>>(method: 'GET' | 'POST', path: string): T;
}
export interface MockClientOptions {
    fetch?: FetchLike;
}
export declare class MockMedplumClient extends MedplumClient {
    router: MockFhirRouter;
    profile: Practitioner | undefined;
    nextResourceId: string;
    constructor(options?: MockClientOptions);
    get<T = any>(url: string | URL, _options?: RequestInit): ReadablePromise<WithId<T>>;
    addNextResourceId(id: string): void;
    createResource<T extends Resource = Resource>(resource: T, _options?: RequestInit): Promise<WithId<T>>;
    setProfile(profile: Practitioner | undefined): void;
    getProfile(): ProfileResource | undefined;
}
export declare function createFakeJwt(claims: Record<string, string | number>): string;
//# sourceMappingURL=client-test-utils.d.ts.map