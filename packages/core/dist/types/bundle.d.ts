import type { Bundle, ExtractResource, Resource, ResourceType } from '@medplum/fhirtypes';
/**
 * More on Bundles can be found here
 * http://hl7.org/fhir/R4/bundle.html
 */
/**
 * Takes a bundle and creates a Transaction Type bundle
 * @param bundle - The Bundle object that we'll receive from the search query
 * @returns transaction type bundle
 */
export declare function convertToTransactionBundle(bundle: Bundle): Bundle;
/**
 * Topologically sorts a `batch` or `transaction` bundle to improve reference resolution.
 * The bundle is sorted such that a resource is created _before_ references to that resource appear in the bundle.
 *
 * In the event of cycles, this function will first create a POST request for each resource in the cycle, and then will
 * append a PUT request to the bundle. This ensures that each resources in the cycle is visited twice, and all
 * references can be resolved
 * @param bundle - Input bundle with type `batch` or `transaction`
 * @returns Bundle of the same type, with Bundle.entry reordered
 */
export declare function reorderBundle(bundle: Bundle): Bundle;
/**
 * Converts a resource with contained resources to a transaction bundle.
 * This function is useful when creating a resource that contains other resources.
 * Handles local references and topological sorting.
 * @param resource - The input resource which may or may not include contained resources.
 * @returns A bundle with the input resource and all contained resources.
 */
export declare function convertContainedResourcesToBundle(resource: Resource & {
    contained?: Resource[];
}): Bundle;
export declare function findResourceInBundle<K extends ResourceType>(bundle: Bundle, resourceType: K, id: string): ExtractResource<K>;
//# sourceMappingURL=bundle.d.ts.map