import type { Resource } from '@medplum/fhirtypes';
import type { SearchRequest } from './search';
/**
 * Determines if the resource matches the search request.
 * @param resource - The resource that was created or updated.
 * @param searchRequest - The subscription criteria as a search request.
 * @returns True if the resource satisfies the search request.
 */
export declare function matchesSearchRequest(resource: Resource, searchRequest: SearchRequest): boolean;
//# sourceMappingURL=match.d.ts.map